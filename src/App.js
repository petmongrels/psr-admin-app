import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ServiceCreateEditView} from "./service/ServiceCreateEditView";
import {CommunicationMediumList} from "./master-data/CommunicationMediumList";
import {CommunicationMediumCreateEdit} from "./master-data/CommunicationMedium";
import {PSRResources} from "./framework/routing/PSRResources";
import {ServiceListView} from "./service/ServiceListView";

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
                    {getRoute(PSRResources.getListURLFor("service"), ServiceListView())}
                    {getRoute(PSRResources.getCreateURLFor("service"), ServiceCreateEditView())}
                    {getRoute(PSRResources.getListURLFor("communicationMedium"), CommunicationMediumList())}
                    {getRoute(PSRResources.getCreateURLFor("communicationMedium"), CommunicationMediumCreateEdit())}
                </Switch>
            </div>
        </Router>
    );
}
