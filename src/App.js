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
import {ServiceTagView} from "./master-data/view/ServiceTagView";

const getRoute = function (path, view) {
    return <Route path={path}>
        {view}
    </Route>;
};

const UIContext = React.createContext();

const listRoute = function (resource, view) {
    return getRoute(AppResources.getListPath(resource), view);
};

const createRoute = function (resource, view) {
    return getRoute(AppResources.getCreatePath(resource), view);
};

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {dashboard()}
                </Route>
                {getRoute(AppResources.getCreatePath("service"), <ServiceCreateEditView/>)}
                {getRoute(AppResources.getListPath("service"), <ServiceListView/>)}
                {listRoute("communication_medium", <CommunicationMediumListView/>)}
                {listRoute("service_tag", <ServiceTagView/>)}
                {createRoute("communication_medium", <CommunicationMediumCreateEditView/>)}
                {getRoute(AppResources.getCustomPath(ProofsAndDocuments.APP_RESOURCE_NAME), <ProofsAndDocumentsView/>)}
                {getRoute(AppResources.getEditPathTemplate("proof_type"), <ProofTypeCreateEditView/>)}
                {getRoute(AppResources.getEditPathTemplate("document_type"), <SimpleMasterDataCreateEditView entityFactory={() => new PSRDocumentType()}
                                                                                                             resourceName="document_type"
                                                                                                             masterDataTitle="document type"/>)}
            </Switch>
        </Router>
    );
}
