import * as React from 'react';
import {
  Form as antdForm,
  Icon,
  Button,
  Checkbox,
  Radio,
} from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';

import {
  Select,
  Input
} from '../../components';

import {
  Formik,
  Form,
  FieldArray,
} from 'formik';

import "../../index.css";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { userValidation } from '@jxu/common';

const Option = Select.Option;

export interface IFormikWithAntdProps {
  submit: () => {}
}

const hobbiesOptions = ['work out', 'swimming', 'sex'];
const defaultCheckedHobbies = [];

const offDayOptions = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
];

export default class FormikWithAntd extends React.PureComponent<IFormikWithAntdProps> {

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

  onCheckAllChange = (e: CheckboxChangeEvent) => {
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
            offDay: offDayOptions[0].value,
            preferTech: [{ language: 'NodeJs', framework: 'Express', id: '' + Math.random() }],
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
          validationSchema={userValidation}
        >
          {
            ({ values, handleChange, errors, touched }) => (
              <Form style={{ width: 400, margin: 'auto' }}>
                <antdForm.Item>
                  <Input
                    name="firstName"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="First Name"
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                  <Input
                    name="lastName"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Last Name"
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
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
                  <div>
                    Which day during the week you want to work from home?
                </div>
                  <Radio.Group
                    name="offDay"
                    defaultValue={values.offDay}
                    onChange={handleChange}
                    options={offDayOptions}
                  />
                </antdForm.Item>
                <FieldArray name="preferTech">
                  {
                    arrayHelpers => (
                      <div>
                        <Button onClick={() => {
                          arrayHelpers.push({
                            framework: 'Privata',
                            id: '' + Math.random(),
                          })
                        }}
                          type='primary'
                        >
                          Add preference
                        </Button>
                        {
                          values.preferTech.map((tech, index) => {
                            return (
                              <div key={tech.id}>
                                <Input
                                  name={`preferTech.${index}.language`}
                                  placeholder='language'
                                />
                                <Select name={`preferTech.${index}.framework`}>
                                  <Option value="Django">Django</Option>
                                  <Option value="Express">Express</Option>
                                  <Option value="Formik">Formik</Option>
                                </Select>
                                <Button type="danger" onClick={() => arrayHelpers.remove(index)}>
                                  x
                                </Button>
                              </div>
                            );
                          })
                        }
                      </div>
                    )
                  }
                </FieldArray>
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
      </div >
    );
  }
}
