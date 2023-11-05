import { Request, Response } from 'express';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const dynamodb = new DynamoDBClient({ credentials: fromNodeProviderChain({}) })

const tableName = 'windturbines';

export const getAllWindturbines = async (req: Request, res: Response) => {
    try {
        const { Items } = await dynamodb.send(new ScanCommand({
            TableName: "windturbines"
        }));

        console.log(Items);

        const turbinesWithEnergy = Items?.map((item) => {
            let energyGenerated = 0;
            item.windspeed.forEach((windSpeedValue: any) => {
                // Assuming windSpeedValue is a DynamoDB List (L) of Number (N) types
                const windspeed = Number(windSpeedValue);
                energyGenerated += calculateGeneratedEnergy(windspeed);
            });
            return {
                ...item,
                energyGenerated
            };
        });

        return res.status(200).json({ 'allWindturbines': turbinesWithEnergy });
    } catch (error) {
        console.error("Error fetching wind turbines: ", error);
        return res.status(500).json({ error: "Error fetching wind turbines" });
    }
};

function calculateGeneratedEnergy(windspeed: number) {
    return Number(0.5 * 1225 * windspeed * windspeed * windspeed * 0.4)
}
