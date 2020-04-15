import {Button, Row, Form, Col, Descriptions, Input} from 'antd';
import React, {useEffect, useState, FunctionComponent} from 'react';
import {ApplicationForm} from "./model/Service";

type ApplicationFormCreateEditViewProps = {
    index: number,
    applicationForm: ApplicationForm,
    updateState: Function
};

export const ApplicationFormCreateEditView: FunctionComponent<ApplicationFormCreateEditViewProps> = ({children, index, applicationForm, updateState}) => {
    return <div style={{backgroundColor: '#d9d9d9', paddingTop: 10}}>
        <Descriptions title="APPLICATION FORM - 1" style={{marginLeft: 60, paddingTop: 10}}/>
        <Row style={{paddingRight: 10}}>
            <Col span={24}>
                <Form.Item label="Form name" name={`application.form.${index}.name`}
                           rules={[{
                               required: true,
                               message: 'This field is mandatory'
                           }]}>
                    <Input onChange={(e) => {
                        applicationForm.name = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>
        </Row>
    </div>;
};