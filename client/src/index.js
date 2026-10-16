// redux grejer
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from "redux-thunk";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk) );

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <Provider store={store}>
        <App />
    </Provider>);
 console.log('stripe key is ', process.env.REACT_APP_STRIPE_KEY);
 console.log('environment variable is ', process.env.NODE_ENV);






