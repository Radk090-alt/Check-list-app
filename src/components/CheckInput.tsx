import React from 'react';
import {View} from 'react-native';
import {Step} from '@rcd/entities';
import {SelectInput} from './Inputs/SelectInput';
import {TextInput} from './Inputs/TextInput';

interface Props {
  type: Step['type'];
  options: Step['options'];
  value: string;
  onChange: (value: string) => void;
}

export const CheckInput = ({type, value, options, onChange}: Props) => {
  switch (type) {
    case 'select':
      return (
        <SelectInput value={value} options={options?.map((o) => ({value: o, label: o})) || []} onChange={onChange} />
      );
    case 'text':
      return <TextInput oldValue={value} multiline={true} onChange={onChange} />;
    default:
      return <View />;
  }
};
