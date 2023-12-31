import { Request, Response } from 'express';
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })
const s3 = new S3Client({ credentials: fromNodeProviderChain({ clientConfig: 'eu-central-1' }) })

const tableName = 'tickets';
const bucketName = 'sicef-hackathon-tickets'

export const getAllTickets = async (req: Request, res: Response) => {
  const { city } = req.params;
  const { category } = req.query;
  console.log(city, category);

  const data = await dynamodb.send(new ScanCommand({
    TableName: tableName
  }));
  let items = data.Items || [];
  let filteredItems: any[] = []; // znam da nije TS nacin, ali nemamo vremena za debuggiranje :D

  // Using a for loop to filter items
  for (let item of items) {
    let matchesCity = item.city === city;
    let matchesCategory = category ? item.category === category : true;

    if (matchesCity && matchesCategory) {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: `${item.id}.jpeg`,
      });
      item.imageUrl = await getSignedUrl(s3, command, { expiresIn: 20000 })
      filteredItems.push(item);
    }
  }

  console.log(data.Items);

  return res.status(200).json({ 'allTickets': filteredItems });
};

export const createTicket = async (req: Request, res: Response) => {
    try {
        const { x, y, title, description, category, image, city } = req.body;
        if(!x || !y || !title || !description || !category || !image || !city){
            return res.status(400).json({ message: 'Something is missing from your request, check your request and please try again' });
        }
        const id = uuidv4();

        const buffer = Buffer.from(image, 'base64');
        const params = {
            Bucket: bucketName,
            Key: `${id}.jpeg`,
            Body: buffer,
            ContentType: 'image/jpeg'
        };

        try {
            await s3.send(new PutObjectCommand(params));
        } catch (err) {
            console.log("An error occured while uploading the ticket image", err);
            return res.status(500).json({ message: 'Error occured while uploading ticket image' });
        }

        const ticket = { id, x, y, title, description, category, city };
        const putOperationInput = {
            TableName: tableName,
            Item: ticket
          }
        const putOperationCommand = new PutCommand(putOperationInput)
        await dynamodb.send(putOperationCommand)

        return res.status(201).json({ message: 'Ticket created successfully', ticketId: id });
    }
    catch(error){
        console.log(`An error has occured during the ticket creation ${error}`);
        return res.status(500).json({ message: 'Error creating ticket' });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const data = await dynamodb.send(new GetItemCommand({
      TableName: tableName,
      Key: {
        id: { S: id } // The primary key (UUID in this case)
      }
    }));
  
    // Check if the data.Item is falsy or an empty object,
    // if so, return 404
    if (!data.Item || Object.keys(data.Item).length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
  
    const returnJson = transformDynamoDBRecord(data.Item);
  
    // Pretpostavimo da 'imageKey' sadrži ključ slike na S3
    const imageKey = `${returnJson.id}.jpeg`;
  
    try {
      if (imageKey) {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: imageKey,
        });
        
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL traje 1 sat
        
        // Dodajte signed URL u odgovor
        returnJson.imageUrl = signedUrl;
      }
      
      return res.status(200).json({ ticket: returnJson });
    } catch (error) {
      console.error('Error getting signed URL:', error);
      return res.status(500).json({ message: 'Error getting signed URL', error });
    }
};
  

function transformDynamoDBRecord(dynamoDBRecord: any) {
    return Object.keys(dynamoDBRecord).reduce((result: any, key) => {
        result[key] = dynamoDBRecord[key].S;
        return result;
    }, {});
}
