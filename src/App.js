import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ServiceCreateEditView} from "./service/ServiceCreateEditView";
import {CommunicationMediumListView} from "./master-data/CommunicationMediumListView";
import {CommunicationMediumCreateEditView} from "./master-data/CommunicationMediumCreateEditView";
import {PSRResources} from "./framework/routing/PSRResources";
import {ServiceListView} from "./service/ServiceListView";

const getRoute = function (path, view) {
    return <Route path={path}>
        {view}
    </Route>;
};

const UIContext = React.createContext();

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {dashboard()}
                </Route>
                {getRoute(PSRResources.getListURLFor("service"), ServiceListView())}
                {getRoute(PSRResources.getCreateURLFor("service"), ServiceCreateEditView(props))}
                {getRoute(PSRResources.getListURLFor("communicationMedium"), CommunicationMediumListView(props))}
                {getRoute(PSRResources.getCreateURLFor("communicationMedium"), CommunicationMediumCreateEditView(props))}
            </Switch>
        </Router>
    );
}
