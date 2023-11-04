import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

dotenv.config()

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })
const tableName = 'users';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required' });
    }
    
    const input = {
      TableName: tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    }
    try {
      const command = new ScanCommand(input)
      const result = await dynamodb.send(command)

      if(!result.Items || result.Items.length == 0) { 
        return res.status(404).json({ message: 'User not found or password incorrect' }); 
      }
      
      const receivedPasswordFromDB = String(result?.Items[0]?.password)
      if (await bcrypt.compare(password, receivedPasswordFromDB)) {
        const receivedRoleFromDB = result?.Items[0]?.role
        const jwtToken = jwt.sign(
          { email, role: receivedRoleFromDB },
          process.env.JWT_SECRET as string,
          { expiresIn: '30h' }
        );
        return res.status(200).json({ message: 'Login successful, welcome!', token: jwtToken });
      } else {
        return res.status(404).json({ message: 'User not found or password incorrect' });
      }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error logging in user' });
    }
};

export const registerController = async (req: Request, res: Response) => {
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
          TableName: tableName,
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