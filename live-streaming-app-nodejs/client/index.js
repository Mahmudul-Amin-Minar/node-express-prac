import 'bootstrap';
import { default as React, default as ReactDOM } from "react";
import { BrowserRouter } from "react-router-dom";
import Root from './components/Root.js';
require('./index.scss');

if(document.getElementById('root')){
    ReactDOM.render(
        <BrowserRouter>
            <Root/>
        </BrowserRouter>,
        document.getElementById('root')
    )
}