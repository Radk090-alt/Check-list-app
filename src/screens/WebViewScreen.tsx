import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {BACKEND_API_URL} from '@rcd/environment';
import accessTokenSelector from '@rcd/store/selectors/accessTokenSelector';


export const WebViewScreen = ({route, navigation}) => {
  const {token} = useSelector(accessTokenSelector);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, [navigation]);

  if (!route.params.url) {
    return <Text>Невалиден адрес</Text>;
  }

  return (
    <WebView
      source={{
        uri: `${BACKEND_API_URL}${route.params.url}`,
        headers: {
          UserToken: token,
        },
      }}
    />
  );
};
