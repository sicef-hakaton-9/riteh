import { Request, Response } from 'express';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })

const tableName = 'business_emails';

export const createBusinessEmailContent = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if(!email){
            return res.status(400).json({ message: 'Email wasn\'n provided' });
        }
        const id = uuidv4();

        const emailObject = { id, email };
        const putOperationInput = {
            TableName: tableName,
            Item: emailObject
          }
        const putOperationCommand = new PutCommand(putOperationInput)
        await dynamodb.send(putOperationCommand)

        return res.status(201).json({ message: 'Email added successfully', ticketId: id });
    }
    catch(error){
        console.log(`An error has occured saving email ${error}`);
        return res.status(500).json({ message: 'Error creating email' });
    }
};
