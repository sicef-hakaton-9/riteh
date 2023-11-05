import boto3
import random
import json

session = boto3.session.Session()
dynamodb = session.resource('dynamodb')

lambda_client = boto3.client('lambda')
function_name = "EmailSender"

table = dynamodb.Table('flood_sensors')

def lambda_handler(event, context):
    random_water_level_value = random.randint(1, 100)

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
        print(f"Random chosen flood sensor: {random_item}")

        update_response = table.update_item(
            Key={
                'id': random_id
            },
            UpdateExpression="SET water_level = :val",
            ExpressionAttributeValues={
                ':val': random_water_level_value
            },
            ReturnValues="UPDATED_NEW"
        )
        print(f"Updated flood sensor: {update_response}")

        # Send invoke the EmailSender lambda function
        invoke_response = lambda_client.invoke(
            FunctionName=function_name,
            InvocationType='Event',
            Payload=json.dumps({
                'emergency': 1
            })
        )
        return {
            'statusCode': 200,
            'body': {
                'old_flood_sensor_values': random_item,
                'new_flood_sensor_values': update_response['Attributes']
            }
        }
    else:
        print("The table is empty or the scan did not return any items.")
        return {
            'statusCode': 404,
            'body': 'The table is empty or the scan did not return any items.'
        }
        