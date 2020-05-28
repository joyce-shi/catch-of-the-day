import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route component={ StorePicker } exact path="/"/>
            <Route component={ App } path="/store/:storeId" />
            <Route component={ NotFound } />
        </Switch>
    </BrowserRouter>
);

export default Router;
