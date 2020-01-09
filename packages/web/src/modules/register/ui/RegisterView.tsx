import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Formik } from 'formik';

import "../../../index.css";

export interface IRegisterViewProps {
}

export default class RegisterView extends React.PureComponent<IRegisterViewProps> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            crazy: false,
            hobbies: [],
            perferTech: [{ language: '', framework: '' }],
            email: '',
            password: '',
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // async call
            console.log(data);
            setSubmitting(false);
          }}
        >
          {
            ({ values, handleSubmit }) => (
              <Form style={{ width: 400, margin: 'auto' }} onSubmit={handleSubmit}>
                <Form.Item>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="First Name" value={values.firstName}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Last Name" value={values.lastName}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
                <pre>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </Form>
            )
          }
        </Formik>
      </div>
    );
  }
}
