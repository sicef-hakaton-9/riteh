from xgboost import XGBRegressor
import json

# best parameters [67, 2, 0.26, 4, 0.18]
best_xgb_parameters = {
    'n_estimators': 67,
    'max_depth': 2,
    'learning_rate': 0.26,
    'min_child_weight': 4,
    'gamma': 0.18
}

xgb_reg = XGBRegressor(**best_xgb_parameters)
xgb_reg.load_model('./model.json')

def lambda_handler(event, context):
    # Prepare the features array
    features = [[event['num_rooms'],
                          event['num_people'],
                          event['housearea'],
                          event['is_ac'],
                          event['is_tv'],
                          event['is_flat'],
                          event['ave_monthly_income'],
                          event['num_children'],
                          event['is_urban']]]
    try:
        prediction = xgb_reg.predict(features)
        print("Prediction " + json.dumps({'prediction': prediction.tolist()}))
        return {
            'status': 200,
            'predictionResult': prediction.tolist()[0]
        }
    except Exception as e:
        print(f'Error happened while predicting {e}')
        return{
            "status": 500,
            "message": f'Error happened while predicting {e}'
        }
