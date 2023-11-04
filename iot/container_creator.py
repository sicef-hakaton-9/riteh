import boto3
import uuid
import random

# Initialize a session using Amazon DynamoDB
session = boto3.session.Session()
dynamodb = session.resource('dynamodb')

# Choose your DynamoDB table
table = dynamodb.Table('containers')

for i in range(10):
    id_str = str(uuid.uuid4())
    fullness_value = random.randint(1, 100)
    table.put_item(
    Item={
            'id': id_str,
            'fullness_value': fullness_value
        }
    )