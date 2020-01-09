import * as React from 'react';
import { Form as antdForm, Icon, Input, Button, Checkbox } from 'antd';
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
            ({ values, handleChange }) => (
              <Form style={{ width: 400, margin: 'auto' }}>
                <antdForm.Item>
                  <Input
                    name="firstName"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    name="lastName"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </antdForm.Item>
                <antdForm.Item>
                  <Checkbox name="crazy" checked={values.crazy} onChange={handleChange}>crazy</Checkbox>
                  <a className="login-form-forgot" href="/">Forget password</a>
                  <div></div>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <a href="/">Register Now!</a>
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
