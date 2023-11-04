import { Request, Response } from 'express';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3"

import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })

const tableName = 'containers';

export const getAllContainers = async (req: Request, res: Response) => {
    const data = await dynamodb.send(new ScanCommand({
        TableName: tableName
      }));
    
    console.log(data.Items);
    
    return res.status(200).json({ 'allContainers': data.Items });
};
