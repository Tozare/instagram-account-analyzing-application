import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initFacebookSDK} from "./shared/libs/facebook-sdk/init-facebook-sdk";
import {
    BrowserRouter
} from "react-router-dom";

const renderApp = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('app')
    );
}


initFacebookSDK().then(() => {
    renderApp();
});