import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {dashboard} from "./dashboard/Dashboard";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ServiceCreateEditView} from "./service/ServiceCreateEditView";
import {AppResources} from "./framework/routing/AppResources";
import {ServiceListView} from "./service/ServiceListView";
import {ProofsAndDocumentsView} from "./proof-document/ProofsAndDocumentsView";
import {ProofTypeCreateEditView} from "./master-data/ProofTypeCreateEditView";
import {SimpleMasterDataCreateEditView} from "./master-data/view/SimpleMasterDataCreateEditView";
import {PSRDocumentType} from "./service/model/Service";
import {ProofsAndDocuments} from "./proof-document/model/ProofsAndDocuments";
import {ServiceTag} from "./master-data/model/ServiceTag";
import {MasterDataListComponentView} from "./master-data/view/MasterDataListComponentView";
import {CommunicationMedium} from "./master-data/model/CommunicationMedium";

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

const editRoute = function (resource, view) {
    return getRoute(AppResources.getEditPathTemplate(resource), view)
};

const masterDataListRoute = function (resource) {
    return listRoute(resource, <MasterDataListComponentView resource={resource}/>);
};

const masterDataCreateEditRoute = function (resource, entityFactoryFn) {
    return createRoute(resource, <SimpleMasterDataCreateEditView entityFactory={entityFactoryFn} resourceName={resource}/>);
};

export default function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {dashboard()}
                </Route>
                {editRoute("service", <ServiceCreateEditView/>)}
                {createRoute("service", <ServiceCreateEditView/>)}
                {listRoute("service", <ServiceListView/>)}

                {masterDataCreateEditRoute("service_tag", ServiceTag.newInstance)}
                {masterDataListRoute("service_tag")}

                {masterDataCreateEditRoute("communication_medium", CommunicationMedium.emptyInstance)}
                {masterDataListRoute("communication_medium")}
                {getRoute(AppResources.getCustomPath(ProofsAndDocuments.APP_RESOURCE_NAME), <ProofsAndDocumentsView/>)}
                {getRoute(AppResources.getEditPathTemplate("proof_type"), <ProofTypeCreateEditView/>)}
                {getRoute(AppResources.getEditPathTemplate("document_type"), <SimpleMasterDataCreateEditView entityFactory={() => new PSRDocumentType()}
                                                                                                             resourceName="document_type"
                                                                                                             masterDataTitle="document type"/>)}
            </Switch>
        </Router>
    );
}
