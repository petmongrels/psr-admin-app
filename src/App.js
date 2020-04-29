import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ServiceCreateEditView} from "./service/ServiceCreateEditView";
import {CommunicationMediumListView} from "./master-data/CommunicationMediumListView";
import {CommunicationMediumCreateEditView} from "./master-data/CommunicationMediumCreateEditView";
import {AppResources} from "./framework/routing/AppResources";
import {ServiceListView} from "./service/ServiceListView";
import {ProofsAndDocumentsView} from "./proof-document/ProofsAndDocumentsView";
import {ProofTypeCreateEditView} from "./master-data/ProofTypeCreateEditView";
import {SimpleMasterDataCreateEditView} from "./master-data/view/SimpleMasterDataCreateEditView";
import {PSRDocumentType} from "./service/model/Service";
import {ProofsAndDocuments} from "./proof-document/model/ProofsAndDocuments";

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
                {getRoute(AppResources.getListPath("service"), <ServiceListView/>)}
                {getRoute(AppResources.getCreatePath("service"), <ServiceCreateEditView/>)}
                {getRoute(AppResources.getListPath("communication_medium"), <CommunicationMediumListView/>)}
                {getRoute(AppResources.getCreatePath("communication_medium"), <CommunicationMediumCreateEditView/>)}
                {getRoute(AppResources.getCustomPath(ProofsAndDocuments.APP_RESOURCE_NAME), <ProofsAndDocumentsView/>)}
                {getRoute(AppResources.getEditPathTemplate("proof_type"), <ProofTypeCreateEditView/>)}
                {getRoute(AppResources.getEditPathTemplate("document_type"), <SimpleMasterDataCreateEditView entityFactory={() => new PSRDocumentType()}
                                                                                                             resourceName="document_type"
                                                                                                             masterDataTitle="DOCUMENT TYPE"/>)}
            </Switch>
        </Router>
    );
}
