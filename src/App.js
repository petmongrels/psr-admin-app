import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {Service} from "./service/Service";
import {CommunicationMediumList} from "./master-data/CommunicationMediumList";
import {CommunicationMedium} from "./master-data/CommunicationMedium";

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
                    {getRoute("/services", Service())}
                    {getRoute("/communicationMediums", CommunicationMediumList())}
                    {getRoute("/communicationMedium/new", CommunicationMedium())}
                </Switch>
            </div>
        </Router>
    );
}
