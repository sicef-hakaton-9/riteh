from xgboost import XGBRegressor
import xgboost as xgb
import numpy as np
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
xgb_reg.load_model('model.json')

input_data = {
    "num_rooms": 45,
    "num_people": 23,
    "housearea": 67,
    "is_ac": 1,
    "is_tv": 0,
    "is_flat": 1,
    "ave_monthly_income": 85,
    "num_children": 3,
    "is_urban": 0
}


features = [[input_data['num_rooms'], 
                          input_data['num_people'],
                          input_data['housearea'],
                          input_data['is_ac'],
                          input_data['is_tv'],
                          input_data['is_flat'],
                          input_data['ave_monthly_income'],
                          input_data['num_children'],
                          input_data['is_urban']]]

# dmatrix = xgb.DMatrix(features)

# Make the prediction
prediction = xgb_reg.predict(features)
print(prediction)
print(json.dumps({'prediction': prediction.tolist()}))
# def lambda_handler(event, context):
#     user_id = event['id']
    
#     pass

