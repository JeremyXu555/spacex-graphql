import * as React from 'react';
import { Form as antdForm, Icon, Input, Button, Checkbox } from 'antd';
import { Formik, Form } from 'formik';

import "../../../index.css";
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export interface IRegisterViewProps {
}

const hobbiesOptions = ['work out', 'swimming', 'sex'];
const defaultCheckedHobbies = [];

export default class RegisterView extends React.PureComponent<IRegisterViewProps> {
  
  state = {
    checkedHobbies: defaultCheckedHobbies,
    indeterminate: true,
    checkAll: false,
  };

  onHobbiesChange = (checkedHobbies: Array<any>) => {
    this.setState({
      checkedHobbies,
      indeterminate: !!checkedHobbies.length && checkedHobbies.length < hobbiesOptions.length,
      checkAll: checkedHobbies.length === hobbiesOptions.length,
    });
  };

  onCheckAllChange = (e:CheckboxChangeEvent) => {
    this.setState({
      checkedHobbies: e.target.checked ? hobbiesOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

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
            data.hobbies = this.state.checkedHobbies;
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
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                  >
                    Check all
                  </Checkbox>
                </div>
                Hobbies:
                <CheckboxGroup
                  name="hobbies"
                  onChange={this.onHobbiesChange}
                  options={hobbiesOptions} 
                  value={this.state.checkedHobbies}
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
