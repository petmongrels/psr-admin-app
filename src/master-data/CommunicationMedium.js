import React, {useState} from 'react';
import {Form, Input} from 'antd';

import {PSRLayout} from "../framework/view/PSRLayout";
import {CommunicationMedium} from "./CommunicationMediumData";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";

export function CommunicationMediumCreateEdit(props) {
    const [communicationMedium, update] = useState(new CommunicationMedium());

    const updateState = function () {
        update(CommunicationMedium.clone(communicationMedium));
    };

    return <PSRLayout>
        <PSRForm submitHandler={() => APIService.save("communication_medium", communicationMedium)}>
            <Form.Item
                label="Name" name="name"
                rules={[
                    {
                        required: true,
                        message: 'Name is mandatory'
                    }
                ]}>
                <Input onChange={(e) => {
                    communicationMedium.name = e.target.value;
                    updateState();
                }}/>
            </Form.Item>
        </PSRForm>
    </PSRLayout>;
}