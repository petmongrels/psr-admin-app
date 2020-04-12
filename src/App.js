import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Service} from "./service/Service";
import {CommunicationMediumList} from "./master-data/CommunicationMediumList";
import {CommunicationMedium} from "./master-data/CommunicationMedium";
import {PSRRouter} from "./framework/routing/PSRRouter";
import {ServiceList} from "./service/ServiceList";

const getRoute = function (path, view) {
    return <Route path={path}>
        {view}
    </Route>;
};

const UIContext = React.createContext();

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        {dashboard()}
                    </Route>
                    {getRoute(PSRRouter.getListURLFor("service"), ServiceList())}
                    {getRoute(PSRRouter.getCreateURLFor("service"), Service())}
                    {getRoute(PSRRouter.getListURLFor("communicationMedium"), CommunicationMediumList())}
                    {getRoute(PSRRouter.getCreateURLFor("communicationMedium"), CommunicationMedium())}
                </Switch>
            </div>
        </Router>
    );
}
