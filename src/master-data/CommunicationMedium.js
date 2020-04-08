import React, {useState} from 'react';
import {Form, Input, Space} from 'antd';

import {PSRLayout} from "../framework/view/PSRLayout";
import {CommunicationMediumData} from "./CommunicationMediumData";

export function CommunicationMedium(props) {
    const [communicationMediumData, update] = useState(new CommunicationMediumData());

    const updateState = function () {
        update(CommunicationMediumData.clone(communicationMediumData));
    };

    return <PSRLayout>
        <Form name="basic" onFinish={() => {
        }} onFinishFailed={() => {
        }}>
            <Space direction="vertical" style={{width: "100%"}}>
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
            </Space>
        </Form>
    </PSRLayout>;
}