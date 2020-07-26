/** * * HealthyLife Health Risk Appraisal. * * (c) 2018 Global Health Metrics. All rights reserved. * */var hra = {
    app: {
        state: {
  responses: {},
  config: {},
  active_questions: [],
  hiddenquestions: ['vaping_freq', 'hb1ac_check', 'hb1ac_level'],
  shownquestions: []
        },
    },
    dom: {},
    conf: {},
    data: {},
    util: {},
};

hra.conf.container = 'hra.container';
hra.conf.output_element = 'json';

hra.data.questionnaires = { 'midlife': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'demo': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'health_information_interest'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'review' },], 'absi': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'blood_glucose', 'blood_glucose_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment'] }, { 'id': 'review' },], 'thriveme': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_medication', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'cholesterol_level_estimated', 'hdl_cholesterol_estimated'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sugar', 'q': ['sweeteners', 'sweetened_foods', 'meals_per_day', 'snacks_per_day'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education', 'drinking_water'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income'] }, { 'id': 'review' },], 'optimal': [{ 'id': 'tos', 'q': [] }, { 'id': 'demographics', 'q': ['marital_status_optimal', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening', 'prostate_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'education_optimal'] }, { 'id': 'review' },], 'chpowell': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms'] }, { 'id': 'review' },], 'efc': [{ 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'health_history', 'q': ['ahdi_asthma', 'ahdi_depression', 'ahdi_hyperlipidemia', 'ahdi_hypertension', 'ahdi_hyperthyroidism', 'ahdi_hypothyroidism', 'ahdi_pre_diabetes', 'ahdi_rheumatoid_arthritis'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'review' },], 'fitnessfairdemo': [{ 'id': 'tos_fitnessfair', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'blood_glucose', 'blood_glucose_mml'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'physical', 'q': ['overall_health', 'weekly_physical_activity', 'resting_heart_rate'] }, { 'id': 'fitnessfair_demo', 'q': ['corporate_wellfare', 'sustainable_progarm', 'online_programme'] }, { 'id': 'review' },], 'fitnessfair': [{ 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'blood_glucose', 'blood_glucose_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'daily_shisha', 'daily_marajuana', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'review' },], 'rmd': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'review' },], 'care1connect': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'somatic', 'q': ['somatic1', 'somatic2', 'somatic3', 'somatic4'] }, { 'id': 'medications', 'q': ['arthritis_medication', 'asthma_medication', 'cholesterol_medication', 'diabetes_medication', 'stomach_problems_medication', 'other_medications', 'medadhere'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['overall_health', 'weekly_physical_activity', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'annual_physical', 'drinking_water'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'lansing': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['marital_status', 'gainful_employment', 'health_information_interest'] }, { 'id': 'review' },], 'healthbydesign': [{ 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage'] }, { 'id': 'other', 'q': ['misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'gainful_employment'] }, { 'id': 'review' },], 'swwc': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune_swwc', 'race', 'hispanic_origin', 'filling_forms', 'education_swwc'] }, { 'id': 'review' },], 'healthshare': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'chronic', 'q': ['asthma', 'bipolar', 'brochiectasis', 'cardiac_failure', 'cardiomyopathy', 'copd', 'chronic_kidney', 'coronary_artery', 'crohns_disease', 'diabetes_insipidus', 'diabetes_mellitus', 'dysrhythmia', 'epilepsy', 'glaucoma', 'haemophilia', 'hiv', 'hyperlipidaemia', 'hypertension', 'hypothyroidism', 'multiple_sclerosis', 'parkinsons', 'rheumatoid_arthritis', 'schizophrenia', 'systemic_lupus_erythematosis', 'ulcerative_colitis'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'employer': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'tactical', 'q': ['prescription_medications', 'overnight_hospital', 'er_visits'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'ahdi': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'health_history', 'q': ['ahdi_asthma', 'ahdi_atrial_fibrillation', 'ahdi_chronic_obstructive_pulmonary_disease', 'ahdi_chronic_venous_thrombotic_disease', 'ahdi_copd', 'ahdi_chronic_kidney_disease', 'ahdi_congestive_heart_failure', 'ahdi_coronary_artery_disease', 'ahdi_depression', 'ahdi_epilepsy', 'ahdi_hiv', 'ahdi_hyperlipidemia', 'ahdi_hypertension', 'ahdi_hyperthyroidism', 'ahdi_hypothyroidism', 'ahdi_metabolic_syndrome', 'ahdi_multiple_sclerosis', 'ahdi_parkinsons_disease', 'ahdi_peripheral_arterial_disease', 'ahdi_pre_diabetes', 'ahdi_polymyalgia_rheumatica', 'ahdi_pulmonary_hypertension', 'ahdi_regional_enteritis', 'ahdi_rheumatoid_arthritis', 'ahdi_sleep_apnea', 'ahdi_ulcerative_colitis'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'blood_glucose', 'blood_glucose_mml', 'triglycerides'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment'] }, { 'id': 'review' },], 'cary': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['marital_status'] }, { 'id': 'review' },], 'stclair': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin'] }, { 'id': 'review' },], 'comprehensive': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': '65medical_conditions', 'q': ['breast_cancer', 'copd', 'urine_control', 'arthritis', 'parkinsons_disease', 'depression', 'hearing_impairment', 'vision_impairment', 'blindness', 'deafness'] }, { 'id': '65falls', 'q': ['fallen_three_times', 'injured_fall', 'difficulty_walking', 'depth_perception', 'medication_reactions', 'sedating_drug', 'different_medications', 'holding_urine', 'leak_urine'] }, { 'id': '65immunizations', 'q': ['pneumonia', 'flu_shot', 'tdap_shot', 'checkup'] }, { 'id': '65activities', 'q': ['bathing', 'dressing', 'eating', 'out_of_bed', 'walking', 'getting_outside', 'using_toilet', 'meals', 'shopping', 'managing_money', 'telephone', 'heavy_housework', 'light_housework', 'out_of_house', 'limit_crime'] }, { 'id': '65mobility', 'q': ['mile_walk', 'half_mile', 'quarter_mile', 'stairs', '10_steps_resting', '10_steps', '25_pounds'] }, { 'id': '65support', 'q': ['needed_support', 'seeing_relatives', 'most_relatives', 'close_relatives', 'ease_friends', 'seeing_friends', 'most_contact_friends', 'important_decisions', 'know_important_decisions', 'relied_on', 'help_with_things', 'live_alone', 'home_alone'] }, { 'id': '65dental_hearing_vision', 'q': ['dentist_exam', 'hearing_exam', 'eye_exam', 'recognize_friend_street', 'recognize_friend_room', 'recognize_friend_arm', 'recognize_friend_face', 'large_newspapers', 'regular_newspapers', 'glasses_up_to_date', 'seeing_beside_you', 'hearing_embarassed', 'hearing_frustrated', 'hearing_whisper', 'handicapped_hearing', 'hearing_visiting', 'hearing_religious', 'hearing_argument', 'hearing_radio', 'hearing_social_life', 'hearing_restaurant'] }, { 'id': '65home_safety', 'q': ['shadow_areas', 'skid_backing', 'carpet_edges', 'objects_put_away', 'slippery_areas', 'bath_slippery', 'grab_bars', 'poor_lighting', 'loose_steps', 'handrails', 'ladders', 'hot_water_burn'] }, { 'id': '65nutrition', 'q': ['interferes_eating', 'cut_appetite', 'trouble_chewing', 'disagree_foods', 'dentures', 'pain_abdomen', 'trouble_swallowing', 'vomiting', 'diarrhea', 'gained_weight', 'abdomen_operation', 'anemic', 'prescribed_medicines', 'nonprescribed_medicines', 'special_diet', 'change_food', 'fewer_two_meals', 'few_fruits', 'hard_to_eat', 'money_for_food', 'eat_alone', 'three_drugs', 'unwanted_weight', 'able_to_shop'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'twentyminute': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': '65medical_conditions', 'q': ['breast_cancer', 'copd', 'urine_control', 'arthritis', 'parkinsons_disease', 'depression', 'hearing_impairment', 'vision_impairment', 'blindness', 'deafness'] }, { 'id': '65falls', 'q': ['fallen_three_times', 'injured_fall', 'difficulty_walking', 'depth_perception', 'medication_reactions', 'sedating_drug', 'different_medications', 'holding_urine', 'leak_urine'] }, { 'id': '65immunizations', 'q': ['pneumonia', 'flu_shot', 'tdap_shot', 'checkup'] }, { 'id': '65activities', 'q': ['bathing', 'dressing', 'eating', 'out_of_bed', 'walking', 'getting_outside', 'using_toilet', 'meals', 'shopping', 'managing_money', 'telephone', 'heavy_housework', 'light_housework', 'out_of_house', 'limit_crime'] }, { 'id': '65mobility', 'q': ['mile_walk', 'half_mile', 'quarter_mile', 'stairs', '10_steps_resting', '10_steps', '25_pounds'] }, { 'id': '65support', 'q': ['needed_support', 'home_alone'] }, { 'id': '65dental_hearing_vision', 'q': ['dentist_exam', 'hearing_exam', 'eye_exam'] }, { 'id': '65home_safety', 'q': ['skid_backing', 'objects_put_away', 'grab_bars', 'poor_lighting', 'loose_steps', 'handrails'] }, { 'id': '65nutrition', 'q': ['trouble_chewing', 'trouble_swallowing', 'hard_to_eat'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'forceforhealth': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'ffh_information', 'q': ['nutrition', 'fitness', 'disparities', 'emergency_planning', 'anatomy', 'opioid', 'first_aid', 'cpr', 'aed', 'monitor_blood_pressure', 'monitor_blood_sugar', 'pulmonary_rehab'] }, { 'id': 'review' },], 'uconn': [{ 'id': 'tos', 'q': ['uconntos'] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking', 'arrested_dui', 'road_rage'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening', 'relatives_cancer', 'unprotected_sex', 'street_drugs'] }, { 'id': 'prevention', 'q': ['annual_checkup', 'annual_flu_shot', 'teeth_cleaned', 'eye_examed', 'hiv_test', 'declined_vaccine', 'hpv_vaccine', 'severe_sunburn'] }, { 'id': 'nutrition', 'q': ['fruits_and_vegetables', 'high_cholesterol_food', 'sugar_beverage', 'caffeine', 'fish', 'charcoal_broiled', 'fast_food', 'cross_contamination'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate', 'rollerblades', 'headphones_in_traffic', 'thrill_seeker'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education', 'firearm', 'phone_helplesness', 'dietary_supplement'] }, { 'id': '65support', 'q': ['needed_support', 'home_alone'] }, { 'id': 'demographics', 'q': ['uconn_coverage'] }, { 'id': 'review' },], 'popcare': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml', 'blood_glucose', 'blood_glucose_mml', 'triglycerides'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'marital_status'] }, { 'id': 'review' },], 'circuit30': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'circuit_30', 'q': ['exercise_program', 'accomplishing_goals', 'activity_tracker', 'workout_time', 'barbell', 'job_activity', 'glasses_of_water', 'nutriton_level', 'times_you_eat', 'calories', 'food_intake', 'eat_out', 'enjoy_cooking', 'nutritionist', '8_sleep'] }, { 'id': 'circuit_30_goals', 'q': ['lose_weight', 'gain_muscle', 'improve_overall_health', 'shape_tone', 'improve_performance'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'physical', 'q': ['overall_health', 'weekly_physical_activity', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['race', 'hispanic_origin'] }, { 'id': 'review' },], 'rollingstrong': [{ 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking', 'commercial_driver', 'gross_weight', 'type_of_license', 'years_as_driver'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'review' },], 'masscare': [{ 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['state_of_residence', 'marital_status', 'household_income', 'gainful_employment', 'insurance_coverage', 'health_information_interest'] }, { 'id': 'review' },], 'millcreek': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin', 'filling_forms', 'education'] }, { 'id': 'demographics', 'q': ['marital_status', 'gainful_employment', 'health_information_interest'] }, { 'id': 'review' },], 'resolutions': [{ 'id': 'tos', 'q': [] }, { 'id': 'basic_information', 'q': ['sex', 'age_in_years', 'height', 'height_cm', 'weight', 'weight_kg', 'body_frame_size', 'diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { 'id': 'cough_and_hand_hygiene', 'q': ['chh_hands', 'chh_cough', 'chh_fever', 'chh_sbreath', 'chh_interact'] }, { 'id': 'blood_pressure', 'q': ['blood_pressure_medication', 'blood_pressure_measured', 'blood_pressure_estimated', 'cholesterol_check', 'cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { 'id': 'diabetes', 'q': ['hb1ac_check', 'hb1ac_level'] }, { 'id': 'smoking', 'q': ['smoking', 'used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'smokeless_tobacco', 'vaping', 'vaping_freq'] }, { 'id': 'driving', 'q': ['travel_by_automobile', 'travel_by_automobile_km', 'travel_by_motorcycle', 'travel_by_motorcycle_km', 'typical_travel_method', 'safety_belt_usage', 'distracted_driving', 'driving_speed', 'drinking_and_driving', 'weekly_alcohol', 'binge_drinking'] }, { 'id': 'gender_specific', 'q': ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'hysterectomy', 'pap_smear_test', 'colon_cancer_screening'] }, { 'id': 'nutrition', 'q': ['fast_food', 'fruit', 'vegetables', 'soft_drinks', 'protein', 'junk_food', 'desserts', 'butter'] }, { 'id': 'sleep', 'q': ['sleep1', 'sleep2', 'sleep3', 'sleep4'] }, { 'id': 'mental_health', 'q': ['PHQa', 'PHQb', 'PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi', 'GADa', 'GADb', 'GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { 'id': 'stress', 'q': ['felt_confident', 'going_your_way', 'unable_to_control', 'difficulties_piling_up'] }, { 'id': 'physical', 'q': ['home_safety', 'overall_health', 'weekly_physical_activity', 'bicycle_helmet_usage', 'helmet_usage', 'resting_heart_rate'] }, { 'id': 'resolutions', 'q': ['onsite_fitness', 'motivated', 'work_life_balance', 'treatment_method', 'weight_loss_program', 'health_coaching', 'wellness_workshop', 'take_control_of_health', 'share_cost', 'lead_by_example'] }, { 'id': 'resolutions_impact', 'q': ['impact_home', 'impact_office', 'imapct_social'] }, { 'id': 'other', 'q': ['readiness_to_quit_smoking', 'readiness_to_reduce_alcohol_usage', 'readiness_to_eat_healthier', 'readiness_to_exercise_more', 'misfortune', 'race', 'hispanic_origin'] }, { 'id': 'review' },] };

hra.app.init = function () {
    var default_hra_id = hra.app.state.responses["hra.app.default_hra_id"];
    var current_hra_id = hra.app.state.responses["hra.app.hra_id"];

    if (!hra.app.state.responses['hra.app.units']) {
        if (!hra.app.state.config['hra.app.units']) {
  hra.app.state.responses['hra.app.units'] = 'us_customary';
        }
        else {
  hra.app.state.responses['hra.app.units'] = hra.app.state.config['hra.app.units'];
        }
    }

    if (!hra.app.state.responses['hra.app.cholunits']) {
        if (!hra.app.state.config['hra.app.cholunits']) {
  hra.app.state.responses['hra.app.cholunits'] = 'mg/dl';
        } else {
  hra.app.state.responses['hra.app.cholunits'] = hra.app.state.config['hra.app.cholunits'];
        }
    }

    if (!hra.data.questionnaires[default_hra_id]) {
        default_hra_id = 'midlife';
    }

    if (!current_hra_id || current_hra_id == 'default') {
        current_hra_id = default_hra_id;
    } hra.app.state.responses["hra.app.hra_id"] = current_hra_id;
    // code smell. parallel data structures.

    hra.app.modules = hra.app.getmodules(current_hra_id);
    hra.app.questions = hra.app.getquestions(current_hra_id);
    hra.app.activate_prefilled_questions();
    hra.app.state.current_module = hra.app.get_module(hra.app.modules[0]);

    //hra.app.select_modules();

    window.onkeydown = function (ke) {
        if (ke.key == '.' && ke.ctrlKey) { hra.app.next_module(); } if (ke.key == ',' && ke.ctrlKey) { hra.app.previous_module(); }
    };

    window.onresize = function () { hra.app.sticky(); }
    window.onscroll = function () { hra.app.sticky(); }

    // IE9+ support for nonstandard Web API method name.

    if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
    window.onclick = function (event) {
        if (!event.target.matches('#menu_button') && document.getElementById('menu_list')) {
  hra.app.menu('hide');
        }
    }

    // converts some inputs to arrays from strings

    try {
        if (hra.app.state.config['hra.app.default_hidden_questions']) {
  hra.app.state.config['hra.app.default_hidden_questions'] = JSON.parse(hra.app.state.config['hra.app.default_hidden_questions']);
        }
    } catch (e) {
        console.warn('Parse error. Known re-init issue.'); console.error(e);
    }

    try {
        if (hra.app.state.config['hra.app.default_locked_questions']) {
  hra.app.state.config['hra.app.default_locked_questions'] = JSON.parse(hra.app.state.config['hra.app.default_locked_questions']);
        }
    } catch (e) {
        console.warn('Parse error. Known re-init issue.'); console.error(e);
    }

    //iterate through the questions, finding ones to hide by default

    for (var m in hra.app.questions) {

        var module = hra.app.get_module(m);

        for (var q in hra.app.questions[m]) {
  if (hra.app.get_question(module, hra.app.questions[m][q]).default_deactive) { hra.app.state.hiddenquestions.push(module, hra.app.questions[m][q]); }
        }
    }

    hra.app.render_module();

    hra.util.fill_input_values();

    hra.util.do_branching();

    if (hra.app.state.config.go_to_review) {

        if (hra.app.get_module('review')) {
  hra.util.module_change(hra.util.get_module_ordinal(hra.app.get_module('review')));
        }
    } hra.app.get_browser();

    if (hra.app.state.config.previous_responses && hra.app.state.config.previous_responses != '{}') {
        hra.app.load_module();
    }
    hra.app.state.responses.save_key = hra.app.state.config.save_key;
    hra.app.save();
};

hra.app.load_module = function () {
    var div = hra.dom.create_element('div', { 'class': 'modal', 'style': 'display:block; background: rgba(0,0,0,0.3);', 'role': 'dialog', 'id': 'hra.modal' }); var modal_dialog = hra.dom.create_element('div', { 'class': 'modal-dialog' }); var modal_content = hra.dom.create_element('div', { 'class': 'modal-content' }); var modal_header = hra.dom.create_element('div', { 'class': 'modal-header' }); modal_header.appendChild(hra.dom.create_element('button', { 'type': 'button', 'class': 'close', 'onclick': 'hra.app.close_modal()' })); modal_header.appendChild(hra.dom.create_element('h4', { 'class': 'modal-title' }, 'Load From Previous Questionaire')); var modal_body = hra.dom.create_element('div', { 'class': 'modal-body' }); modal_body.appendChild(hra.dom.create_element('p', {}, 'You have already started a Health Risk Assessment, but have not submitted it. Would you like to load from a previous HRA or start from scratch?')); var modal_footer = hra.dom.create_element('div', { 'class': 'modal-footer' }); modal_footer.appendChild(hra.dom.create_element('button', { 'class': 'btn btn-primary', 'onclick': 'hra.app.load_saved()', 'type': 'button' }, 'Load From Previous')); modal_footer.appendChild(hra.dom.create_element('button', { 'class': 'btn btn-danger pull-right', 'onclick': 'hra.app.close_modal()', 'type': 'button' }, 'Start from Scratch')); modal_content.appendChild(modal_header); modal_content.appendChild(modal_body); modal_content.appendChild(modal_footer); modal_dialog.appendChild(modal_content); div.appendChild(modal_dialog); document.getElementById('hra.container').appendChild(div);
};


hra.app.load_saved = function () {
    var loaded_responses = JSON.parse(hra.app.state.config.previous_responses); for (var response in loaded_responses) { if (!hra.app.state.responses[response] || response == 'hra.app.units' || response == 'hra.app.cholunits') hra.app.state.responses[response] = loaded_responses[response]; if (document.getElementById(response)) { document.getElementById(response).value = loaded_responses[response]; } } hra.app.save(); hra.app.close_modal();
};

hra.app.close_modal = function () {
    document.getElementById('hra.container').removeChild(document.getElementById('hra.modal'));
};

hra.app.getmodules = function (hra_id) {
    var questionnaire = hra.data.questionnaires[hra_id]; var modules = []; for (var module in questionnaire) { modules.push(questionnaire[module].id); }
    return modules;
};

hra.app.getquestions = function (hra_id) {
    var questionnaire = hra.data.questionnaires[hra_id]; var questions = []; for (var module in questionnaire) { questions[questionnaire[module].id] = questionnaire[module].q; }
    return questions;
};

hra.app.select_modules = function () {
    if (!hra.app.state.responses['hra.app.hra_id'] || hra.app.state.responses['hra.app.hra_id'] == 'default') { hra.app.state.responses['hra.app.hra_id'] = hra.app.state.responses['hra.app.default_hra_id']; } if (hra.app.state.responses['hra.app.hra_id'] == 'comprehensive') { var parts = hra.util.cut_module_list('demographics'); hra.data.modules = [].concat(parts[0], hra.data.comprehensive_modules, parts[1]); }
};

hra.app.render_module = function () {
    hra.dom.set_content(hra.conf.container, hra.app.render_module_panel());
};

hra.app.activate_prefilled_questions = function () {
    for (var key in hra.app.state.responses) { if ((new String(key)).indexOf('hra.q') == 0) { var parts = key.split('.'); hra.util.activate_question(parts[2]); } }
};

hra.app.menu = function (show) {
    if (show == 'show') {
        document.getElementById('menu_list').style.display = 'inline';
    } else if (show == 'hide') {
        document.getElementById('menu_list').style.display = 'none';
    } else {
        if (document.getElementById('menu_list').style.display == 'inline') {
  document.getElementById('menu_list').style.display = 'none';
        } else {
  document.getElementById('menu_list').style.display = 'inline';
        }
    }
}

hra.app.render_module_panel = function () {
    var ce = hra.dom.create_element;
    var module = hra.app.state.current_module;
    var panel = ce('div', { 'class': 'panel panel-default', });
    var parts = { header: ce('div', { 'class': 'panel-heading', 'style': 'padding-bottom: 25px; padding-top: 15px; height: 58px' }), body: ce('div', { 'class': 'panel-body', }), questions: module.q ? hra.app.render_module_questions(module) : ce('div'), dynamic: module.dynamic ? module.dynamic() : ce('div'), footer: ce('div', { 'class': 'panel-footer', 'style': 'height: 58px', }), bottompadding: ce('div'), };
    var module_label = ce('h3', { 'class': 'panel-title', 'id': 'hra.module_label' }, module.label); parts.header.toffest = 0; parts.footer.toffest = 0; parts.header.appendChild(module_label);

    var prompt_lines = module.prompt.split('\')

    for (var i in prompt_lines) {
        parts.body.appendChild(ce('p', {}, prompt_lines[i]));
    }

    parts.footer.appendChild(hra.app.render_module_footer());

    for (var p in parts) {
        panel.appendChild(parts[p]);
    }

    if (module.options) {
        if (module.options.top_submit_button) {
  var submit_button = hra.app.render_submit_button();
  module_label.appendChild(submit_button);
        } else {
  var menu = hra.app.render_settings_button();
  module_label.appendChild(menu);
        }
    } else {
        var menu = hra.app.render_settings_button();
        module_label.appendChild(menu);
    }

    hra.app.save_text = ce('div', { 'style': 'float: right; padding - right: 10px; color:#b3b3b3; font - style: italic' });

    module_label.appendChild(hra.app.save_text);
    hra.app.parts = parts;
    hra.app.panel = panel;

    return panel;
};

hra.app.changeunits = function (unit) {
    hra.app.state.responses['hra.app.units'] = unit;
    hra.util.do_branching();
    hra.util.module_shift(0);
}

hra.app.changecholunits = function (unit) {
    hra.app.state.responses['hra.app.cholunits'] = unit;
    hra.util.do_branching();
}

hra.app.sticky = function () {
    var parts = hra.app.parts; var panel = hra.app.panel; var element = document.getElementById('hra.container');

    if (!parts.header.style.position || parts.header.style.position == "initial") {
        parts.header.toffest = parts.header.offsetTop;
    }

    if (window.pageYOffset > parts.header.toffest) {
        parts.header.style.top = 0;
        parts.header.style.position = 'fixed';
        parts.header.style.width = panel.offsetWidth + 'px';
        parts.header.style.zIndex = "1";
        parts.body.style.paddingTop = '73px';
    } else {
        parts.header.style.top = "initial";
        parts.header.style.position = "static";
        parts.header.style.width = "initial";
        parts.header.style.zIndex = "initial";
        parts.body.style.paddingTop = '0';
    }

    parts.footer.style.bottom = "initial";
    parts.footer.style.position = "static";
    parts.footer.style.width = "initial";
    parts.bottompadding.style.paddingTop = '0';

    if (parts.footer.style.position != "initial") {
        parts.footer.toffest = parts.footer.offsetTop + parts.footer.offsetHeight;
    }

    if ((window.pageYOffset + window.innerHeight) < (parts.footer.toffest)) {
        parts.footer.style.bottom = 0;
        parts.footer.style.position = 'fixed';
        parts.footer.style.width = panel.offsetWidth + 'px';
        parts.bottompadding.style.paddingTop = '58px';
    }
}

hra.app.render_module_footer = function () {
    var ce = hra.dom.create_element;
    var module = hra.app.state.current_module;
    var container = ce('div', { 'class': 'container - fluid' });
    var row = ce('div', { 'class': 'row' });
     var parts = { left: ce('div', { 'class': 'col - sm - 2 col - xs - 4' }), middle: ce('div', { 'class': 'col - sm - 4 hidden - xs' }), middle_mobile: ce('div', { 'class': 'col - xs - 4 visible - xs - block' }), jumper: ce('div', { 'class': 'col - sm - 4 hidden - xs' }), right: ce('div', { 'class': 'col - sm - 2 col - xs - 4' }), };
     if (!hra.util.is_first_module(module)) { var button = ce('button', { 'type': 'button', 'class': 'btn pull - left' }, 'back');
     button.addEventListener('click', hra.app.previous_module);
     parts.left.appendChild(button);
    }
    if (hra.util.is_last_module(module)) {
        var button = hra.app.render_submit_button();
        parts.right.appendChild(button);
    } else {
        var button = ce('button', { 'type': 'button', 'class': 'btn btn - primary pull - right' }, 'next');
        button.addEventListener('click', hra.app.next_module);
        parts.right.appendChild(button);
    }

    parts.middle.appendChild(hra.app.render_progress_bar());
    parts.middle_mobile.appendChild(hra.app.render_mobile_progress_bar());
    parts.jumper.appendChild(hra.app.render_module_jumper());
    hra.app.state.jumper = parts.jumper;
    container.appendChild(row);

    for (var p in parts) {
        row.appendChild(parts[p]);
    }

    return container;
};

hra.app.render_progress_bar = function () {
    var percent_complete = parseInt(100 * hra.util.get_module_ordinal(hra.app.state.current_module) / (hra.util.get_module_count() - 1));
    var progress = hra.dom.create_element('div', { 'class': 'progress', 'style': 'background: rgba(192, 192, 192, 1); margin: 10px; ' });
    var progress_bar = hra.dom.create_element('div', { 'class': 'progress - bar progress - bar - success', 'role': 'progressbar', 'aria - valuenow': percent_complete, 'aria - valuemin': '0', 'aria - valuemax': '100', 'style': 'min - width: 7em; width: ' + percent_complete + ' %; ' }, percent_complete + ' % complete');
    progress.appendChild(progress_bar);

    return progress;
};

hra.app.render_mobile_progress_bar = function () {

    var percent_complete = parseInt(100 * hra.util.get_module_ordinal(hra.app.state.current_module) / (hra.util.get_module_count() - 1));
    var progress = hra.dom.create_element('div', {}, percent_complete + ' % ');
    return progress;
};

hra.app.render_module_jumper = function () {
    var select = hra.dom.create_element('select', { 'class': 'btn', 'style': 'height: auto; xfont - size: 10px; ' });

    select.appendChild(hra.dom.create_element('option', { 'value': 'jump_to' }, 'jump to ...'));

    var current_module_index = hra.util.get_module_ordinal(hra.app.state.current_module);

    for (var i in hra.app.modules) {
        if (i != current_module_index) {
  var module = hra.app.get_module(hra.app.modules[i]); var r = hra.app.state.responses; var visible_questions = false; if (module.id.substring(0, 3) == 'tos' || module.id == 'review') { visible_questions = true; } for (var j in hra.app.questions[module.id]) {
var question = hra.app.get_question(module, hra.app.questions[module.id][j]); if (question) {
    //checks for visibility
    if (hra.app.state.hiddenquestions.indexOf(question['id']) == -1) {
        visible_questions = true;
    }
}
  } if (visible_questions) {
select.appendChild(hra.dom.create_element('option', { 'value': i }, hra.app.get_module(hra.app.modules[i]).label));
  }
        }
    }

    select.onchange = function () {
        hra.util.module_change(hra.util.get_input_value(this));
    }    return select;
};

hra.app.render_submit_button = function () {

    var button = hra.dom.create_element('button', { 'type': 'submit', 'class': 'btn btn - success pull - right' }, 'submit');
    button.addEventListener('click', hra.app.submit_questionnaire);

    return button;
};

hra.app.render_settings_button = function () {
    var ce = hra.dom.create_element;
    var menu = ce('span', { 'class': 'dropdown', 'style': 'float: right' });
    var menu_button = ce('button', { 'class': 'btn btn - primary', 'onclick': 'hra.app.menu()', 'id': 'menu_button', 'type': 'button' }, 'Settings');
    //menu_button.appendChild('span',{'class':'glyphicon glyphicon - cog'});

    var menu_list = ce('ul', { 'id': 'menu_list', 'class': 'dropdown - menu' });
    menu_list.appendChild(ce('li', { 'class': 'dropdown - header' }, 'Units'));
    var li = ce('li');
    li.appendChild(ce('a', { 'onclick': 'hra.app.changeunits('us_customary')', 'href': 'javascript: ; ' }, 'US Customary'));
    menu_list.appendChild(li);
    var li = ce('li');
    li.appendChild(ce('a', { 'onclick': 'hra.app.changeunits('metric')', 'href': 'javascript: ; ' }, 'Metric'));
    menu_list.appendChild(li);
    menu.appendChild(menu_button);

    //chol units

    menu_list.appendChild(ce('li', { 'class': 'dropdown - header' }, 'Cholesterol Units'));
    var li = ce('li');
    li.appendChild(ce('a', { 'onclick': 'hra.app.changecholunits('mg/ dl')', 'href': 'javascript: ; '}, 'mg / dL'));
    menu_list.appendChild(li);
    var li = ce('li');
    li.appendChild(ce('a', { 'onclick': 'hra.app.changecholunits('mm/ l')', 'href': 'javascript: ; '}, 'mm / L'));
    menu_list.appendChild(li);
    menu.appendChild(menu_list);

    return menu
};

hra.app.render_response_review = function () {
    var list_group = hra.dom.create_element('ul', { 'class': 'list - group' });
    for (var m in hra.app.modules) {
        var module = hra.app.get_module(hra.app.modules[m]);
        if (module.q) {
  var li = hra.dom.create_element('li', { 'class': 'list - group - item' });
  var heading = hra.dom.create_element('h2', {}, module.label);
  var button = hra.dom.create_element('button', { 'data - target': hra.util.get_module_ordinal(module), 'type': 'button', 'class': 'btn btn - warning pull - right' }, 'review');

  button.onclick = function () {
hra.util.module_change(this.getAttribute('data - target'));
  };

  li.appendChild(heading);
  heading.appendChild(button);
  var active_question_count = 0;
        //debug

  for (var q in module.q) {
if (hra.util.is_question_active(module.q[q].id)) {
    active_question_count++;
    //debug
    li.appendChild(hra.app.render_question(hra.app.get_question(module, module.q[q].id), { readonly: true }));
}
  }

  console.log('active_question_count = ' + active_question_count);
  //debug

  list_group.appendChild(li);
        }
    }
    return list_group;
};

hra.app.render_module_questions = function (module, options) {
    var list_group = hra.dom.create_element('ul', { 'class': 'list - group' });
    for (var i in hra.app.questions[module.id]) {
        question = hra.app.get_question(module, hra.app.questions[module.id][i]);
        if (question) {
  hra.util.activate_question(question.id);
  var li = hra.dom.create_element('li', { 'class': 'list - group - item', 'id': 'hra.module.q.' + question.id + '.container' });
  li.appendChild(hra.app.render_question(question), options);
  list_group.appendChild(li);
        } else {
  console.error('Cannot render question ' + hra.app.questions[module.id][i]);
        }
    }
    return list_group;
};

hra.app.render_question = function (q, options) {

    var ce = hra.dom.create_element;
    var row = ce('div', { 'class': 'row' });
    parts = {
        error: ce('div', {
  'id': 'hra.q.' + q.id + '.error', 'style': 'display: none; ', 'class': 'col - xs - 12 alert - danger'
        }),
        q: ce('div', { 'class': 'col - xs - 12 col - sm - 6' }),
        a: ce('div', { 'class': 'col - xs - 12 col - sm - 6' }),
        feedback: ce('div', { 'id': 'hra.q.' + q.id + '.feedback', 'style': 'display: none; ', 'class': 'col - xs - 12 alert - success' }),
    };
    parts.q.appendChild(ce('h3', {}, q.label));
    parts.q.appendChild(ce('p', {}, q.prompt))    parts.a.appendChild(hra.app.render_question_inputs(q, options));
    for (var p in parts) {
        row.appendChild(parts[p]);
    }

    return row;
};

hra.app.get_module = function (id) {

    for (var module in hra.data.modules) {
        if (hra.data.modules[module].id == id) {
  return hra.data.modules[module];
        }
    }
    console.log('hra.app.get_module failed for ' + id);//debug
    return null;
};

hra.app.get_question = function (module, qid) {
    for (var q in module.q) {
        if (module.q[q].id == qid) {
  return module.q[q];
        }
    }
    return null;
};

hra.app.render_question_inputs = function (q, options) {
    var readonly = options ? options.readonly : false;
    var ce = hra.dom.create_element;
    var outer = ce('div');
    for (var i in q.input) { var row = ce('div', { 'style': 'margin - bottom: 10px; ' });
    var parts = { input: ce('div', { 'style': 'float: left; clear: left; min - width: 30px; ' }), label: ce('label', { 'style': 'float: left; clear: right; margin - left: 10px; ' }), fix: ce('div', { 'class': 'clearfix' }), };

    switch (q.input[i].type) {
        case 'number':
  var attributes = { 'class': 'form - control', 'type': 'number', 'id': hra.util.input_id(q, i) };
  if (!q.input[i].allow_decimals) {
attributes['step'] = 1;
  }
  if (readonly) {
attributes['disabled'] = 'disabled';
  }
  var optional = ['min', 'max'];
  for (var o in optional) {
if (q.input[i][optional[o]] != undefined) {
    attributes[optional[o]] = q.input[i][optional[o]];
}
  }
  var input = ce('input', attributes);
  input.onchange = hra.app.respond_to_input;
  parts.input.appendChild(input);
  parts.label.appendChild(ce('span', {}, q.input[i].units));
        break;
        case 'select':
  var attributes = { 'class': 'form - control', 'id': hra.util.input_id(q, i) };
  if (readonly) {
attributes['disabled'] = 'disabled';
  }
  var select = ce('select', attributes);
  for (var v in q.input[i].values) { var label = '';
  if (q.input[i].values[v].unitlabel) { label = q.input[i].values[v].unitlabel[hra.app.state.responses['hra.app.units']];
  } else { label = q.input[i].values[v].label;
  } select.appendChild(ce('option', { 'value': q.input[i].values[v].id }, label));
  } select.onchange = hra.app.respond_to_input;
  parts.input.appendChild(select);
        break;
        case 'radio':
  for (var v in q.input[i].values) {
var radio = ce('div', { 'class': 'radio' });
var label = ce('label');
var attributes = { 'type': 'radio', 'name': hra.util.radio_name(q, i), 'id': hra.util.input_id(q, i, v), 'value': q.input[i].values[v].id }
if (readonly) {
    attributes['disabled'] = 'disabled';
}
var input = ce('input', attributes);
input.onchange = hra.app.respond_to_input;
label.appendChild(input);
label.appendChild(document.createTextNode(q.input[i].values[v].label));
radio.appendChild(label);
parts.input.appendChild(radio);
  }
  break;
    }
    for (var p in parts) {
        row.appendChild(parts[p]);
    }
    outer.appendChild(row);
    }
    return outer;
};

hra.app.respond_to_input = function () {
    //console.log(arguments);
    hra.util.gather_input_values();
    hra.util.do_branching();
    hra.app.sticky();
    hra.app.save();
    // types of actions:
    // 1. required: a response to the question is required before module can change (in order answering?)
    // 2. hide/show: the question triggers display of other questions
    // 3. validation: the question has a specific range of valid values
    // 4. feedback: positive feedback message displayed in-line
    //
    // when do these run?

    // 1. module load time (visibility decisions)
    // 2. module unload time (prevent user from submitting invalid or incomplete input)

    // 3. on input change (visibility and feedback decisions)
};

hra.app.save = function () {

    hra.app.save_text.innerHTML = 'Saving';
    hra.util.serialize_responses();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
  hra.app.state.config.save_key = this.responseText;
  hra.app.state.responses.save_key = this.responseText;
  hra.app.save_text.innerHTML = 'Saved';
  window.setTimeout(function () {
hra.app.save_text.innerHTML = ''
  }, 3000);
        }
    };

    xhttp.open("POST", hra.app.state.config.server_url + "/api/v2/save", true);

    var formdata = new FormData();
    formdata.append('json', document.getElementById('json').value);
    formdata.append('key', hra.app.state.config.save_key);
    xhttp.send(formdata);
};

hra.app.next_module = function () {
    hra.util.module_shift(1);
};

hra.app.previous_module = function () {
    current_index = hra.util.get_module_ordinal(hra.app.state.current_module); for (i = 1; i <= current_index; i++){
        var module = hra.app.get_module(hra.app.modules[current_index - i]);
        var r = hra.app.state.responses;

        var visible_questions = false;
        if (module.id == 'tos' || module.id == 'review') {
  visible_questions = true;
        }

        for (var j in hra.app.questions[module.id]) {
  var question = hra.app.get_question(module, hra.app.questions[module.id][j]);
  if (question) {
//checks for visibility
if (hra.app.state.hiddenquestions.indexOf(question['id']) == -1) {
    visible_questions = true;
}
  }
        } if (visible_questions) {
  hra.util.module_shift(i * -1); break;
        }
    }
};

hra.app.submit_questionnaire = function () {
    hra.app.state.responses["unique_string"] = hra.util.create_random_string();
    hra.util.serialize_responses();
};

hra.app.get_browser = function () {
    hra.app.state.responses['hra.app.browser'] = navigator.userAgent;
}

hra.util.gather_input_values = function () {

    var inputs = hra.util.get_input_elements(); for (var i in inputs) { var value = hra.util.get_input_value(inputs[i]); if (value) { hra.app.state.responses[inputs[i].id] = value; } else { delete hra.app.state.responses[inputs[i].id]; } } var radios = hra.util.get_radio_elements(); for (var i in radios) { if (radios[i].checked) { var hidden_id_parts = radios[i].id.split('.'); var hidden_id = hidden_id_parts.splice(0, hidden_id_parts.length - 1).join('.'); hra.app.state.responses[hidden_id] = radios[i].value; } }
};

hra.util.fill_input_values = function () {
    var inputs = hra.util.get_input_elements(); for (var i in inputs) { if (hra.app.state.responses[inputs[i].id]) { hra.util.put_input_value(inputs[i], hra.app.state.responses[inputs[i].id]); } }
};

hra.util.put_input_value = function (input, value) {
    switch (input.tagName) { case 'SELECT': for (var o in input.children) { if (value == input.children[o].value) { input.children[o].selected = true; break; } } break; case 'INPUT': switch (input.getAttribute('type')) { case 'radio': if (value == input.value) { input.checked = true; } break; case 'number': input.value = value; break; }  break; }
};

hra.util.get_input_elements = function () {
    return document.querySelectorAll(' * [id ^="hra.q"]');
};

hra.util.get_radio_elements = function () {

    return document.querySelectorAll('input[type="radio"]');
};

hra.util.serialize_responses = function () {
    var output_element = document.getElementById(hra.conf.output_element) ? document.getElementById(hra.conf.output_element) : hra.dom.create_element('input', { 'type': 'hidden', 'id': hra.conf.output_element, 'name': hra.conf.output_element });

    output_element.setAttribute('value', JSON.stringify(hra.app.state.responses));
    document.getElementById(hra.conf.container).appendChild(output_element);

};

hra.util.get_input_value = function (input) {
    var value = undefined;
    switch (input.tagName) {
        case 'SELECT': for (var o in input.children) { if (input.children[o].selected) { value = input.children[o].value; } } break; case 'INPUT': switch (input.getAttribute('type')) { case 'radio': if (input.checked) { value = input.value; } break; case 'number': value = input.value; break; }  break;
    }
    return value;
};

hra.util.input_id = function (q, i, v) {
    var parts = ['hra', 'q', q.id, 'a']; if (!v) { v = 0; } var suffix = (q.input[i].values) ? (q.input[i].type == 'radio' ? q.input[i].values[v].id : null) : q.input[i].units.replace(/[/ ]/, '_'); if (suffix) { parts.push(suffix); } var id = parts.join('.'); return id;
};
hra.util.radio_name = function (q, i) {
    return 'hra.q.' + q.id + '.radio.' + i;
};

hra.util.module_shift = function (offset) {

    hra.util.module_change(hra.util.get_module_ordinal(hra.app.state.current_module) + offset);
};

hra.util.module_change = function (index) {

    var current_index = hra.util.get_module_ordinal(hra.app.state.current_module);
    if (index > current_index) {
        for (var i = current_index;i < index;i++){
  hra.util.gather_input_values();
  hra.util.hide_errors();
  if (!hra.util.validate_input()) {
return false;
  }
  hra.app.state.current_module = hra.app.get_module(hra.app.modules[i + 1]);
  hra.app.render_module();
  hra.util.fill_input_values();
  hra.util.do_branching();
  hra.util.update_questions();
  hra.util.scroll_to_element(hra.conf.container);
        }
    } else {
        hra.util.gather_input_values();
        hra.util.hide_errors();
        if (!hra.util.validate_input()) {
  return false;
        }
        hra.app.state.current_module = hra.app.get_module(hra.app.modules[index]);
        hra.app.render_module();
        hra.util.fill_input_values();
        hra.util.do_branching();
        hra.util.update_questions();
        hra.util.scroll_to_element(hra.conf.container);
}

};

hra.util.display_error = function (qid, msg) {
    var e = document.getElementById('hra.q.' + qid + '.error');
    var p = hra.dom.create_element('p', {}, msg);
    hra.dom.set_content(e.id, p);
    p.style.marginTop = '10px';
    e.style.display = 'block';
    e.style.marginBottom = '10px';
    return e.id;
};

hra.util.hide_errors = function () {
    var e = document.getElementsByClassName('alert-danger');
    for (var i = 0; i < e.length; i++){ e[i].style.display = 'none'; }
}

hra.dom.hide_by_id = function (elid) {
    hra.dom.set_visibility_by_id(elid, 'hide');
};

hra.dom.show_by_id = function (elid) {
    hra.dom.set_visibility_by_id(elid, 'show');
};

hra.dom.set_visibility_by_id = function (elid, action) {
    var el = document.getElementById(elid); if (el) {
        el.style.display = (action == 'hide') ? 'none' : '';
    } else { console.error('No element to ' + action + ' for ID: ' + elid); }
};

hra.dom.lock_by_id = function (elid){
    var lock = function (el) { for (var i in el.children) { lock(el.children[i]); } if (el.tagName && (el.tagName == 'SELECT' || el.tagName == 'INPUT')) { el.setAttribute('readonly', true); } }    var el = document.getElementById(elid); if (el) { lock(el); } else { console.error('No element to ' + action + ' for ID: ' + elid); }
};

hra.util.activate_question = function (qid) {
    var active_set = hra.app.state.active_questions; var question_in_set = false; for (var i in active_set) { if (active_set[i] == qid) { question_in_set = true; } } if (!question_in_set) { hra.app.state.active_questions.push(qid); }
};

hra.util.deactivate_question = function (qid) {
    var active_set = []; for (var i in hra.app.state.active_questions) { if (hra.app.state.active_questions[i] != qid) { active_set.push(hra.app.state.active_questions[i]); } } hra.app.state.active_questions = active_set;
};

hra.util.is_question_active = function (qid) {
    for (var i in hra.app.state.active_questions) { if (hra.app.state.active_questions[i] == qid) { return true; } } return false;
};

hra.util.update_questions = function (actions) {
    if (actions) { for (var i in actions.hide) { if (hra.app.state.hiddenquestions.indexOf(actions.hide[i]) == -1) { hra.app.state.hiddenquestions.push(actions.hide[i]); } if (hra.app.state.shownquestions.indexOf(actions.hide[i]) != -1) { hra.app.state.shownquestions.splice(hra.app.state.shownquestions.indexOf(actions.hide[i]), 1); } } for (var i in actions.show) { if (hra.app.state.shownquestions.indexOf(actions.show[i]) == -1) { hra.app.state.shownquestions.push(actions.show[i]); } if (hra.app.state.hiddenquestions.indexOf(actions.show[i]) != -1) { hra.app.state.hiddenquestions.splice(hra.app.state.hiddenquestions.indexOf(actions.show[i]), 1); } } } var default_hidden = hra.app.state.config['hra.app.default_hidden_questions']    for (var i in default_hidden) { if (hra.app.state.hiddenquestions.indexOf(default_hidden[i]) == -1) { hra.app.state.hiddenquestions.push(default_hidden[i]); } if (hra.app.state.shownquestions.indexOf(default_hidden[i]) != -1) { hra.app.state.shownquestions.splice(hra.app.state.shownquestions.indexOf(default_hidden[i]), 1); } } for (var i in hra.app.state.hiddenquestions) { if (document.getElementById('hra.module.q.' + hra.app.state.hiddenquestions[i] + '.container')) { hra.dom.hide_by_id('hra.module.q.' + hra.app.state.hiddenquestions[i] + '.container'); hra.util.deactivate_question(hra.app.state.hiddenquestions[i]); } } for (var i in hra.app.state.shownquestions) { if (document.getElementById('hra.module.q.' + hra.app.state.shownquestions[i] + '.container')) { hra.dom.show_by_id('hra.module.q.' + hra.app.state.shownquestions[i] + '.container'); hra.util.activate_question(hra.app.state.shownquestions[i]); } } var default_locked = hra.app.state.config['hra.app.default_locked_questions']    for (var i in default_locked) { if (document.getElementById('hra.module.q.' + default_locked[i] + '.container')) { hra.dom.lock_by_id('hra.module.q.' + default_locked[i] + '.container'); } }
};

hra.util.count_drinks = function () {
    var r = hra.app.state.responses; var total_drinks = 0; var drinks_inputs = ['beer', 'wine', 'mixed_drinks', 'wine_coolers']; for (var i in drinks_inputs) { total_drinks += parseInt(r['hra.q.weekly_alcohol.a.' + drinks_inputs[i]]) ? parseInt(r['hra.q.weekly_alcohol.a.' + drinks_inputs[i]]) : 0; } return total_drinks;
};

hra.util.do_branching = function () {
    var module = hra.app.state.current_module; var r = hra.app.state.responses; var visible_questions = false; if (module.id == 'tos' || module.id == 'review') { visible_questions = true; } for (var j in hra.app.questions[module.id]) {
        var question = hra.app.get_question(module, hra.app.questions[module.id][j]); if (question) {
  //checks for visibility
  if (hra.app.state.hiddenquestions.indexOf(question['id']) == -1) { visible_questions = true; }

  //checks and converts units
  if (question.system_of_measurement) {
if (question.system_of_measurement == hra.app.state.responses['hra.app.units']) {
    hra.util.update_questions({ show: [question.id] });
    if (question.counterpart) {
        var counterpart = hra.app.get_question(module, question.counterpart);

        if (question.input[0].units == 'feet' && question.input[1].units == 'inches') {
  var feetinput = hra.util.input_id(question, 0); var inchinput = hra.util.input_id(question, 1);
  var feetvalue = document.getElementById(feetinput).value; var inchvalue = document.getElementById(inchinput).value;

  if (feetvalue && inchvalue) {
var feet = parseFloat(feetvalue); var inch = parseFloat(inchvalue); var centemeters = ((feet * 12 + inch) * 2.54).toString()
var counterpartinput = hra.util.input_id(counterpart, 0);

document.getElementById(counterpartinput).value = centemeters;

hra.app.state.responses['hra.q.' + question.counterpart + '.a.centemeters'] = centemeters;
  }
        } else if (question.input[0].units == 'pounds') {
  var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value;

  if (value) {
var pounds = parseFloat(value); var kilograms = (pounds * 0.453592).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = kilograms; hra.app.state.responses['hra.q.' + question.counterpart + '.a.kilograms'] = kilograms;
  }
        } else if (question.input[0].units == ',000 miles') {
  var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var miles = parseFloat(value)var kilometers = (miles * 1.60934).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = kilometers; hra.app.state.responses['hra.q.' + question.counterpart + '.a.,000 kilometers'] = kilometers; }
        } else if (question.input[0].units == 'centemeters') {
  var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var centemeters = parseFloat(value); var inches = centemeters * 0.393701; var feet = ((inches - inches % 12) / 12).toString(); inches = (inches % 12).toString(); var counterpartinches = hra.util.input_id(counterpart, 1); var counterpartfeet = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinches).value = inches; document.getElementById(counterpartfeet).value = feet; hra.app.state.responses['hra.q.' + question.counterpart + '.a.feet'] = feet; hra.app.state.responses['hra.q.' + question.counterpart + '.a.inches'] = inches; }
        } else if (question.input[0].units == 'kilograms') {
  var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var kilograms = parseFloat(value); var pounds = (kilograms * 2.20462).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = pounds; hra.app.state.responses['hra.q.' + question.counterpart + '.a.pounds'] = pounds; }
        } else if (question.input[0].units == ',000 kilometers') {
  var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var kilometers = parseFloat(document.getElementById(input).value); var miles = (kilometers * 0.621371).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = miles; hra.app.state.responses['hra.q.' + question.counterpart + '.a.miles'] = miles; }
        }
    }
} else if (question.system_of_measurement == hra.app.state.responses['hra.app.cholunits']) {
    hra.util.update_questions({ hide: [question.counterpart] }); if (question.counterpart) { var counterpart = hra.app.get_question(module, question.counterpart); if (question.input[0].units == 'mg/dl') { var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var mgdl = parseFloat(value); var mml = (mgdl / 18).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = mml; hra.app.state.responses['hra.q.' + question.counterpart + '.a.mm_l'] = mml; } } else if (question.input[0].units == 'mm/l') { var input = hra.util.input_id(question, 0); var value = document.getElementById(input).value; if (value) { var mmol = parseFloat(value); var mgdl = (mmol * 18).toString(); var counterpartinput = hra.util.input_id(counterpart, 0); document.getElementById(counterpartinput).value = mgdl; hra.app.state.responses['hra.q.' + question.counterpart + '.a.mg_dl'] = mgdl; } } }
} else {
    hra.util.update_questions({ hide: [question.id] });
}
  }

  for (var i in question.input) {
//does standard branching
switch (question.input[i].type) {
    case 'select':
        var id = hra.util.input_id(question, i);
        var value = document.getElementById(id).value;
        for (v in question.input[i].values) {

  if (question.input[i].values[v].id == value) {
if (question.input[i].values[v].hide) {
    hra.util.update_questions({ hide: question.input[i].values[v].hide });
}
if (question.input[i].values[v].show) {
    hra.util.update_questions({ show: question.input[i].values[v].show });
}
break;
  }
        }
        if (question.input[i].showhide) {
  for (var s in question.input[i].showhide) {
var showhide = question.input[i].showhide[s]
var id = hra.util.input_id(question, i);
var value = parseInt(document.getElementById(id).value);
if (isNaN(value)) { value = 0; }
if (showhide.sum) {
    for (var s in showhide.sum) {
        if (!isNaN(parseFloat(hra.app.state.responses['hra.q.' + showhide.sum[s]]))) {
  value = value + parseFloat(hra.app.state.responses['hra.q.' + showhide.sum[s]]);
        }
    }
} if (showhide.low) {
    if (showhide.high) {
        if (value < showhide.high && value >= showhide.low) {
  if (showhide.hide) {
hra.util.update_questions({ hide: showhide.hide });
  } if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    } else {
        if (value >= showhide.low) {
  if (showhide.hide) {
hra.util.update_questions({ hide: showhide.hide });
  }
  if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    }
} else {
    if (showhide.high) {
        if (value < showhide.high) {
  if (showhide.hide) {
hra.util.update_questions({ hide: showhide.hide });
  }
  if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    }
}
  }
        }
    break;
    case 'radio':
        for (var v in question.input[i].values) {
  if (document.getElementById(hra.util.input_id(question, i, v)).checked) {
if (question.input[i].values[v].hide) {
    hra.util.update_questions({ hide: question.input[i].values[v].hide });
}
if (question.input[i].values[v].show) {
    hra.util.update_questions({ show: question.input[i].values[v].show });
}
  }
        }
    break;
    case 'number':
        if (question.input[i].showhide) {

  for (var s in question.input[i].showhide) {
var showhide = question.input[i].showhide[s];
var id = hra.util.input_id(question, i);
var value = parseFloat(document.getElementById(id).value); if (isNaN(value)) { value = 0; } if (showhide.sum) {
    for (var s in showhide.sum) {
        if (!isNaN(parseFloat(document.getElementById('hra.q.' + showhide.sum[s]).value))) {
  value = value + parseFloat(document.getElementById('hra.q.' + showhide.sum[s]).value);
        }
    }
} if (showhide.low) {
    if (showhide.high) {
        if (value < showhide.high && value >= showhide.low) {
  if (showhide.hide) {
hra.util.update_questions({ hide: showhide.hide });
  }
  if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    } else {
        if (value >= showhide.low) {
  if (showhide.hide) {
  hra.util.update_questions({ hide: showhide.hide });
  }
  if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    }
} else {
    if (showhide.high) {
        if (value < showhide.high) {
  if (showhide.hide) {
hra.util.update_questions({ hide: showhide.hide });
  }
  if (showhide.show) {
hra.util.update_questions({ show: showhide.show });
  }
        }
    }
}
  }
        break;
    }
}
  }
        }
    } if (!visible_questions) {
        hra.util.module_shift(1);
    }
    hra.app.state.jumper.innerHTML = '';
    hra.app.state.jumper.appendChild(hra.app.render_module_jumper());
}

hra.util.validate_input = function () {
    var rval = true;
    // return false if validation fails
    var error_id = null; var module = hra.app.state.current_module; var r = hra.app.state.responses;
    // check required questions
    for (var i in hra.app.questions[module.id]) {
        var question = hra.app.get_question(module, hra.app.questions[module.id][i]); if (question) {
  if (question.required) {
if (hra.util.is_question_active(question.id)) {
    var answered = true; for (i in question.input) {
        var id = hra.util.input_id(question, i); var value = hra.app.state.responses[id];

        switch (question.input[i].type) {
  case 'select': if (!value || value == 'not_answered' || value == 'not answered') {
answered = false;
  } break;
  case 'number': if (!value) { answered = false; } break;
  case 'radio': var checked = false;
for (var r in question.input[i].values) {
    id = hra.util.input_id(question, i, r);
    if (document.getElementById(id).checked) { checked = true; }
}
if (!checked) { answered = false; } break;
        }
    }
    if (!answered) {
        var error = hra.util.display_error(question.id, 'This question is required.'); error_id = error_id ? error_id : error; rval = false;
    }
}
  }
        }
    }

    // range check current inputs
    for (var i in hra.app.questions[module.id]) {
        var question = hra.app.get_question(module, hra.app.questions[module.id][i]); if (question) {
  if (hra.app.state.hiddenquestions.indexOf(question.id) == -1) {
for (var i in question.input) {
    if (question.input[i].type == 'number') {
        var id = hra.util.input_id(question, i);
        try {
  var value = document.getElementById(id).value; if (value != '') {
value = parseInt(value); if (question.input[i].allow_decimals) {
    if (isNaN(value) || !document.getElementById(id).value.match(/^[0-9.]{0,}$/)) { var error = hra.util.display_error(question.id, 'Please enter a valid positive number'); error_id = error_id ? error_id : error; rval = false; }
} else {
    if (isNaN(value) || !document.getElementById(id).value.match(/^[0-9]{0,}$/)) {
        var error = hra.util.display_error(question.id, 'Please enter a valid whole positive number'); error_id = error_id ? error_id : error; rval = false;
    }
} if (question.input[i].min != undefined) {
    if (value < question.input[i].min) { var error = hra.util.display_error(question.id, 'Please enter ' + question.input[i].units + ' greater than or equal to ' + question.input[i].min); error_id = error_id ? error_id : error; rval = false; }
} if (question.input[i].minvariable != undefined) {
    var min = hra.app.state.responses[question.input[i].minvariable]; if (value < min) { var error = hra.util.display_error(question.id, 'Please enter ' + question.input[i].units + ' greater than or equal to ' + min); error_id = error_id ? error_id : error; rval = false; }
} if (question.input[i].max != undefined) {
    if (value > question.input[i].max) {
        var error = hra.util.display_error(question.id, 'Please enter ' + question.input[i].units + ' less than or equal to ' + question.input[i].max); error_id = error_id ? error_id : error; rval = false;
    }
} if (question.input[i].maxvariable != undefined){
    var max = hra.app.state.responses[question.input[i].maxvariable];

    if (value > max) {
        var error = hra.util.display_error(question.id, 'Please enter ' + question.input[i].units + ' less than or equal to ' + max); error_id = error_id ? error_id : error; rval = false;
    }
}
  }
        } catch (e) {
  console.error('Error checking input: ' + id); console.trace(e);
  //debug
        }
    }
}
  }
        }
    }

    if (error_id) { hra.util.scroll_to_element(error_id); } return rval;
};

hra.util.scroll_to_element = function (id) {
    var offset = hra.util.get_element_offset(document.getElementById(id)); if (hra.app.parts.header.style.position == 'fixed') { offset.top = offset.top - hra.app.parts.header.offsetHeight; window.scrollTo(offset.left, offset.top); } else { window.scrollTo(offset.left, offset.top); hra.app.sticky(); offset.top = offset.top - hra.app.parts.header.offsetHeight; window.scrollTo(offset.left, offset.top); }
};

hra.util.get_element_offset = function (element) {
    return { top: hra.util.element_offset_recursive(element, 'offsetTop'), left: hra.util.element_offset_recursive(element, 'offsetLeft'), };
};

hra.util.element_offset_recursive = function (element, offset_type) {
    var offset = 0; do { if (!isNaN(element[offset_type])) { offset += element[offset_type]; } } while (element = element.offsetParent); return offset;
};

hra.util.get_module_ordinal = function (module) {
    for (var i in hra.app.modules) { if (module.id == hra.app.get_module(hra.app.modules[i]).id) { return parseInt(i); } }
};

hra.util.get_module_position_by_id = function (module_id) {
    for (var i in hra.data.modules) { if (module_id == hra.data.modules[i].id) { return parseInt(i); } }
};

hra.util.cut_module_list = function (before_id) {
    var cut_index = hra.util.get_module_position_by_id(before_id); return [hra.data.modules.slice(0, cut_index), hra.data.modules.slice(cut_index),];
};

hra.util.get_module_count = function () {
    return hra.app.modules.length;
};

hra.util.is_first_module = function (module) {
    return hra.util.get_module_ordinal(module) == 0;
};

hra.util.is_last_module = function (module) {
    return hra.util.get_module_ordinal(module) == hra.util.get_module_count() - 1;
};

hra.util.create_random_string = function (module) {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

hra.dom.create_element = function (tag_name, attributes, text) {
    var element = document.createElement(tag_name);
    if (element.setAttribute) {
        for (var i in attributes) { element.setAttribute(i, attributes[i]); }
    }
    if (text) {
        var text_node = document.createTextNode(text); element.appendChild(text_node);
    }
    return element;
};

hra.dom.set_content = function (element_id, content) {
    var element = document.getElementById(element_id); element.innerHTML = ''; element.appendChild(content);
};

hra.data.modules = [{ id: 'tos', label: 'Terms of Service', prompt: 'Welcome to the HealthyLife health risk appraisal.By continuing, you accept the terms of service.', q: [{ id: 'uconntos', label: 'Please read and agree to the following terms', prompt: 'The purpose of this exercise is for you to explore and learn about your health risks and of health risks faced by others in the population. Participation will take about 20 minutes. Taking part in this assessment is voluntary and you can choose not to participate. The only risk to you is that you might be uncomfortable answering some of the questions. Feel free to skip any question which makes you feel uncomfortable. Your answers will be maintained as confidential. Responses will not be associated with your personal information. If you have any questions about this exercise you can contact Dr. Lawrence K. Silbart at Lawrence.Silbart@uconn.edu ', input: [{ type: 'radio', values: [{ id: 'agree', label: 'I Agree' }] }], required: true, }] }, { id: 'tos_fitnessfair', label: 'Terms of Service', prompt: 'Welcome to the ChooseLife health risk appraisal.By continuing, you accept the terms of service. This is a mini version of the full HRA which consists of a certain number of questions.', q: [] }, {
    id: 'basic_information', label: 'Basic Information', prompt: 'Please answer the following questions.', q: [{ id: 'sex', label: 'Sex', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'male', label: 'Male', hide: ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'pap_smear_test', 'hysterectomy'], show: ['prostate_cancer_screening'] }, { id: 'female', label: 'Female', show: ['age_at_menarche', 'age_of_bearing_first_child', 'last_mammogram', 'family_breast_cancer_history', 'pap_smear_test', 'hysterectomy'], hide: ['prostate_cancer_screening'] }], }], required: true, }, { id: 'age_in_years', label: 'Age', input: [{ type: 'number', units: 'years', min: 15, max: 120, showhide: [{ low: 40, show: ['diabetes_status', 'stroke', 'heart_attack', 'heart_disease'] }, { high: 40, hide: ['diabetes_status', 'stroke', 'heart_attack', 'heart_disease', 'family_breast_cancer_history', 'last_mammogram'] }, { low: 21, show: [] }, { high: 21, hide: ['pap_smear_test'] }, { low: 50, show: ['colon_cancer_screening'] }, { high: 50, hide: ['colon_cancer_screening'] }], }], required: true, }, { id: 'height', label: 'Height', prompt: 'Without shoes, no fractions.', input: [{ type: 'number', units: 'feet', min: 2, max: 7, }, { type: 'number', units: 'inches', min: 0, max: 11, },], required: true, system_of_measurement: 'us_customary', counterpart: 'height_cm' }, { id: 'height_cm', label: 'Height', prompt: 'Without shoes, no fractions.', input: [{ type: 'number', units: 'centemeters', min: 60, max: 240, },], required: true, system_of_measurement: 'metric', counterpart: 'height' }, { id: 'weight', label: 'Weight', prompt: 'Without shoes, no fractions.', input: [{ type: 'number', units: 'pounds', min: 50, max: 700, },], required: true, system_of_measurement: 'us_customary', counterpart: 'weight_kg' }, { id: 'weight_kg', label: 'Weight', prompt: 'Without shoes, no fractions.', input: [{ type: 'number', units: 'kilograms', min: 20, max: 300, },], required: true, system_of_measurement: 'metric', counterpart: 'weight' },
        //feedback: bmi > 18.4 && bmi < 25, You’re doing great with your weight!
        { id: 'body_frame_size', label: 'Describe your body frame size', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'small', label: 'Small' }, { id: 'medium', label: 'Medium' }, { id: 'large', label: 'Large' }], }], required: true, }, { id: 'diabetes_status', label: 'Diabetes', prompt: 'Have you ever been told that you have diabetes (or sugar diabetes)?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes', hide: ['blood_glucose'], show: ['hb1ac_check'] }, { id: 'no', label: 'No', show: ['blood_glucose'], hide: ['hb1ac_check'] },] }] }, { id: 'stroke', label: 'Stroke', prompt: 'Have you ever been told that you had a stroke?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' },] }] }, { id: 'heart_attack', label: 'Heart Attack', prompt: 'Have you ever been told that you had a heart attack?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' },] }] }, { id: 'heart_disease', label: 'Heart Disease', prompt: 'Have you ever been told that you have heart disease?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' },] }] },]
}, {
    id: 'blood_pressure', label: 'Blood Pressure', prompt: 'Please answer the following questions.', q: [{ id: 'blood_pressure_medication', label: 'Blood Pressure Medication', prompt: 'Are you taking blood pressure medication?', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '0', label: 'No' },] }] }, {
        id: 'blood_pressure_measured', label: 'Blood Pressure', prompt: 'What is your blood pressure now?  If you don't know, estimate below in the next question.',input: [    {        type: 'number',        units: 'high number',        min: 70,        max: 200,        showhide:[{sum: ['blood_pressure_measured.a.low_number'],  low: 130,  hide: ['blood_pressure_estimated']}, {sum: ['blood_pressure_measured.a.low_number'],  high: 130,  show: ['blood_pressure_estimated']}]    },    {        type: 'number',        units: 'low number',        min: 40,        max: 120,    }]
},
//feedback: if bloodpreH < 140 && bloodpreL < 90 && bloodmed='yes', Great job keeping your BP under control! Give yourself a pat on the back!
//  else if bloodpreH < 140 && bloodpreL < 90, Your BP is at good level. Give yourself a pat on the back!
        {
  id: 'blood_pressure_estimated', label: 'Estimate Blood Pressure', prompt: 'If you do not know the numbers, choose the option that describes your blood pressure.', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'high', label: 'High' }, { id: 'normal_or_low', label: 'Normal or low' }, { id: 'not_known', label: 'Don't know'},] }]  }, { id: 'cholesterol_medication', label: 'Cholesterol Medication', prompt: 'During the past month have you taken any medication for cholesterol ? ', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '0', label: 'No' },] }] }, { id: 'cholesterol_check', label: 'Cholesterol Check', prompt: 'Have you had your cholesterol checked in the last five years?', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer', hide: ['cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { id: 'yes', label: 'Yes', show: ['cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { id: 'no', label: 'No', hide: ['cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] }, { id: 'not_known', label: 'Don't know', hide: ['cholesterol_level', 'cholesterol_level_mml', 'hdl_cholesterol', 'hdl_cholesterol_mml'] },] }]
        }, {
  id: 'cholesterol_level', label: 'Cholesterol Level', prompt: 'What is your total cholesterol level(based on a blood test)?Leave it blank if you don't remember.', input: [{ type: 'number', units: 'mg / dl', min: 90, max: 400, showhide: [{ low: 90, hide: ['cholesterol_level_estimated'] }, { high: 90, show: ['cholesterol_level_estimated'] }] },], system_of_measurement: 'mg / dl', counterpart: 'cholesterol_level_mml' }, { id: 'cholesterol_level_mml', label: 'Cholesterol Level', prompt: 'What is your total cholesterol level(based on a blood test)?Leave it blank if you don't remember.', input: [{ type: 'number', units: 'mm / l', min: 5, max: 20, allow_decimals: true },], system_of_measurement: 'mm / l', counterpart: 'cholesterol_level',
        },
        //feedback: if chol<180 && age<30Good job, your cholesterol is in a good range. Keeping your cholesterol in this range lowers your risk for heart problems or stroke.
        //feedback: if chol<200 Good job, your cholesterol is in a good range. Keeping your cholesterol in this range lowers your risk for heart problems or stroke.
  {
id: 'hdl_cholesterol', label: 'HDL Cholesterol', prompt: 'What is your HDL cholesterol level(based on a blood test)?Leave it blank if you don't remember.', input: [{ type: 'number', units: 'mg / dl', min: 25, max: 120, showhide: [{ low: 25, hide: ['hdl_cholesterol_estimated'] }, { high: 25, show: ['hdl_cholesterol_estimated'] }] }], system_of_measurement: 'mg / dl', counterpart: 'hdl_cholesterol_mml' }, { id: 'hdl_cholesterol_mml', label: 'HDL Cholesterol', prompt: 'What is your HDL cholesterol level(based on a blood test)?Leave it blank if you don't remember.', input: [{ type: 'number', units: 'mm / l', min: 1, max: 7, allow_decimals: true }], system_of_measurement: 'mm / l', counterpart: 'hdl_cholesterol',
        }, {
  id: 'cholesterol_level_estimated', label: 'Estimate Cholesterol Level', prompt: 'A physician told me that my total cholesterol was: ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'low', label: 'Low' }, { id: 'normal', label: 'Normal' }, { id: 'high', label: 'High' }, { id: 'not_known', label: 'I don't know'},] }] }, { id: 'hdl_cholesterol_estimated', label: 'Estimate HDL Cholesterol', prompt: 'A physician told me that my HDL(good) cholesterol was: ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'low', label: 'Low' }, { id: 'normal', label: 'Normal' }, { id: 'high', label: 'High' }, { id: 'not_known', label: 'I don't know'},] }]
        }, {
  id: 'blood_glucose', label: 'Blood sugar', prompt: 'What is the result of your most recent blood sugar test(non- fasting blood glucose)?', input: [{ type: 'number', units: 'mg / dl', min: 40, max: 350, }], system_of_measurement: 'mg / dl', counterpart: 'blood_glucose_mml'
  }, { id: 'blood_glucose_mml', label: 'Blood sugar', prompt: 'What is the result of your most recent blood sugar test(non - fasting blood glucose) ? ', input: [{ type: 'number', units: 'mm / l', min: 2, max: 20, allow_decimals: true }], system_of_measurement: 'mm / l', counterpart: 'blood_glucose', }, {
id: 'triglycerides', label: 'Triglycerides', prompt: 'What is your most recent triglycerides level ? ', input: [{ type: 'number', units: 'mg / dl', min: 40, max: 500, }]
        }, {
  id: 'diabetes', label: 'Diabetes', prompt: 'Please answer the following questions.',
  q: [{ id: 'hb1ac_check', label: 'Diabetes control(HbA1C)', prompt: 'Have you had a hemoglobin A1C test this year ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer', hide: ['hb1ac_level'] }, { id: 'yes', label: 'Yes', show: ['hb1ac_level'] }, { id: 'no', label: 'No', hide: ['hb1ac_level'] },] }] }, { id: 'hb1ac_level', label: 'Hemoglobin A1C Level', prompt: 'What is the result of your most hemoglobin A1C test ? ', input: [{ type: 'number', allow_decimals: true, units: ' % ', min: 3, max: 14, },] },]
        }, {
  id: 'smoking', label: 'Smoking', prompt: 'Please answer the following questions', q: [{
id: 'smoking', label: 'Smoking', prompt: 'How would you describe your smoking habits?', input: [{
    type: 'radio', values: [{ id: 'never_smoked', label: 'Never Smoked', hide: ['used_to_smoke', 'years_since_quitting', 'still_smoke', 'daily_cigars', 'daily_pipes', 'readiness_to_quit_smoking'] },
        //feedback: Not smoking is the single best thing you can do for your health.
    { id: 'used_to_smoke', label: 'Used to Smoke', hide: ['still_smoke', 'daily_cigars', 'daily_pipes', 'readiness_to_quit_smoking'], show: ['used_to_smoke', 'years_since_quitting'] }, { id: 'still_smoke', label: 'Still Smoke', hide: ['used_to_smoke', 'years_since_quitting'], show: ['still_smoke', 'daily_cigars', 'daily_pipes', 'readiness_to_quit_smoking'] }]
}]
  }, {
    id: 'used_to_smoke', label: 'Used to Smoke', prompt: 'What was the average number per day that you smoked in the 2 years before you quit ? ', input: [{ type: 'number', units: 'cigarettes / day', min: 0, max: 80, }, { type: 'number', units: 'cigars / day', min: 0, max: 10, }, { type: 'number', units: 'pipes / day', min: 0, max: 10, },]
}, { id: 'years_since_quitting', label: 'Years since quitting', prompt: 'How many years has it been since you quit smoking ? ', input: [{ type: 'number', units: 'years', min: 0, max: 80, }, { type: 'number', units: 'months', min: 0, max: 11, }], required: true, default_deactive: true }, { id: 'still_smoke', label: 'Still Smoke', prompt: 'How many cigarettes a day do you smoke?', input: [{ type: 'number', units: 'cigarettes / day', min: 0, max: 80, }] }, { id: 'daily_cigars', label: 'Daily cigars', prompt: 'How many cigars do you usually smoke per day?', input: [{ type: 'number', units: 'cigars / day', min: 0, max: 10, }] }, { id: 'daily_pipes', label: 'Daily pipes', prompt: 'How many pipes of tobacco do you usually smoke per day?', input: [{ type: 'number', units: 'pipes / day', min: 0, max: 10, }] }, { id: 'daily_shisha', label: 'Daily Shisha', prompt: 'How many times do you smoke shisha per day?', input: [{ type: 'number', units: 'times / day', min: 0, max: 10, }] }, { id: 'daily_marajuana', label: 'Daily Shisha', prompt: 'How many times do you smoke shisha per day?', input: [{ type: 'number', units: 'times / day', min: 0, max: 10, }] }, { id: 'smokeless_tobacco', label: 'Smokeless tobacco', prompt: 'How many times per day do you use smokeless tobacco?(Chewing tobacco, snuff, pouches, etc.) ', input: [{ type: 'number', units: 'times / day', min: 0, max: 10 }] }, { id: 'vaping', label: 'Vaping', prompt: 'Have you ever used an electronic vapor product?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes', show: ['vaping_freq'] }, { id: 'no', label: 'No', hide: ['vaping_freq'] },] }] }, { id: 'vaping_freq', label: 'Vaping Frequency', prompt: 'During the past 30 days, on how many days did you use an electronic vapor product?', input: [{ type: 'radio', values: [{ id: '0 days', label: '0 days' }, { id: '1 - 2 days', label: '1 - 2 days' }, { id: '3 - 5 days', label: '3 - 5 days' }, { id: '6 - 9 days', label: '6 - 9 days' }, { id: '10 - 19 days', label: '10 - 19 days' }, { id: '20 - 29 days', label: '20 - 29 days' }, { id: 'all 30 days', label: 'All 30 Days' },] }] },]
}, {
id: 'driving', label: 'Driving', prompt: 'Please answer the following questions', q: [{ id: 'travel_by_automobile', label: 'Travel Miles by Automobile', prompt: 'In the next 12 months, how many thousands of miles will you probably travel by car, SUV, truck or van?(Average is 12, 000 - 15, 000 miles) ', input: [{ type: 'number', units: ', 000 miles', min: 0, max: 300, }], system_of_measurement: 'us_customary', counterpart: 'travel_by_automobile_km' }, { id: 'travel_by_automobile_km', label: 'Travel Kilometers by Automobile', prompt: 'In the next 12 months, how many thousands of kilometers will you probably travel by car, SUV, truck or van?(Average is 20, 000 - 24, 000 kilometers) ', input: [{ type: 'number', units: ', 000 kilometers', min: 0, max: 500, }], system_of_measurement: 'metric', counterpart: 'travel_by_automobile' }, { id: 'travel_by_motorcycle', label: 'Travel Miles by Motorcycle', prompt: 'In the next 12 months, how many thousands of miles will you probably travel by motorcycle?', input: [{ type: 'number', units: ', 000 miles', min: 0, max: 20, }], system_of_measurement: 'us_customary', counterpart: 'travel_by_motorcycle_km' }, { id: 'travel_by_motorcycle_km', label: 'Travel Kilometers by Motorcycle', prompt: 'In the next 12 months, how many thousands of kilometers will you probably travel by motorcycle?', input: [{ type: 'number', units: ', 000 kilometers', min: 0, max: 30, }], system_of_measurement: 'metric', counterpart: 'travel_by_motorcycle' }, { id: 'typical_travel_method', label: 'Travel Method', prompt: 'On a typical day, how do you usually travel?', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'walk', label: 'Walk' }, { id: 'bicycle', label: 'Bicycle' }, { id: 'motorcycle', label: 'Motorcycle' }, { id: 'sub - compact or compact car', label: 'Sub - compact or compact car' }, { id: 'mid - size or full- size car', label: 'Mid - size or full - size car' }, { id: 'truck or van', label: 'Truck, van, or SUV' }, { id: 'semi', label: 'Semi or other commercial truck' }, { id: 'bus, subway, or train', label: 'Bus, subway, or train' }, { id: 'mostly stay at home', label: 'Mostly stay at home' },], }] }, { id: 'safety_belt_usage', label: 'Safety Belt Usage', prompt: 'What percent of the time do you usually buckle your safety belt when driving or riding ? ', input: [{ type: 'number', units: ' % ', min: 0, max: 100, }] },
    //feedback: if belt==100, Fantastic! Seat belts save lives!
{ id: 'distracted_driving', label: 'Distracted Driving', prompt: 'Do you frequently text, e - mail or use a cell phone while driving a car or other vehicle ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'driving_speed', label: 'Driving Speed', prompt: 'On average, how close to the speed limit do you usually drive ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'do not drive', label: 'Don't drive' }, { id: 'within 5 mph of limit', unitlabel: { 'us_customary': 'Within 5 mph of limit', 'metric': 'Within 10 kph of limit' } }, { id: '6 - 10 mph over limit', unitlabel: { 'us_customary': '6 - 10 mph over limit', 'metric': '11 - 15 kph of limit' } }, { id: '11 - 15 mph over limit', unitlabel: { 'us_customary': '11 - 15 mph over limit', 'metric': '15 - 25 kph over limit' } }, { id: 'more than 15 mph over limit', unitlabel: { 'us_customary': 'More than 15 mph over limit', 'metric': 'More than 25 kph over limit' } }        ],    }]  }, { id: 'drinking_and_driving', label: 'Drinking and Driving', prompt: 'How many times in the last month did you drive or ride when the driver had perhaps too much alcohol to drink?', input: [{ type: 'number', units: 'times last month', min: 0, max: 50, }] }, { id: 'weekly_alcohol', label: 'Weekly Alcohol Drinking', prompt: 'How many drinks of an alcoholic beverage do you have in a typical week?(Write the number of each type of drink)', input: [{ type: 'number', units: 'beer', min: 0, max: 99, showhide: [{ sum: ['weekly_alcohol.a.wine', 'weekly_alcohol.a.wine_coolers', 'weekly_alcohol.a.mixed_drinks'], low: 5, show: ['binge_drinking'] }, { sum: ['weekly_alcohol.a.wine', 'weekly_alcohol.a.wine_coolers', 'weekly_alcohol.a.mixed_drinks'], high: 5, hide: ['binge_drinking'] }, { sum: ['weekly_alcohol.a.wine', 'weekly_alcohol.a.wine_coolers', 'weekly_alcohol.a.mixed_drinks'], low: 14, show: ['readiness_to_reduce_alcohol_usage'] }, { sum: ['weekly_alcohol.a.wine', 'weekly_alcohol.a.wine_coolers', 'weekly_alcohol.a.mixed_drinks'], high: 14, hide: ['readiness_to_reduce_alcohol_usage'] }] }, { type: 'number', units: 'wine', min: 0, max: 99, }, { type: 'number', units: 'wine coolers', min: 0, max: 99, }, { type: 'number', units: 'mixed drinks', min: 0, max: 99, }] },  //feedback: if drunkTrip == 0 && total < 4 Remember: Alcohol in moderation is best.  {id: 'binge_drinking',label: 'Binge Drinking',prompt: 'In the last month have you had 5 or more drinks in a row?',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'arrested_dui',label: 'DUI',prompt: 'Have you ever been arrested for driving under the influence or driving while intoxicated ? ',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'road_rage',label: 'Road Rage',prompt: 'Have you ever had a driving- related altercation(road - rage) in which you have exited your vehicle ? ',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'commercial_driver',label: 'Commercial Driver',prompt: 'Are you currently a commercial or professional driver ? ',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes', show:['type_of_license','years_as_driver']},  {id: 'no', label: 'No', hide:['type_of_license','years_as_driver']}        ]    }]  },  {id: 'gross_weight',label: 'Gross weight of 26, 000',prompt: 'Do you operate a vehicle with a gross vehicle weight rating of 26, 000 pounds or more? ',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'type_of_license',label: 'Type of Commercial License',prompt: 'What type of commercial driver’s license do you have?',input: [    {        type: 'select',        values: [  {id: 'a', label: 'Class A'},  {id: 'b', label: ' Class B'},  {id: 'c', label: ' Class C'},  {id: 'other', label: 'Other'},  {id: 'do not have', label: 'Do not have a commercial driver's license'},] }]
  }, { id: 'years_as_driver', label: 'Years of Commercial Driver', prompt: 'How many years have you been working as a commercial or professional driver?', input: [{ type: 'number', units: 'years', min: 0, max: 80, }] },]
    },

        {
  id: 'gender_specific', label: 'Gender Specific', prompt: 'Please Answer the Following Questions', q: [{ id: 'age_at_menarche', label: 'First Menstrual Period Age', prompt: 'At what age did you have your first menstrual period?', input: [{ type: 'number', units: 'years old', min: 5, max: 20, maxvariable: 'hra.q.age_in_years.a.years', }] }, { id: 'age_of_bearing_first_child', label: 'Age of Bearing First Child', prompt: 'How old were you when your first child was born? (If no children, write 0)', input: [{ type: 'number', units: 'years old', min: 0, max: 50, maxvariable: 'hra.q.age_in_years.a.years', }] }, { id: 'last_mammogram', label: 'Last Mammogram', prompt: 'How long has it been since your last breast x-ray (mammogram)?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] },
  //feedback: if <1 or 1 year, Getting regular checkups can help promote breast health.
  { id: 'family_breast_cancer_history', label: 'Family Breast Cancer History', prompt: 'How many women in your natural family (mother and sisters only) have had breast cancer?', input: [{ type: 'number', units: 'women', min: 0, max: 10, }] }, { id: 'hysterectomy', label: 'Hysterectomy', prompt: 'Have you had a hysterectomy operation?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }, { id: 'not sure', label: 'Not sure' },] }] }, { id: 'pap_smear_test', label: 'Pap Smear Test', prompt: 'How long has it been since you had a pap test and/or pelvic exam?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] }, { id: 'colon_cancer_screening', label: 'Colon Cancer Screening', prompt: 'About how long has it been since you had a colorectal cancer screening?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] }, { id: 'prostate_cancer_screening', label: 'Prostate Cancer Screening', prompt: 'Have you talked to your doctor about being screened for prostate cancer?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'relatives_cancer', label: 'Relatives with cancer', prompt: 'Has one or more of your first degree relatives ever had any form of cancer?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'unprotected_sex', label: 'Unprotected Sex', prompt: 'Have you engaged in unprotected sex with one or more partners of ‘unknown’ or ‘questionable’ STD status?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'street_drugs', label: 'Street Drugs', prompt: 'Have you ever experimented or used recreational (or ‘street’) drugs beyond marijuana?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }]
    }, { id: 'prevention', label: 'Prevention', prompt: 'Please Answer the Following Questions', q: [{ id: 'annual_checkup', label: 'Annual Checkup', prompt: 'Do you have annual check-ups?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'annual_flu_shot', label: 'Annual Flu Shot', prompt: 'Do you get an annual flu shot?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'teeth_cleaned', label: 'Teeth Cleaned', prompt: 'Do you have your teeth cleaned at least twice per year?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'eye_examed', label: 'Eye Exam', prompt: 'Have you had your eyes examined within the last three years?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'hiv_test', label: 'HIV Test', prompt: 'Have you been tested for HIV?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'declined_vaccine', label: 'Declined Vaccine', prompt: 'Have you ever declined a vaccine (or have your parents declined one on your behalf)?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'hpv_vaccine', label: 'HPV Vaccine', prompt: 'Have you received the HPV vaccine?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'severe_sunburn', label: 'Severe Sunburn', prompt: 'Have you had more than one severe sunburn (skin peals) or used a tanning bed within the last year?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }] }, {
        id: 'chronic', label: 'Chronic Conditions', prompt: 'Do you have any of the following conditions?', q: [{ id: 'asthma', label: 'Asthma', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'bipolar', label: 'Bipolar mood disease', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'brochiectasis', label: 'Brochiectasis', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'cardiac_failure', label: 'Cardiac failure', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'cardiomyopathy', label: 'Cardiomyopathy', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'copd', label: 'Chronic obstructive pulmonary disease', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'chronic_kidney', label: 'Chronic kidney disease', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'coronary_artery', label: 'Coronary artery disease', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] },
        { id: 'crohns_disease', label: 'Crohn's disease',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'diabetes_insipidus',label: 'Diabetes insipidus',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'diabetes_mellitus',label: 'Diabetes mellitus(type 1 and type 2)',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'dysrhythmia',label: 'Dysrhythmia(irregular heartbeat)',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'epilepsy',label: 'Epilepsy',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'glaucoma',label: 'Glaucoma',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'haemophilia',label: 'Haemophilia',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'hiv',label: 'HIV',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'hyperlipidaemia',label: 'Hyperlipidaemia(high cholesterol)',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'hypertension',label: 'Hypertension(high blood pressure)',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'hypothyroidism',label: 'Hypothyroidism(inactive thyroid gland)',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'multiple_sclerosis',label: 'Multiple sclerosis',prompt: '',input: [    {        type: 'radio',        values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}        ]    }]  },  {id: 'parkinsons',label: 'Parkinson's disease', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'rheumatoid_arthritis', label: 'Rheumatoid arthritis', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'schizophrenia', label: 'Schizophrenia', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'systemic_lupus_erythematosis', label: 'Systemic lupus erythematosis', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'ulcerative_colitis', label: 'Ulcerative colitis', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] },]
    }, {
        id: 'nutrition', label: 'Food and Nutrition', prompt: '', q: [{ id: 'fruits_and_vegetables', label: 'Healthy Food', prompt: 'Do you eat at least 5 servings of fruits and/or vegetables per day?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes', hide: 'readiness_to_eat_healthier' }, { id: 'no', label: 'No', show: 'readiness_to_eat_healthier' }] }] }, { id: 'high_cholesterol_food', label: 'High Cholesterol Food', prompt: 'Do you eat foods every day that are high in cholesterol or fat, such as fatty meat, cheese, or fried food?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'fast_food', label: 'Fast Food', prompt: 'How many times a week did you eat fast food meals or snacks?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Less than 1 time' }, { id: '1', label: '1-3 times' }, { id: '2', label: '4 or more' },], showhide: [{ sum: ['fruit.a', 'vegetables.a', 'soft_drinks.a', 'protein.a', 'junk_food.a', 'desserts.a', 'butter.a'], low: 5, show: ['readiness_to_eat_healthier'] }, { sum: ['fruit.a', 'vegetables.a', 'soft_drinks.a', 'protein.a', 'junk_food.a', 'desserts.a', 'butter.a'], high: 5, hide: ['readiness_to_eat_healthier'] }] }] }, { id: 'fruit', label: 'Fruit', prompt: 'How many servings of fruit did you eat each day?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: '5 or more' }, { id: '1', label: '3-4 times' }, { id: '2', label: '2 or less' },] }] }, { id: 'vegetables', label: 'Vegetables', prompt: 'How many servings of vegetables did you eat each day?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: '5 or more' }, { id: '1', label: '3-4 times' }, { id: '2', label: '2 or less' },] }] }, { id: 'soft_drinks', label: 'Soft Drinks', prompt: 'How many regular sodas, energy drinks or glasses of sweet tea did you drink each day?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Less than 1' }, { id: '1', label: '1-2 times' }, { id: '2', label: '3 or more' },] }] }, { id: 'protein', label: 'High Protein Foods', prompt: 'How many times a week did you eat beans (like pinto or black beans), chicken or fish?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: '3 or more times' }, { id: '1', label: '1-2 times' }, { id: '2', label: 'Less than 1 time' },] }] }, { id: 'junk_food', label: 'Junk Food', prompt: 'How many times a week did you eat chips, cookies, crackers or other unhealthy snacks (high salt or high fat)?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: '1 time or less' }, { id: '1', label: '2-3 times' }, { id: '2', label: '4 or more' },] }] }, { id: 'desserts', label: 'Desserts', prompt: 'How many times a week did you eat desserts and other sweets that are unhealthy (high sugar, high fat)?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: '1 time or less' }, { id: '1', label: '2-3 times' }, { id: '2', label: '4 or more' },] }] }, { id: 'butter', label: 'Butter', prompt: 'How much butter or margarine (or meat fat) do you use to season or put on vegetables, potatoes, or bread?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Very Little' }, { id: '1', label: 'Some' }, { id: '2', label: 'A lot' },] }] }, { id: 'sugar_beverage', label: 'Sugar-Sweetened Beverage', prompt: 'Do you drink more than two sugar-sweetened beverages per week?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'caffeine', label: 'Caffeine', prompt: 'Do you consume more than two doses of caffeine per day (in soft drinks, coffee, chocolate or other products)?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'fish', label: 'Fish Meals', prompt: 'Do you eat more than two fish meals per week?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'charcoal_broiled', label: 'Charcoal Broiled Burgers', prompt: 'Do you eat more than one charcoal broiled meal per week (on average) including Burger King or Dairy Queen Burgers?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'cross_contamination', label: 'Cross Contamination', prompt: 'Are you meticulous in preventing cross-contamination in the kitchen/barbeque grill (e.g. chicken juice)?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }]
    }, {
        id: 'sugar', label: 'Sugar consumed daily', prompt: '', q: [{ id: 'sweeteners', label: '', prompt: 'I add sugar, jams, honey, syrup or other sweeteners to food or drinks.', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'sweetened_foods', label: '', prompt: 'I eat one of more servings of sweetened desserts, candy, granola bars or cereals.', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'meals_per_day', label: '', prompt: 'How many meals per day do you eat?', input: [{ type: 'radio', values: [{ id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3 or more', label: '3 or more' }] }] }, { id: 'snacks_per_day', label: '', prompt: 'How many times do you snack per day?', input: [{ type: 'radio', values: [{ id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3 or more', label: '3 or more' }] }] },]
    }, {
        id: 'sleep', label: 'Sleep', prompt: '', q: [{ id: 'sleep1', label: '', prompt: 'In the past 7 days my sleep quality was', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '5', label: 'Very poor' }, { id: '4', label: 'Poor' }, { id: '3', label: 'Fair' }, { id: '2', label: 'Good' }, { id: '1', label: 'Very good' }], }] }, { id: 'sleep2', label: '', prompt: 'In the past 7 days my sleep was refreshing', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '5', label: 'Not at all' }, { id: '4', label: 'A little bit' }, { id: '3', label: 'Somewhat' }, { id: '2', label: 'Quite a bit' }, { id: '1', label: 'Very Much' }], }] }, { id: 'sleep3', label: '', prompt: 'I had a problem with my sleep', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Not at all' }, { id: '2', label: 'A little bit' }, { id: '3', label: 'Somewhat' }, { id: '4', label: 'Quite a bit' }, { id: '5', label: 'Very Much' }], }] }, { id: 'sleep4', label: '', prompt: 'I had difficulty falling asleep', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Not at all' }, { id: '2', label: 'A little bit' }, { id: '3', label: 'Somewhat' }, { id: '4', label: 'Quite a bit' }, { id: '5', label: 'Very Much' }], }] },]
    }, { id: 'somatic', label: 'Somatic Symptoms', prompt: '', q: [{ id: 'somatic1', label: '', prompt: 'During the past 7 days, how much have you been bothered by stomach or bowel problems?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'A little bit' }, { id: '2', label: 'Somewhat' }, { id: '3', label: 'Quite a bit' }, { id: '4', label: 'Very much' }], }] }, { id: 'somatic2', label: '', prompt: 'During the past 7 days, how much have you been bothered by back pain?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'A little bit' }, { id: '2', label: 'Somewhat' }, { id: '3', label: 'Quite a bit' }, { id: '4', label: 'Very much' }], }] }, { id: 'somatic3', label: '', prompt: 'During the past 7 days, how much have you been bothered by pain in your arms, legs or joints?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'A little bit' }, { id: '2', label: 'Somewhat' }, { id: '3', label: 'Quite a bit' }, { id: '4', label: 'Very much' }], }] }, { id: 'somatic4', label: '', prompt: 'During the past 7 days, how much have you been bothered by headaches?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'A little bit' }, { id: '2', label: 'Somewhat' }, { id: '3', label: 'Quite a bit' }, { id: '4', label: 'Very much' }], }] },] }, { id: 'medications', label: 'Medications', prompt: '', q: [{ id: 'arthritis_medication', label: '', prompt: 'During the past month have you taken any medication for arthritis?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], showhide: [{ sum: ['asthma_medication.a', 'cholesterol_medication.a', 'diabetes_medication.a', 'stomach_problems_medication.a', 'other_medications.a', 'blood_pressure_medication.a'], low: 1, show: ['medadhere'] }, { sum: ['asthma_medication.a', 'cholesterol_medication.a', 'diabetes_medication.a', 'stomach_problems_medication.a', 'other_medications.a', 'blood_pressure_medication.a'], high: 1, hide: ['medadhere'] }] }] }, { id: 'asthma_medication', label: '', prompt: 'During the past month have you taken any medication for asthma?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], }] }, { id: 'cholesterol_medication', label: '', prompt: 'During the past month have you taken any medication for cholesterol?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], }] }, { id: 'diabetes_medication', label: '', prompt: 'During the past month have you taken medication for diabetes?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], }] }, { id: 'stomach_problems_medication', label: '', prompt: 'During the past month have you taken medication for stomach problems?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], }] }, { id: 'other_medications', label: '', prompt: 'During the past month have you taken any other types of medications?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'yes' }, { id: '0', label: 'no' },], }] }, { id: 'medadhere', label: '', prompt: 'Do you take all of your medications as instructed by your doctor?', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }] }, {
        id: 'health_history', label: 'Health History', prompt: 'Have you been told by a health care provider you have or were:', q: [{ id: 'ahdi_asthma', label: '', prompt: 'Asthma', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },] }] }, { id: 'ahdi_atrial_fibrillation', label: '', prompt: 'Atrial Fibrillation', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_chronic_obstructive_pulmonary_disease', label: '', prompt: 'Chronic Obstructive Pulmonary Disease', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_chronic_venous_thrombotic_disease', label: '', prompt: 'Chronic Venous Thrombotic Disease', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_copd', label: '', prompt: 'COPD with Pulmonary Hypertension/Cor Pulmonale', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_chronic_kidney_disease', label: '', prompt: 'Chronic Kidney Disease', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_congestive_heart_failure', label: '', prompt: 'Congestive Heart Failure', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_coronary_artery_disease', label: '', prompt: 'Coronary Artery Disease', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_depression', label: '', prompt: 'Depression', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_epilepsy', label: '', prompt: 'Epilepsy', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_hiv', label: '', prompt: 'Human Immunodeficiency Virus Infection', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_hyperlipidemia', label: '', prompt: 'Hyperlipidemia', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_hypertension', label: '', prompt: 'Hypertension', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_hyperthyroidism', label: '', prompt: 'Hyperthyroidism', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_hypothyroidism', label: '', prompt: 'Hypothyroidism', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_metabolic_syndrome', label: '', prompt: 'Metabolic Syndrome', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] }, { id: 'ahdi_multiple_sclerosis', label: '', prompt: 'Multiple Sclerosis', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes', label: 'yes' }, { id: 'no', label: 'no' },], }] },
  { id: 'ahdi_parkinsons_disease', label: '', prompt: 'Parkinson's Disease',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_peripheral_arterial_disease',label: '',prompt: 'Peripheral Arterial Disease(Atherosclerosis)',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_pre_diabetes',label: '',prompt: 'Pre- Diabetes',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_polymyalgia_rheumatica',label: '',prompt: 'Polymyalgia Rheumatica',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_pulmonary_hypertension',label: '',prompt: 'Pulmonary Hypertension(unrelated to COPD)',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_regional_enteritis',label: '',prompt: 'Regional Enteritis(Inflammatory Bowel Disease)',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_rheumatoid_arthritis',label: '',prompt: 'Rheumatoid Arthritis',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_sleep_apnea',label: '',prompt: 'Sleep Apnea',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'ahdi_ulcerative_colitis',label: '',prompt: 'Ulcerative Colitis',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  }]},{id: 'ffh_information',label: 'Further Information',prompt: 'Would you like information on the further fields ? ',q:[  {id: 'nutrition',label: 'Nutrition',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'fitness',label: 'Fitness',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'disparities',label: 'Disparities',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'emergency_planning',label: 'Safety and Emergency Planning',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'anatomy',  label: 'Your bodies anatomy and physiology or its form and function',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'opioid',label: 'Opioid issues',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'first_aid',label: 'Basic First Aid',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'cpr',label: 'How to do CPR',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'aed',label: 'How to use an A.E.D.',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'monitor_blood_pressure',label: 'How to monitor blood pressure',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'monitor_blood_sugar',label: 'How to monitor blood sugar',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },  {id: 'pulmonary_rehab',label: 'Cardio or Pulmonary Rehab',prompt: '',input: [{type: 'radio',values: [  {id: 'yes', label: 'Yes'},  {id: 'no', label: 'No'}]}]  },]},{id: 'cough_and_hand_hygiene',label:  'Cough and Hand Hygiene',prompt: 'Everyone can use a straightforward approach to protect themselves and their families from infectious diseases that are spread through contact with droplets containing pathogens(harmful viruses and bacteria).',q:[  {id: 'chh_hands',label: '',prompt: 'How many times have you washed your hands today?',input: [{type: 'select',values: [  {id: 'not_answered', label: 'choose an answer'},  {id: 'not_at_all', label: 'not at all'},  {id: 'once_or_twice', label: 'once or twice'},  {id: 'many_times', label: 'many times'},],}]  },  {id: 'chh_cough',label: '',prompt: 'Do you have a cough?',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'chh_fever',label: '',prompt: 'Do you have a fever(a fever is a higher than normal body temperature taken with an accurate thermometer)?',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'chh_sbreath',label: '',prompt: 'Are you having new or increased shortness of breath?',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  },  {id: 'chh_interact',label: '',prompt: 'Do work or other activities require you to interact with other people in person ? ',input: [{type: 'select',values: [  {id: 'not answered', label: 'choose an answer'},  {id: 'yes', label: 'yes'},  {id: 'no', label: 'no'},],}]  }]},{  id: 'circuit_30',  label: 'Circuit 30 Questions',  prompt: 'Please answer the following questions.',  q: [{id:'exercise_program',label: '',prompt: 'What exercise program are you doing now?',input: [  {  type: 'select',  values: [{id: 'not_answered', label: 'choose an answer'},{id: 'none', label: 'None'},{id: 'running_spinning', label: 'Running / Spinning'},{id: 'crossfit', label: 'CrossFit'},{id: 'personal', label: 'Personal Training'},{id: 'pilates_yoga_barre', label: 'Pilates / Yoga / Barre'},{id: 'hiit', label: 'HIIT'},{id: 'otf_9round_burnbootcamp', label: 'OTF / 9Round/ Burn Boot Camp'},{id: 'bigboxgym', label: 'Big Box Gym'},{id: 'n / a', label: 'None of the above'},  ]  }],required: true},{id:'accomplishing_goals',label: '',prompt: 'On a scale of 1 - 10(with 10 being the greatest) how serious are you about accomplishing your fitness goals ? ',input: [  {  type: 'select',  values: [{id: 'not_answered', label: 'choose an answer'},{id: '1', label: '1'},{id: '2', label: '2'},{id: '3', label: '3'},{id: '4', label: '4'},{id: '5', label: '5'},{id: '6', label: '6'},{id: '7', label: '7'},{id: '8', label: '8'},{id: '9', label: '9'},{id: '10', label: '10'}  ]  }],required: true},{id:'activity_tracker',label: '',prompt: 'Do you wear a tracker of any type ? ',input: [  {  type: 'select',  values: [{id: 'not_answered', label: 'choose an answer'},{id: 'none', label: 'None'},{id: 'apple_watch', label: 'Apple Watch'},{id: 'fitbit', label: 'FitBit'},{id: 'garmin', label: 'Garmin'},{id: 'other', label: 'Other'},  ]  }],required: true},{id: 'workout_time',label: '',prompt: 'What time of day do you prefer to workout ? ',input: [  {  type: 'radio',  values: [{id: 'morning', label: 'Morning'},{id: 'afternoon', label: 'Afternoon'},{id: 'evening', label: 'Evening'}  ]  }],required: true},{id: 'barbell',label: '',prompt: 'Have you used a barbell before ? ',input: [  {  type: 'radio',  values: [{id: 'yes', label: 'Yes'},{id: 'no', label: 'No'}  ]  }],required: true},{id: 'job_activity',label: '',prompt: 'Describe Your Job',input: [  {  type: 'radio',  values: [{id: 'sedentary', label: 'Sedentary'},{id: 'active', label: 'Active'},{id: 'demanding', label: 'Physically Demanding'}  ]  }],required: true},{id:'glasses_of_water',label: '',prompt: 'How many glasses of water to you drink per day ? ',input: [  {  type: 'select',  values: [{id: 'not_answered', label: 'choose an answer'},{id: '1 - 2', label: '1 - 2'},{id: '2 - 4', label: '2 - 4'},{id: '4 - 6', label: '4 - 6'},{id: '8 - 12', label: '8 - 12'}  ]  }],required: true},{id:'nutriton_level',label: '',prompt: 'On a scale of 1 - 10(with 10 being the greatest) how would you rate your nutrition ? ',
input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' }, { id: '4', label: '4' }, { id: '5', label: '5' }, { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' }, { id: '9', label: '9' }, { id: '10', label: '10' }] }], required: true}, { id: 'times_you_eat', label: '', prompt: 'How many times do you eat throughout the day ? ', input: [{ type: 'radio', values: [{ id: '1', label: 'Once a day' }, { id: '2 - 3', label: '2 - 3 times per day' }, { id: '4', label: '4 + times per day' }] }], required: true }, { id: 'calories', label: '', prompt: 'Do you know how many calories you eat per day ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], required: true }, { id: 'food_intake', label: '', prompt: 'Have you ever tracked your food intake ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], required: true }, { id: 'eat_out', label: '', prompt: 'How often do you eat out ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'almost_never', label: 'Almost Never' }, { id: '1', label: 'Once per week' }, { id: '2 - 3', label: '2 - 3 times per week' }, { id: '4', label: '4 + times per week' }] }], required: true }, { id: 'enjoy_cooking', label: '', prompt: 'Do you enjoy cooking ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], required: true }, { id: 'nutritionist', label: '', prompt: 'Would you be open to seeing our nutritionist if your insurance would cover it ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], required: true }, { id: '8_sleep', label: '', prompt: 'Do you get 8 hours of sleep per night ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], required: true },      ]  }, { id: 'circuit_30_goals', label: 'Goals', prompt: 'Select below your goals', q: [{ id: 'lose_weight', label: '', prompt: 'Lose Weight', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'gain_muscle', label: '', prompt: 'Gain Muscle', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'improve_overall_health', label: '', prompt: 'Improve Overall Health', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'shape_tone', label: '', prompt: 'Shape and Tone', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'improve_performance', label: '', prompt: 'Improve Performance', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], },] }, { id: 'fitnessfair_demo', label: 'Engagement & Follow Up', prompt: 'Please answer the following questions.', q: [{ id: 'corporate_wellfare', label: '', prompt: 'Does your company have a current corporate wellness programme ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes', show: ['sustainable_progarm'] }, { id: 'no', label: 'No', hide: ['sustainable_progarm'] },] }], }, { id: 'sustainable_progarm', label: '', prompt: 'Is it a sustainable programme that gives your company annual reports on the health progress of your staff ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' },] }], }, { id: 'online_programme', label: '', prompt: 'Would you like to have an online programme that can reach and empower your staff through Individualized Health Solutions, Fitness Tracking, Personalized Meal Plans, Community Support, Mental & Behavioural Health Support, Rewards, and Verifiable Progress Reports', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' },] }], required: true },] }, { id: 'resolutions', label: 'Resolutions & Beyond Questions', prompt: 'Please answer the following questions.', q: [{ id: 'onsite_fitness', label: '', prompt: 'If offered, how likely are you to participate in an onsite fitness program offered at your work location ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'unlikely', label: 'Unlikely' }, { id: 'not at all', label: 'Not At All' },] }], }, { id: 'motivated', label: '', prompt: 'Are you motivated by working out in a group or alone ? ', input: [{ type: 'radio', values: [{ id: 'group', label: 'Group' }, { id: 'alone', label: 'Alone' },] }], }, { id: 'work_life_balance', label: '', prompt: 'If offered, how interested would you be in learning new techniques for managing stress and creating work - life balance ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'unlikely', label: 'Unlikely' }, { id: 'not at all', label: 'Not At All' },] }], }, { id: 'treatment_method', label: '', prompt: 'When you seek medical treatment, do you typically seek conventional treatments(medical doctor) or alternative therapies(chiropractic care) ? ', input: [{ type: 'radio', values: [{ id: 'medical', label: 'Conventional Treatments' }, { id: 'chiropractic', label: 'Alternative Therapies' },] }], }, { id: 'weight_loss_program', label: '', prompt: 'On a scale of 1 - 10, how helpful would a weight loss / management structured program and wellness coach be to helping you reach your goals ? 1 = not helpful at all 10 very helpful', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' }, { id: '4', label: '4' }, { id: '5', label: '5' }, { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' }, { id: '9', label: '9' }, { id: '10', label: '10' }] }], }, { id: 'health_coaching', label: '', prompt: 'How likely would you be to participate in one on one health coaching with a certified professional to help you achieve specific health outcomes ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'unlikely', label: 'Unlikely' }, { id: 'not at all', label: 'Not At All' },] }], }, { id: 'wellness_workshop', label: '', prompt: 'If offered, how likely would you be interested in participating in wellness workshops specific to certain concerns such as diabetes, heart health, tobacco cessation, etc.', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'unlikely', label: 'Unlikely' }, { id: 'not at all', label: 'Not At All' },] }], }, { id: 'take_control_of_health', label: '', prompt: 'If offered, how likely would you be willing to participate in programs offered at work to help you take control of your health(such as exercise, stress management, nutrition, etc).', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'not at all', label: 'Not At All' }, { id: 'onsite', label: 'Interested only if offered onsite' }, { id: 'virtually', label: 'Interested only if offered virtually' },] }], }, { id: 'share_cost', label: '', prompt: 'If programs above were offered by your employer, how likely would you be willing to share in the cost of these programs ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: 'very', label: 'Very' }, { id: 'somewhat', label: 'Somewhat' }, { id: 'not at all', label: 'Not At All' }, { id: 'not completed', label: 'Would be willing to share only if I sign up but do not complete participation ' }, { id: 'no interest', label: 'Not interested in programs' },] }], }, { id: 'lead_by_example', label: '', prompt: 'On a scale from 1 - 5(5 being most important), how important is it for you to lead by example and pass on good healthy habits to your family and friends.', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'choose an answer' }, { id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' }, { id: '4', label: '4' }, { id: '5', label: '5' }] }], },] }, { id: 'resolutions_impact', label: '', prompt: 'During the past 6 months, has your health had an impact on your performance at(select at that apply): ', q: [{ id: 'impact_home', label: '', prompt: 'Home', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'impact_office', label: '', prompt: 'Office', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], }, { id: 'imapct_social', label: '', prompt: 'Social Event with friends / family', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }], },] }, { id: 'mental_health', label: 'Mental Health', prompt: 'Over the last 2 weeks, how often have you been bothered by any of the following problems ? ', q: [{ id: 'PHQa', label: '', prompt: 'Little interest or pleasure in doing things.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], showhide: [{ sum: ['PHQb.a'], low: 3, show: ['PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi'] }, { sum: ['PHQb.a'], high: 3, hide: ['PHQc', 'PHQd', 'PHQe', 'PHQf', 'PHQg', 'PHQh', 'PHQi'] }] }] }, { id: 'PHQb', label: '', prompt: 'Feeling down, depressed, or hopeless.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQc', label: '', prompt: 'Trouble falling or staying asleep, or sleeping too much.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQd', label: '', prompt: 'Feeling tired or having little energy.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQe', label: '', prompt: 'Poor appetite or overeating.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQf', label: '', prompt: 'Feeling bad about yourself or that you are a failure or have let yourself or your family down.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQg', label: '', prompt: 'Trouble concentrating on things, such as reading the newspaper or watching television.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQh', label: '', prompt: 'Moving or speaking so slowly that other people could have noticed.Or the opposite, being so fidgety or restless that you have been moving around a lot more than usual.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'PHQi', label: '', prompt: 'Thoughts that you would be better off dead, or of hurting yourself.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADa', label: '', prompt: 'Feeling nervous, anxious or on edge.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], showhide: [{ sum: ['GADb.a'], low: 3, show: ['GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }, { sum: ['GADb.a'], high: 3, hide: ['GADc', 'GADd', 'GADe', 'GADf', 'GADg'] }] },] }, { id: 'GADb', label: '', prompt: 'Not being able to stop or control worrying.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADc', label: '', prompt: 'Worrying too much about different things.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADd', label: '', prompt: 'Trouble relaxing.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADe', label: '', prompt: 'Being so restless that it is hard to sit still.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADf', label: '', prompt: 'Becoming easily annoyed or irritable.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] }, { id: 'GADg', label: '', prompt: 'Feeling afraid as if something awful might happen.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Not at all' }, { id: '1', label: 'Several days' }, { id: '2', label: 'More than half the days' }, { id: '3', label: 'Nearly every day' },], }] },] }, { id: 'stress', label: 'Stress', prompt: 'Please answer the following questions', q: [{ id: 'unable_to_control', label: '', prompt: 'In the last month, how often have you felt that you were unable to control the important things in your life ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Never' }, { id: '1', label: 'Almost Never' }, { id: '2', label: 'Sometimes' }, { id: '3', label: 'Fairly Often' }, { id: '4', label: 'Very Often' },], }] }, { id: 'felt_confident', label: '', prompt: 'In the last month, how often have you felt confident about your ability to handle your personal problems ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '4', label: 'Never' }, { id: '3', label: 'Almost Never' }, { id: '2', label: 'Sometimes' }, { id: '1', label: 'Fairly Often' }, { id: '0', label: 'Very Often' },], }] }, { id: 'going_your_way', label: '', prompt: 'In the last month, how often have you felt that things were going your way ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '4', label: 'Never' }, { id: '3', label: 'Almost Never' }, { id: '2', label: 'Sometimes' }, { id: '1', label: 'Fairly Often' }, { id: '0', label: 'Very Often' },], }] }, { id: 'difficulties_piling_up', label: '', prompt: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Never' }, { id: '1', label: 'Almost Never' }, { id: '2', label: 'Sometimes' }, { id: '3', label: 'Fairly Often' }, { id: '4', label: 'Very Often' },], }] },] }, {
    id: 'physical', label: 'Activity and Environment', prompt: 'Please answer the following questions', q: [{ id: 'home_safety', label: 'Home Safety', prompt: 'Do you feel safe in your home ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'overall_health', label: 'Overall Health', prompt: 'How would you describe your overall physical health ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'excellent', label: 'Excellent' }, { id: 'very good', label: 'Very good' }, { id: 'good', label: 'Good' }, { id: 'fair', label: 'Fair' }, { id: 'poor', label: 'Poor' }], }] }, {
        id: 'weekly_physical_activity', label: 'Weekly Physical Activity', prompt: 'How many times do you engage in physical activity(exercise or work which lasts at least 20 minutes without stopping and makes you breathe heavier and your heart beat faster) ? ',
        input: [{
  type: 'select', values: [{ id: 'not answered', label: 'choose an answer', show: ['readiness_to_exercise_more'] }, { id: 'less than 1 time per week', label: 'Less than 1 time per week', show: ['readiness_to_exercise_more'] }, { id: '1 or 2 times per week', label: '1 or 2 times per week', show: ['readiness_to_exercise_more'] }, { id: 'at least 3 times per week', label: 'At least 3 times per week', hide: ['readiness_to_exercise_more'] },
//feedback: Your activity level promotes lifelong health.
  ],
        }]
    }, { id: 'helmet_usage', label: 'Helmet Usage', prompt: 'If you ride a motorcycle or all - terrain vehicle(ATV), what percent of the time do you wear a helmet ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '75 % to 100 % ', label: '75 % to 100 % ' }, { id: '25 % to 74 % ', label: '25 % to 74 % ' }, { id: 'less than 25 % ', label: 'less than 25 % ' }, { id: 'does not apply to me', label: 'does not apply to me' },], }] }, { id: 'bicycle_helmet_usage', label: 'Bicycle Helmet Usage', prompt: 'If you ride a Bicycle, what percent of the time do you wear a helmet ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '75 % to 100 % ', label: '75 % to 100 % ' }, { id: '25 % to 74 % ', label: '25 % to 74 % ' }, { id: 'less than 25 % ', label: 'less than 25 % ' }, { id: 'does not apply to me', label: 'does not apply to me' },], }] }, { id: 'resting_heart_rate', label: 'Resting Heart Rate', prompt: 'What is your resting heart rate in beats per minute ? (If you don\'t know it, you can measure it now! Using two fingers, locate your pulse on your neck or your wrist.Count the beats until one minute is up on a watch or clock.) ', input: [{ type: 'number', units: 'bpm', min: 40, max: 100, },]  }, { id: 'rollerblades', label: 'Rollerblades, Scooters, or Skateboards', prompt: 'Do you frequently use rollerblades, motor scooters or skateboards to get around?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'headphones_in_traffic', label: 'Headphones in Traffic', prompt: 'Do you walk in heavy traffic areas while using headphones or earbuds?', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'thrill_seeker', label: 'Thrill Seeker', prompt: 'Are you a thrill seeker?(Hang- gliding, sky - diving, bungee jumping, motocross etc.) ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }        ]    }, { id: 'tactical', label: 'Tatical Questions', prompt: 'Please answer the following questions', q: [{ id: 'prescription_medications', label: 'Prescription Medications', prompt: 'How many prescription medications do you take on a daily basis ? ', input: [{ type: 'number', units: 'prescriptions', min: 0, max: 100, },] }, { id: 'overnight_hospital', label: 'Overnight Hospital Visit', prompt: 'Have you spent time in a hospital overngiht in the last 12 months ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] },] }, { id: 'er_visits', label: 'ER Visits', prompt: 'How mant times hvae you been to the ER in the last 12 months ? ', input: [{ type: 'number', units: 'visits', min: 0, max: 100, },] },] }, { id: 'other', label: 'Other', prompt: 'Please answer the following questions.', q: [{ id: 'readiness_to_quit_smoking', label: 'Readiness to Quit Smoking', prompt: 'Describe your readiness to quit smoking.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'No present interest in quitting smoking' }, { id: '2', label: 'Plan to quit smoking in the next 6 months' }, { id: '3', label: 'Plan to quit smoking this month' }, { id: '4', label: 'Recently began quitting smoking' },], }] }, { id: 'readiness_to_reduce_alcohol_usage', label: 'Readiness to Reduce Alcohol Usage', prompt: 'Describe your readiness to reduce your use of alcohol.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'No present interest in reducing alcohol' }, { id: '2', label: 'Plan to reduce alcohol use in the next 6 months' }, { id: '3', label: 'Plan to reduce alcohol use this month' }, { id: '4', label: 'Recently began reducing alcohol use' },], }] }, { id: 'readiness_to_eat_healthier', label: 'Readiness to Eat Healthier', prompt: 'Describe your readiness to eat healthier.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'No present interest in improving nutrition' }, { id: '2', label: 'Plan to improve nutrition in the next 6 months' }, { id: '3', label: 'Plan to improve nutrition this month' }, { id: '4', label: 'Recently began improving nutrition' },], }] }, { id: 'readiness_to_exercise_more', label: 'Readiness to Exercise More', prompt: 'Describe your readiness to exercise more.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'No present interest in exercising more' }, { id: '2', label: 'Plan to start exercising more in the next 6 months' }, { id: '3', label: 'Plan to start exercising more this month' }, { id: '4', label: 'Recently began exercising more' },], }] }, { id: 'misfortune', label: 'Misfortune or Life Impact', prompt: 'Have you suffered a personal loss or misfortune in the past year that had a serious impact on your life ? (For example, a job loss, disability, separation, jail term, or death of someone close to you.) ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes, 1 serious loss or misfortune', label: 'Yes, 1 serious loss or misfortune' }, { id: 'yes, 2 or more', label: 'Yes, 2 or more' }, { id: 'no', label: 'No' },], }] }, { id: 'misfortune_swwc', label: 'Misfortune or Life Impact', prompt: 'Have you suffered a personal loss or misfortune in the past year that had a serious impact on your life ? (For example, a job loss, disability, separation, or death of someone close to you.) ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'yes, 1 serious loss or misfortune', label: 'Yes, 1 serious loss or misfortune' }, { id: 'yes, 2 or more', label: 'Yes, 2 or more' }, { id: 'no', label: 'No' },], }] }, { id: 'race', label: 'Race', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'aleutian, alaska native, eskimo, or american indian', label: 'Aleutian, Alaska native, Eskimo, or American Indian' }, { id: 'asian', label: 'Asian' }, { id: 'black', label: 'Black' }, { id: 'pacific islander', label: 'Pacific Islander' }, { id: 'white', label: 'White' }, { id: 'other', label: 'Other' }, { id: 'don't know', label: 'Don't know'},], }] }, { id: 'hispanic_origin', label: 'Hispanic Origin', prompt: 'Are you of Hispanic origin, such as Mexican - American, Puerto Rican, or Cuban ? ', input: [{ type: 'select', values: [{ id: 'not_answered', label: 'Choose an Answer' }, { id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'filling_forms', label: 'Filling Forms', prompt: 'How confident are you filling out medical or hospital forms by yourself ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Not at all confident' }, { id: '2', label: 'A little bit confident' }, { id: '3', label: 'Somewhat confident' }, { id: '4', label: 'Quite confident' }, { id: '5', label: 'Extremely confident' },], }] }, { id: 'education', label: 'Education', prompt: 'What is the highest grade you completed in school ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'grade school or less', label: 'Grade school or less' }, { id: 'some high school', label: 'Some high school' }, { id: 'high school graduate', label: 'High school graduate' }, { id: 'some college', label: 'Some college' }, { id: 'college graduate', label: 'College graduate' }, { id: 'post graduate or professional degree', label: 'Post graduate or professional degree' },], }] }, { id: 'education_swwc', label: 'Education', prompt: 'What is the highest grade you completed in school ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'high school graduate', label: 'High school graduate' }, { id: 'some college', label: 'Some college' }, { id: 'college graduate', label: 'College graduate' }, { id: 'post graduate or professional degree', label: 'Post graduate or professional degree' },], }] }, { id: 'education_optimal', label: 'Education', prompt: 'What is the highest grade you completed in school ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'JHS / JSS', label: 'JHS / JSS' }, { id: 'SHS / SSS', label: 'SHS / SSS' }, { id: 'College', label: 'College' }, { id: 'Graduate', label: 'Graduate' }, { id: 'Postgraduate', label: 'Postgraduate' },], }] },{
        id: 'firearm', label: 'Access to Firearm', prompt: 'Do you own or have access to a firearm ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }]
    }, { id: 'phone_helplesness', label: 'Phone Helplessness', prompt: 'Do you experience a feeling of helplessness if you can’t interact with your phone(e.g.dead battery or loss of signal) ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'dietary_supplement', label: 'Dietary Supplement', prompt: 'Do you use one or more dietary supplements or nutraceutical products ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'annual_physical', label: 'Annual Physical', prompt: 'How long has it been since you had a checkup or follow - up with a doctor ? ', input: [{ type: 'radio', values: [{ id: 'less_than_6_months', label: 'Less than 6 months' }, { id: '6_months_to_a_year', label: '6 months to a year' }, { id: 'more_than_1_year', label: 'More than 1 year ago' }] }] }, { id: 'drinking_water', label: 'Drinking Water', prompt: 'How many glasses of water do you drink in a day ? ', input: [{ type: 'number', units: 'glasses', min: 0, max: 10, }] }, { id: 'marital_status', label: 'What is your current marital status ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'married', label: 'Married' }, { id: 'separated', label: 'Separated' }, { id: 'divorced', label: 'Divorced' }, { id: 'widowed', label: 'Widowed' }, { id: 'never married', label: 'Never Married' },], }] }]
}, {
    id: 'demographics', label: 'Demographics', prompt: 'For each item below, fill in or select the best answer.', q: [{ id: 'state_of_residence', label: 'What state do you live in? ', prompt: 'Select the two - letter abbreviation.', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'al', label: 'AL' }, { id: 'ak', label: 'AK' }, { id: 'az', label: 'AZ' }, { id: 'ar', label: 'AR' }, { id: 'ca', label: 'CA' }, { id: 'co', label: 'CO' }, { id: 'ct', label: 'CT' }, { id: 'de', label: 'DE' }, { id: 'fl', label: 'FL' }, { id: 'ga', label: 'GA' }, { id: 'hi', label: 'HI' }, { id: 'id', label: 'ID' }, { id: 'il', label: 'IL' }, { id: ' in ', label: 'IN' }, { id: 'ia', label: 'IA' }, { id: 'ks', label: 'KS' }, { id: 'ky', label: 'KY' }, { id: 'la', label: 'LA' }, { id: 'me', label: 'ME' }, { id: 'md', label: 'MD' }, { id: 'ma', label: 'MA' }, { id: 'mi', label: 'MI' }, { id: 'mn', label: 'MN' }, { id: 'ms', label: 'MS' }, { id: 'mo', label: 'MO' }, { id: 'mt', label: 'MT' }, { id: 'ne', label: 'NE' }, { id: 'nv', label: 'NV' }, { id: 'nh', label: 'NH' }, { id: 'nj', label: 'NJ' }, { id: 'nm', label: 'NM' }, { id: 'ny', label: 'NY' }, { id: 'nc', label: 'NC' }, { id: 'nd', label: 'ND' }, { id: 'oh', label: 'OH' }, { id: 'ok', label: 'OK' }, { id: 'or', label: 'OR' }, { id: 'pa', label: 'PA' }, { id: 'ri', label: 'RI' }, { id: 'sc', label: 'SC' }, { id: 'sd', label: 'SD' }, { id: 'tn', label: 'TN' }, { id: 'tx', label: 'TX' }, { id: 'ut', label: 'UT' }, { id: 'vt', label: 'VT' }, { id: 'va', label: 'VA' }, { id: 'wa', label: 'WA' }, { id: 'wv', label: 'WV' }, { id: 'wi', label: 'WI' }, { id: 'wy', label: 'WY' }, { id: ' as ', label: 'AS' }, { id: 'dc', label: 'DC' }, { id: 'fm', label: 'FM' }, { id: 'gu', label: 'GU' }, { id: 'mh', label: 'MH' }, { id: 'mp', label: 'MP' }, { id: 'pw', label: 'PW' }, { id: 'pr', label: 'PR' }, { id: 'vi', label: 'VI' },], }] }, { id: 'marital_status', label: 'What is your current marital status ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'married', label: 'Married' }, { id: 'separated', label: 'Separated' }, { id: 'divorced', label: 'Divorced' }, { id: 'widowed', label: 'Widowed' }, { id: 'never married', label: 'Never Married' },], }] }, { id: 'marital_status_optimal', label: 'What is your current marital status ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'single', label: 'Single' }, { id: 'married', label: 'Married' }, { id: 'divorced / separated', label: 'Divorced / Separated' }, { id: 'widowed', label: 'Widowed' },], }] }, { id: 'household_income', label: 'What is your annual household income ? ', prompt: '(This item is optional.)', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'Less than $10, 000', label: 'Less than $10, 000' }, { id: '$10, 000 - $19, 999', label: '$10, 000 - $19, 999' }, { id: '$20, 000 - $29, 999', label: '$20, 000 - $29, 999' }, { id: '$30, 000 - $39, 999', label: '$30, 000 - $39, 999' }, { id: '$40, 000 - $49, 999', label: '$40, 000 - $49, 999' }, { id: '$50, 000 - $59, 999', label: '$50, 000 - $59, 999' }, { id: '$60, 000 - $69, 999', label: '$60, 000 - $69, 999' }, { id: '$70, 000 - $79, 999', label: '$70, 000 - $79, 999' }, { id: '$80, 000 - $89, 999', label: '$80, 000 - $89, 999' }, { id: '$90, 000 - $99, 999', label: '$90, 000 - $99, 999' }, { id: '$100, 000 - $149, 999', label: '$100, 000 - $149, 999' }, { id: 'More than $150, 000', label: 'More than $150, 000' },], }] },{
            id: 'gainful_employment', label: 'Do you work for pay at a job or business ? ', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }]
    }, {
            id: 'insurance_coverage', label: 'What is your primary health insurance coverage ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'not answered' }, { id: 'no coverage', label: 'no coverage' }, { id: 'medicare only', label: 'Medicare only' }, { id: 'medicare advantage', label: 'Medicare Advantage' }, { id: 'medicaid only', label: 'Medicaid only' }, { id: 'medicaid hmo', label: 'Medicaid HMO' }, { id: 'both medicare and medicaid', label: 'both Medicare and Medicaid' }, { id: 'Veterans, TRICARE', label: 'Veterans, TRICARE' }, { id: 'private insurance', label: 'private insurance' }, { id: 'employer insurance', label: 'employer insurance' }, { id: 'health share', label: 'health share' }, { id: 'other', label: 'other' },], }]
        }, {
            id: 'uconn_coverage', label: 'Insurance Coverage', prompt: 'As you know, all full time UConn students are required by the University to maintain health insurance coverage(beyond that offered via Student Health and Wellness).Which of the following applies to your situation: ', input: [{ type: 'select', values: [{ id: 'self', label: 'I carry my own private health insurance' }, { id: 'parents', label: 'I am under age 26 and am covered on my parents’ health insurance policy' }, { id: 'uconn', label: 'I have purchased insurance through the UConn group policy(Wellfleet - Cigna Health Plan)' }, { id: 'none', label: 'I do not have any health insurance coverage beyond that offered through UConn Student Health and Wellness' },], }]
        }, {
            id: 'health_information_interest', label: 'Would you be interested in free information on how to prepare for difficult health decisions ? ', prompt: '(e.g.living wills)', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }]
        }, {
            id: 'questions', label: 'Questions', prompt: 'Do you have any questions or concerns for your corporate nurse ? ', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }]
        },]
},
{
    id: 'review', label: 'Answer Review', prompt: 'Please review your answers.If you want to change your answers, use the review button to return to a section of the questionnaire.', dynamic: hra.app.render_response_review, options: { top_submit_button: true,        }
},
    {
        id: '65medical_conditions', label: 'Medical Conditions', prompt: 'Have you ever been told by a health care provider that you have...', q: [{ id: 'breast_cancer', label: 'Breast cancer ? ', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'copd', label: 'Emphysema or chromic lung disease(COPD) ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'urine_control', label: 'Loss of urine control ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '0', label: 'No' }] }] }, { id: 'arthritis', label: 'Arthritis ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, {
  id: 'parkinsons_disease', label: 'Parkinson's disease?', prompt: '', input: [{
        type: 'radio', values: [{ id: '1', label: 'Yes' }, {
  id: '2', label: 'No
    ' }] }]
},
  { id: 'depression', label: 'Depresssion ? ', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'hearing_impairment', label: 'Hearing Impariment?', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'vision_impairment', label: 'Vision Impairment?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'blindness', label: 'Blindness ? ', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'deafness', label: 'Deafness ? ', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] },]},
            { id: '65falls', label: 'Falls', prompt: 'For each item below, choose the best answer.', q: [{ id: 'fallen_three_times', label: 'Have you fallen three or more times in the last year?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'injured_fall', label: 'Have you been injured by a fall one or more times in the past year?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'difficulty_walking', label: 'Do you have difficulty walking, such as hobbling, shuffling, or not being able to walk in a straight line?', prompt: '', input: [{ type: 'radio', values: [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }] }] }, { id: 'depth_perception', label: 'Do you have difficulty telling how far things are away from you?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'medication_reactions', label: 'Have you ever had a serious reaction to any medication, nonprescribed or prescribed?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'sedating_drug', label: 'Do you use drugs with a relaxing or sedating effect?', prompt: '(For example, valium or antidepressants.) ', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'different_medications', label: 'In an average week, how many different types of medicines, drugs, and vitamins do you take?', prompt: '(types, NOT number of pills - include both prescription and non - prescription drugs.) ', input: [{ type: 'number', units: 'types per week', min: 0, max: 20, },] }, { id: 'holding_urine', label: 'Do you ever have difficulty holding your urine until you get to a toilet ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '0', label: 'No' }] }] }, { id: 'leak_urine', label: 'Do you ever leak or lose urine when you cough, sneeze or laugh ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '0', label: 'No' }] }] },] },
{
    id: '65immunizations', label: 'Immunizations and Checkups', prompt: 'For each item below, select the best answer.', q: [{ id: 'pneumonia', label: 'Have you had a pneumonia shot since turning age 55 ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'flu_shot', label: 'Within the last 12 months, have you had a flu shot ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'tdap_shot', label: 'About how long has it been since you have had a tetanus - diphtheria - pertussis(Tdap) shot ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Eleven or more years ago' }, { id: '2', label: 'One to ten years' }, { id: '1', label: 'Don\'t know' },], }] }, { id: 'checkup', label: 'About when was the last time you had a check up or wellness visit with your health provider?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: 'one year ago', label: 'One year ago' }, { id: 'two years ago', label: 'Two years ago' }, { id: 'three or more years ago', label: 'Three or more years ago' }, { id: 'never', label: 'Never' },], }] },]
},
{ id: '65activities', label: 'Activities and Function', prompt: 'Because of health or physical problems, do you have any difficulty...', q: [{ id: 'bathing', label: 'Bathing or showering?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'dressing', label: 'Dressing ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'eating', label: 'Eating ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'out_of_bed', label: 'Getting in and out of bed or chairs?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'walking', label: 'Walking ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'getting_outside', label: 'Getting Outside?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'using_toilet', label: 'Using the toilet, including getting to the toilet?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'meals', label: 'Preparing your own meals?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'shopping', label: 'Shopping for personal items, such as toilet items or medicine?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'managing_money', label: 'Managing your money, such as keeping track of expenses or paying bills?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'telephone', label: 'Using the telephone?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'heavy_housework', label: 'Doing heavy housework, like scrubbing floors, or washing windows?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'light_housework', label: 'Doing light housework, like doing dishes, straightening up, or light cleaning?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'out_of_house', label: 'How often do you get out of the house?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Once a day or more' }, { id: '2', label: 'At least three times a week' }, { id: '3', label: 'Once or twice per week' }, { id: '4', label: 'Less than once a week' },], }] }, { id: 'limit_crime', label: 'How often do you limit your activities because of crime in your neighborhood?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Frequently' }, { id: '2', label: 'Sometimes / occasionally' }, { id: '3', label: 'Almost Never' },], }] },] },
{ id: '65mobility', label: 'Mobility', prompt: 'By yourself and not using aids, ', q: [{ id: 'mile_walk', label: 'Do you ever walk a mile?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes', hide: ['half_mile', 'quarter_mile'] }, { id: '2', label: 'No', show: ['half_mile', 'quarter_mile'] }] }] }, { id: 'half_mile', label: 'Do you have any difficulty walking a half- mile ? ', prompt: '(about 8 blocks)', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes', show: ['quarter_mile'] }, { id: '2', label: 'No', hide: ['quarter_mile'] }] }] }, { id: 'quarter_mile', label: 'Do you have any difficulty walking for a quarter of a mile?', prompt: '(about 2 or 3 blocks)', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'stairs', label: 'Do you have any difficulty walking up and down the stairs to the second floor without help?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes', show: ['10_steps_resting', '10_steps'] }, { id: '2', label: 'No', hide: ['10_steps_resting', '10_steps'] }] }] }, { id: '10_steps_resting', label: 'Do you have any difficulty walking up 10 stairs without resting?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes', show: ['10_steps'] }, { id: '2', label: 'No', hide: ['10_steps'] }] }] }, { id: '10_steps', label: 'Do you have any difficulty walking up 10 stairs ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: '25_pounds', label: 'Do you have any difficulty lifting or carrying something as heavy as 25 pounds ? ', prompt: '(such as two full bags of groceries)', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] },] },
{ id: '65support', label: 'Social Support', prompt: 'For each item below, select the best answer.', q: [{ id: 'needed_support', label: 'How often do you get the social and emotional support you need?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Always' }, { id: '2', label: 'Usually' }, { id: '3', label: 'Rarely' }, { id: '4', label: 'Never' },], }] }, { id: 'seeing_relatives', label: 'How many relatives do you see or hear from at least once a month?', prompt: '(NOTE: Include in-laws with relatives) ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Zero' }, { id: '2', label: 'One' }, { id: '3', label: 'Two' }, { id: '4', label: 'Three or Four' }, { id: '5', label: 'Five to Eight' }, { id: '6', label: 'Nine or more' },], }] }, { id: 'most_relatives', label: 'How often do you see or hear from the relative with whom you have the most contact?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Less than monthly' }, { id: '2', label: 'Monthly' }, { id: '3', label: 'A few times a month' }, { id: '4', label: 'Weekly' }, { id: '5', label: 'A few times a week' }, { id: '6', label: 'Daily' },], }] }, { id: 'close_relatives', label: 'How many relatives do you feel close to?', prompt: 'That is, how many of them do you feel at ease with, can talk to about private matters, or can call on for help ? ', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Zero' }, { id: '2', label: 'One' }, { id: '3', label: 'Two' }, { id: '4', label: 'Three or Four' }, { id: '5', label: 'Five to Eight' }, { id: '6', label: 'Nine or more' },], }] }, { id: 'ease_friends', label: 'How many close friends with whom you feel at ease, can you talk to about private matters, or can call on for help ? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Zero' }, { id: '2', label: 'One' }, { id: '3', label: 'Two' }, { id: '4', label: 'Three or Four' }, { id: '5', label: 'Five to Eight' }, { id: '6', label: 'Nine or more' },], }] }, { id: 'seeing_friends', label: 'How many of these friends do you see or hear from at least once a month?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Zero' }, { id: '2', label: 'One' }, { id: '3', label: 'Two' }, { id: '4', label: 'Three or Four' }, { id: '5', label: 'Five to Eight' }, { id: '6', label: 'Nine or more' },], }] }, { id: 'most_contact_friends', label: 'How often do you hear from the friend with whom you have the most contact?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Less than monthly' }, { id: '2', label: 'Monthly' }, { id: '3', label: 'A few times a month' }, { id: '4', label: 'Weekly' }, { id: '5', label: 'A few times a week' }, { id: '6', label: 'Daily' },], }] }, { id: 'important_decisions', label: 'When you have an important decision to make, do you have someone you can talk to about it?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Always' }, { id: '2', label: 'Very Often' }, { id: '3', label: 'Often' }, { id: '4', label: 'Sometimes' }, { id: '5', label: 'Seldom' }, { id: '6', label: 'Never' },], }] }, { id: 'know_important_decisions', label: 'When other people you know have an important decision to make, do they talk to you about it?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Always' }, { id: '2', label: 'Very Often' }, { id: '3', label: 'Often' }, { id: '4', label: 'Sometimes' }, { id: '5', label: 'Seldom' }, { id: '6', label: 'Never' },], }] }, { id: 'relied_on', label: 'Does anybody rely on you to do something for them each day?', prompt: '(For example: shopping, cooking dinner, doing repairs, cleaning house, providing childcare, etc.) ', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'help_with_things', label: 'Do you help anybody with things like shopping, filling out forms, doing repairs, providing childcare, etc.? ', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Always' }, { id: '2', label: 'Very Often' }, { id: '3', label: 'Often' }, { id: '4', label: 'Sometimes' }, { id: '5', label: 'Seldom' }, { id: '6', label: 'Never' },], }] }, { id: 'live_alone', label: 'Do you live alone or with other people?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '1', label: 'Live with spouse, and perhaps others' }, { id: '2', label: 'Live with other relatives or friends' }, { id: '3', label: 'Live with other unrelated help(e.g.paid help) ' }, { id: '4', label: 'Live alone' },], }] }, { id: 'home_alone', label: 'How many hours a day are you home alone?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: '0', label: 'Zero to four hours' }, { id: '1', label: 'Five to ten hours' }, { id: '2', label: 'Eleven to fifteen hours' }, { id: '3', label: 'Sixteen hours' },], }] },] },
{ id: '65dental_hearing_vision', label: 'Dental, Hearing, Vision Checkups', prompt: 'For each item below, select the answer that best describes when you had checkups.', q: [{ id: 'dentist_exam', label: 'About when was the last time you saw a dentist about your teeth?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] }, { id: 'hearing_exam', label: 'About when was the last time you had your hearing checked?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] }, { id: 'eye_exam', label: 'About when was the last time you had an eye exam?', prompt: '', input: [{ type: 'select', values: [{ id: 'not answered', label: 'choose an answer' }, { id: 'less than 1 year ago', label: 'Less than 1 year ago' }, { id: '1 year ago', label: '1 year ago' }, { id: '2 years ago', label: '2 years ago' }, { id: '3 or more years ago', label: '3 or more years ago' }, { id: 'never', label: 'Never' }], }] }, { id: 'recognize_friend_street', label: 'Can you see well enough to recognize a friend across the street?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'recognize_friend_room', label: 'Can you see well enough to recognize a friend across a room?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'recognize_friend_arm', label: 'Can you see well enough to recognize a friend who is at arm’s length away?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'recognize_friend_face', label: 'Can you see well enough to recognize a friend if you get close to his/ her face ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'large_newspapers', label: 'Can you see well enough to read large print, such as newspaper headlines ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'regular_newspapers', label: 'Can you see well enough to read ordinary newspapers ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'glasses_up_to_date', label: 'If you wear glasses, is your prescription up - to - date ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'seeing_beside_you', label: 'When looking straight ahead, can you see well enough to realize if a friend is standing directly on either side of you?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_embarassed', label: 'Does a hearing problem cause you to feel embarrassed when you meet new people ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_frustrated', label: 'Does a hearing problem cause you to feel frustrated when talking to members of your family?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_whisper', label: 'Do you have difficulty hearing when someone speaks in a whisper?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'handicapped_hearing', label: 'Do you feel handicapped by a hearing problem?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_visiting', label: 'Does a hearing problem cause you difficulty when visiting friends, relatives, or neighbors?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_religious', label: 'Does a hearing problem cause you to attend religious services less often than you would like?', prompt: '', input: [{ type: 'radio', values: [{ id: '0', label: 'Yes' }, { id: '1', label: 'No' }] }] }, { id: 'hearing_argument', label: 'Does a hearing problem cause you to have arguments with family members?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_radio', label: 'Does a hearing problem cause you difficulty when listening to television and radio?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_social_life', label: 'Do you feel that any difficulty with your hearing limits or hampers your personal or social life?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hearing_restaurant', label: 'Does a hearing problem cause you difficulty when in a restaurant with relatives or friends?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] },] },
{ id: '65home_safety', label: 'Home Safety', prompt: 'For each item below, select the best answer for your home setting.', q: [{ id: 'shadow_areas', label: 'Do you have enough lighting to get rid of shadowy areas?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'skid_backing', label: 'Do all rugs, runners, and mats have non- skid backing ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'carpet_edges', label: 'Do you have any carpet edges which are curling, uneven, or loose ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'objects_put_away', label: 'Are all small objects always put away, so that they are never out in walkways and stairways ? ', prompt: '(For example: glasses, magazines, cords, tools, etc.)', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'slippery_areas', label: 'Do you have any areas where you normally go around your house, which can be slippery when wet or icy ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'bath_slippery', label: 'Do you normally use any bathtubs or showers with slippery surfaces or without non - skid mats ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'grab_bars', label: 'Do bathtubs or showers that you normally use have grab bars ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'poor_lighting', label: 'Do any stairs or steps that you normally use have poor lighting ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'loose_steps', label: 'Are any of the stairs or steps that you normally use loose, crumbling or uneven ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'handrails', label: 'Do all of the stairs or steps you normally use have sturdy handrails ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'ladders', label: 'Are all ladders and step stools you normally use sturdy ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'smoke_detector', label: 'Does your home have a smoke detector ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hot_water_burn', label: 'Is the hot water in your house hot enough so that it could burn you ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] },] },
{ id: '65nutrition', label: 'Nutrition', prompt: 'For each item below, select the best answer.', q: [{ id: 'interferes_eating', label: 'Do you now have an illness or condition that interferes with your eating ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'cut_appetite', label: 'Do you have an illness that has cut down on your appetite ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'trouble_chewing', label: 'Do you have trouble biting or chewing any kind of food ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'disagree_foods', label: 'Are there any kinds of foods that you don’t eat because they disagree with you ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'dentures', label: 'Do you wear dentures ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'pain_abdomen', label: 'Last month, for three days or more, did you have any spells of pain or discomfort in your abdomen ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'trouble_swallowing', label: 'Last month, for three days or more, did you have any trouble swallowing ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'vomiting', label: 'Last month, for three days or more, did you have any vomiting ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'diarrhea', label: 'Do you have any bowel trouble that makes you constipated or gives you diarrhea ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'gained_weight', label: 'Have you gained or lost any weight in the last 30 days ? ', prompt: '(Note: Net gain or loss must exceed 10 lbs.)', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'abdomen_operation', label: 'Have you ever had an operation on your abdomen ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'anemic', label: 'Have you ever been told by a doctor that you were “anemic” (had iron - poor blood)?', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'prescribed_medicines', label: 'In the past month, have you taken any medicines prescribed by a doctor ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'nonprescribed_medicines', label: 'In the past month, have you taken any other medicines that were not prescribed by a doctor ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'special_diet', label: 'Are you now on any kind of a special diet ? ', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'change_food', label: 'I have an illness or condition that made me change the kind and / or amount of food I eat.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'fewer_two_meals', label: 'I eat fewer than two meals per day.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'few_fruits', label: 'I eat few fruits, vegetables, or milk products.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'hard_to_eat', label: 'I have tooth or mouth problems that make it hard for me to eat.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'money_for_food', label: 'I don’t always have enough money to buy the food I need.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'eat_alone', label: 'I eat alone most of the time.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'three_drugs', label: 'I take three or more different prescribed or over - the - counter drugs a day', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'unwanted_weight', label: 'Without wanting to, I have lost or gained 10 pounds in the last 6 months.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] }, { id: 'able_to_shop', label: 'I am not always physically able to shop, cook and / or feed myself.', prompt: '', input: [{ type: 'radio', values: [{ id: '1', label: 'Yes' }, { id: '2', label: 'No' }] }] },] }
];

hra.app.state.responses = {
    "hra.q.sex.a": "female", "hra.app.external_id": 1, "hra.app.hra_id": "default", "hra.app.patient_dob": "1993-02-12", "hra.q.age_in_years.a.years": "27", "hra.app.default_hra_id": "midlife", "appraise_risks.client_id": "fitnessfair", "appraise_risks.user_id": "1",
};
hra.app.state.config = {
    'save_key': '765942492d59486f681d35de15bedc16e8192f40', 'server_url': 'https://hra-api.ghmcorp.com', 'previous_responses': '{}'
};
hra.app.init();