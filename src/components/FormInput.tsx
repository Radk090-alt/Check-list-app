import React from 'react';
import {View, TextInput as RNTextInput} from 'react-native';
import {Field} from '@rcd/entities';
import {SelectInput} from './Inputs/SelectInput';
import {TextInput} from './Inputs/TextInput';
import {DateInput} from './Inputs/DateInput';

interface Props extends Omit<React.ComponentProps<typeof RNTextInput>, 'onChange'> {
  field: Field;
  value?: string;
  onChange: (value: string) => void;
}

export const FormInput = ({field, value = '', onChange, ...props}: Props) => {
  switch (field.type) {
    case 'now':
      return <DateInput {...props} oldValue={new Date()} onChange={onChange} />;
    case 'simpleselect':
      return (
        <SelectInput
          {...props}
          value={value}
          options={Object.keys(field.values || {}).map((o) => ({value: o, label: o}))}
          onChange={onChange}
        />
      );
    case 'text':
      return <TextInput {...props} oldValue={value} onChange={onChange} />;
    case 'number':
      return <TextInput {...props} oldValue={value} keyboardType="number-pad" onChange={onChange} />;
    case 'email':
      return <TextInput {...props} oldValue={value} keyboardType="email-address" onChange={onChange} />;
    case 'phone':
      return <TextInput {...props} oldValue={value} keyboardType="phone-pad" onChange={onChange} />;
    default:
      return <View />;
  }
};
