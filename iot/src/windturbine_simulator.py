import boto3
import random

session = boto3.session.Session()
dynamodb = session.resource('dynamodb')

table = dynamodb.Table('windturbines')

def lambda_handler(event, context):
    response = table.scan(
        ProjectionExpression="id"
    )

    if 'Items' in response and response['Items']:
        ids = [item['id'] for item in response['Items']]
        random_id = random.choice(ids)

        random_item_response = table.get_item(
            Key={
                'id': random_id
            }
        )
        random_item = random_item_response['Item']
        print(f"Random chosen windturbine: {random_item}")

        random_values = [random.randint(0, 20) for _ in range(10)]

        update_response = table.update_item(
            Key={
                'id': random_id
            },
            UpdateExpression="SET windspeed = :val",
            ExpressionAttributeValues={
                ':val': random_values
            },
            ReturnValues="UPDATED_NEW"
        )
        print(f"Updated windturbine: {update_response}")

        return {
            'statusCode': 200,
            'body': {
                'old_turbine_values': random_item,
                'new_turbine_values': update_response['Attributes']
            }
        }
    else:
        print("The table is empty or the scan did not return any items.")
        return {
            'statusCode': 404,
            'body': 'The table is empty or the scan did not return any items.'
        }
        