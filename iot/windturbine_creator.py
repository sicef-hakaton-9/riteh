import boto3
import random
import uuid

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Specify your DynamoDB table name
table_name = 'windturbines'

# Reference the DynamoDB table
table = dynamodb.Table(table_name)

# Generate a unique ID
unique_id = str(uuid.uuid4())

# Generate an array of 10 random values from 0 to 20
random_values = [random.randint(0, 20) for _ in range(10)]

# Create a dictionary that will be saved in DynamoDB
item = {
    'id': unique_id,
    'windspeed': random_values
}

# Put the item in the DynamoDB table
try:
    response = table.put_item(Item=item)
    print(f"Successfully inserted item with ID: {unique_id}")
except Exception as e:
    print(f"Error inserting item into DynamoDB: {e}")

