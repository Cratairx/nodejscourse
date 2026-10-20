import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducers from './surveysReducers';


export default combineReducers({
    // undrar varför form blev rosa
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducers
});
