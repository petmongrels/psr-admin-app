import React, {useState} from 'react';
import {Form, Input} from 'antd';

import {PSRLayout} from "../framework/view/PSRLayout";
import {CommunicationMediumData} from "./CommunicationMediumData";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";

export function CommunicationMedium(props) {
    const [communicationMediumData, update] = useState(new CommunicationMediumData());

    const updateState = function () {
        update(CommunicationMediumData.clone(communicationMediumData));
    };

    return <PSRLayout>
        <PSRForm submitHandler={() => APIService.save("communication_medium", communicationMediumData)}>
            <Form.Item
                label="Name" name="name"
                rules={[
                    {
                        required: true,
                        message: 'Name is mandatory'
                    }
                ]}>
                <Input onChange={(e) => {
                    communicationMediumData.name = e.target.value;
                    updateState();
                }}/>
            </Form.Item>
        </PSRForm>
    </PSRLayout>;
}