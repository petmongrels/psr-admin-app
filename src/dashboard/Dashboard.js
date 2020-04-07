import React, {useState} from 'react';
import {serviceList} from "../service/ServiceList";
import {PSRLayout} from "../framework/view/PSRLayout";

export function dashboard(props) {
    return (
        <PSRLayout>
            {serviceList(props)}
        </PSRLayout>
    );
}