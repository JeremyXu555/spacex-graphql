import { Checkbox as $Checkbox } from "antd";
import { CheckboxProps as $CheckboxProps } from "antd/lib/checkbox";
import { CheckboxGroupProps as $CheckboxGroupProps } from 'antd/lib/checkbox/Group'
import { Field, FieldProps } from "formik";
import * as React from "react";
import { FormikFieldProps } from "./FieldProps"

export type CheckboxProps = FormikFieldProps & $CheckboxProps;

export const Checkbox = ({name, onChange: $onChange, validate, ...restProps}: CheckboxProps) => (
  <Field name={name} validate={validate}>
    {({
      field: {value},
      form: {setFieldValue, setFieldTouched},
    }: FieldProps) => (
      <$Checkbox
        name={name}
        value={value}
        onChange={(event) => {
          setFieldValue(name, event.target.checked)
          setFieldTouched(name, true, false)
          $onChange && $onChange(event)
        }}
        {...restProps}
      />
    )}
  </Field>
);

export type CheckboxGroupProps = FormikFieldProps & $CheckboxGroupProps;

Checkbox.Group = ({
  name,
  validate,
  onChange,
  ...restProps
}: CheckboxGroupProps) => (
  <Field name={name} validate={validate}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <$Checkbox.Group
        value={value}
        onChange={(value) => {
          setFieldValue(name, value)
          setFieldTouched(name, true, false)
          onChange && onChange(value)
        }}
        {...restProps}
      />
    )}
  </Field>
);
