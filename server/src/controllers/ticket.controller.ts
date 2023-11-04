import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

dotenv.config()

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })
const tableName = 'tickets';

export const getAllTickets = async (req: Request, res: Response) => {
    const data = await dynamodb.send(new ScanCommand({
        TableName: tableName
      }));
    
      console.log(data.Items);
    
      return res.status(200).json({ 'allTickets': data.Items });
};

export const createTicket = async (req: Request, res: Response) => {
    try {
        const { x, y, title, description, category } = req.body;
        if(!x || !y || !title || !description || !category){
            return res.status(400).json({ message: 'Something is missing from your request, check your request and please try again' });
        }  
        const id = uuidv4();
        const ticket = { id, x, y, title, description, category };
        const putOperationInput = {
            TableName: tableName,
            Item: ticket
          }
        const putOperationCommand = new PutCommand(putOperationInput)
        await dynamodb.send(putOperationCommand)

        return res.status(201).json({ message: 'Ticket created successfully' });
    }
    catch(error){
        console.log(`An error has occured during the ticket creation ${error}`);
        return res.status(500).json({ message: 'Error creating ticket' });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email, password and role are required' });
    }

    // Check if user already exists
    const input = {
        TableName: tableName,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email }
    }
    const scancommand = new ScanCommand(input)
    const existingUser = await dynamodb.send(scancommand)

    if (existingUser.Items && existingUser.Items.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with unique id
    const uuid = uuidv4();
    // Hash password for security reasons
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = { uuid, email, password: hashedPassword };
    
    const putOperationInput = {
        TableName: 'users',
        Item: user
    }
    const putOperationCommand = new PutCommand(putOperationInput)
    await dynamodb.send(putOperationCommand)

    // Return success response
    return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user' });
    }
};