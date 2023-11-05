import { Request, Response } from 'express';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs';

// Initialize an SQS client with AWS SDK v3
const sqsClient = new SQSClient({ credentials: fromNodeProviderChain({}) });
const sqsQueueUrl = process.env.SQS_QUEUE_URL;

export const getAllOpenChats = async (req: Request, res: Response) => {
    const params: any = {
        QueueUrl: sqsQueueUrl,
        AttributeNames: ['All'],
        MaxNumberOfMessages: 10, // Adjust as needed
        WaitTimeSeconds: 20 // Long polling
    };
    
    try {
    // Receive a batch of messages from the queue
    const command = new ReceiveMessageCommand(params);
    const { Messages } = await sqsClient.send(command);

    if (Messages && Messages.length > 0) {
        // Process messages and extract room IDs
        const roomIds = Messages.map((message: any) => {
            // Assuming room ID is sent as the message body
            const body = JSON.parse(message.Body);
            console.log('Received message:', body);
            return body.MessageAttributes.roomId.Value;
        });
        console.log("over here", roomIds)
        // Return the room IDs
        return res.json({ response: roomIds });
    } else {
        return res.status(404).send({ message: 'No messages found in the queue.' });
    }
    } catch (error) {
    console.error('Error retrieving messages from SQS:', error);
    return res.status(500).send('Failed to retrieve messages from the queue.');
    }
};

