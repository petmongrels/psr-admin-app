import React, {FunctionComponent, useState, useEffect} from 'react';
import {PSRLayout} from "../../framework/view/PSRLayout";
import {MasterDataListComponent} from "./MasterDataListComponent";
import {APIService} from "../../framework/api/APIService";
import {ServerResources} from "../../framework/routing/ServerResources";

type ServiceTagViewProps = {};

export const ServiceTagView: FunctionComponent<ServiceTagViewProps> = ({children}) => {
    const [serviceTags, update] = useState([]);

    useEffect(() => {
        APIService.loadAll(ServerResources.getResourceBaseURL("service_tag")).then((data) => {
            update(data);
        });
    }, []);


    return <PSRLayout>
        <MasterDataListComponent masterDataList={serviceTags} resource="service_tag"/>
    </PSRLayout>;
};