import * as React from 'react';
import { Form as antdForm, Icon, Input, Button } from 'antd';
import { Formik, Form } from 'formik';

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
            ({ values }) => (
              <Form style={{ width: 400, margin: 'auto' }}>
                <antdForm.Item>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="First Name" value={values.firstName}
                  />
                </antdForm.Item>
                <antdForm.Item>
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Last Name" value={values.lastName}
                  />
                </antdForm.Item>
                <antdForm.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </antdForm.Item>
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
