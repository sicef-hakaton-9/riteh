import boto3
import random

session = boto3.session.Session()
dynamodb = session.resource('dynamodb')

table = dynamodb.Table('containers')

def lambda_handler(event, context):
    random_water_level_value = random.randint(1, 100)
    danger = False
    if(random_water_level_value > 80):
        danger = True

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
        print(f"Random chosen container: {random_item}")

        update_response = table.update_item(
            Key={
                'id': random_id
            },
            UpdateExpression="SET fullness_value = :val",
            ExpressionAttributeValues={
                ':val': random_water_level_value
            },
            ReturnValues="UPDATED_NEW"
        )
        print(f"Updated container: {update_response}")

        return {
            'statusCode': 200,
            'body': {
                'old_container_values': random_item,
                'new_container_values': update_response['Attributes']
            }
        }
    else:
        print("The table is empty or the scan did not return any items.")
        return {
            'statusCode': 404,
            'body': 'The table is empty or the scan did not return any items.'
        }
        