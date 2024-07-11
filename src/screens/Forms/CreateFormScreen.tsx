import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, StyleSheet, View, Platform, ActivityIndicator, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Form} from '@rcd/entities';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {Button, FormInput} from '@rcd/components';
import {createAction} from '@rcd/utility/store';
import createFormScreenSelector from '@rcd/store/selectors/createFormScreenSelector';

const CreateFormScreen = ({route, navigation}: StackScreenProps<any>) => {
  const dispatch = useDispatch();
  const {isLoading, form} = useSelector(createFormScreenSelector);
  const {type} = route.params!;

  useFocusEffect(
    useCallback(() => {
      const typeTitle = {
        meeting: 'среща',
        site: 'обект',
      }[type as string];

      navigation.setOptions({
        headerTitle: `Добави ${typeTitle}`,
      });
      dispatch(createAction('createFormScreen/OPENED', {type}));
    }, []),
  );

  const handleSubmit = useCallback((data: Record<string, string>) => {
    dispatch(createAction('createFormScreen/SUBMIT', {type, data}));
  }, []);

  if (isLoading && !form) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.whites[100]} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}} behavior="padding">
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">
        <FormView form={form} isLoading={isLoading} onSubmit={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

interface FormViewProps {
  form?: Form;
  isLoading: boolean;
  onSubmit: (data: Record<string, string>) => void;
}

const FormView = ({form = {}, isLoading, onSubmit}: FormViewProps) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <View style={styles.form}>
      {Object.keys(form)
        .filter((key) => form[key].editable === true)
        .filter((key) => form[key].type !== 'current_user')
        .map((key) => {
          const field = form[key];

          return (
            <View style={styles.field} key={key}>
              <Text style={styles.label}>{field.name}</Text>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <FormInput field={field} value={value} onChange={onChange} onBlur={onBlur} />
                )}
                name={key}
                rules={{
                  required: field.required ? 'Задължително поле' : undefined,
                  pattern:
                    field.type === 'email'
                      ? {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Невалиден имейл адрес',
                        }
                      : undefined,
                }}
              />

              {errors[key] && <Text style={styles.error}>{errors[key].message}</Text>}
            </View>
          );
        })}

      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        Изпрати
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'android' ? Spacing.large : 0,
  },

  loadingContainer: {
    flex: 1,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  form: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: Spacing.small,
    paddingBottom: Spacing.large,
  },

  field: {
    paddingVertical: Spacing.small,
    width: '100%',
  },

  label: {
    width: '100%',
    color: Colors.whites[100],
    marginBottom: Spacing.xxsmall,
  },

  error: {
    fontSize: FontSize.xxxsmall,
    marginTop: 2,
    color: Colors.reds[100],
  },
});

export default CreateFormScreen;
