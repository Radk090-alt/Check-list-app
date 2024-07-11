import React, {useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Dimensions,
  Platform,
  Keyboard,
  Pressable,
  Vibration,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import checkScreenSelector from '@rcd/store/selectors/checkScreenSelector';
import {ProgressBar} from '@rcd/components/ProgressBar';
import {Colors, Spacing} from '@rcd/utility';
import {Button} from '@rcd/components';
import {createAction} from '@rcd/utility/store';
import {StepView} from '@rcd/components/StepView';
import {Photo} from '@rcd/entities';

const CheckScreen = () => {
  const {checklist, isLoading, missingPhotos, stepIndex, totalSteps, canGoNext, canGoBack} = useSelector(
    checkScreenSelector,
  );

  const dispatch = useDispatch();
  const stepsList = useRef<FlatList>(null);
  const {width: windowWidth} = Dimensions.get('window');

  const handleUpdateStep = useCallback(
    ({step, answer, comment}) => {
      dispatch(createAction('checkScreen/UPDATE_STEP', {checklist, step, answer, comment}));
    },
    [checklist],
  );

  const handleAddPhotos = useCallback(() => {
    Vibration.vibrate(10);
    dispatch(createAction('checkScreen/ADD_PHOTOS'));
  }, [missingPhotos]);

  const handleOpenPhoto = useCallback(
    (photo: Photo) => {
      Vibration.vibrate(10);
      dispatch(createAction('checkScreen/OPEN_PHOTO', {photo, checklist, stepIndex}));
    },
    [checklist, stepIndex],
  );

  const handleGoNext = useCallback(() => {
    Vibration.vibrate(10);
    dispatch(createAction('checkScreen/NEXT_STEP'));

    if (stepIndex + 1 <= totalSteps) {
      stepsList.current!.scrollToOffset({
        animated: true,
        offset: windowWidth * (stepIndex + 1),
      });
    }
  }, [stepsList, stepIndex, totalSteps]);

  const handleGoBack = useCallback(() => {
    Vibration.vibrate(10);
    dispatch(createAction('checkScreen/PREVIOUS_STEP'));

    if (stepIndex > 0) {
      stepsList.current!.scrollToOffset({
        animated: true,
        offset: windowWidth * (stepIndex - 1),
      });
    }
  }, [stepsList, stepIndex]);

  if (isLoading || !checklist) {
    return (
      <View style={[styles.container, styles.content]}>
        <ActivityIndicator size="large" color={Colors.whites[100]} />
      </View>
    );
  }

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          Стъпка {stepIndex + 1} от {totalSteps}
        </Text>
        <ProgressBar current={stepIndex} total={totalSteps} />
      </View>

      <ScrollView style={styles.scrollView}>
        <FlatList
          ref={stepsList}
          data={checklist.steps}
          style={styles.steps}
          initialScrollIndex={stepIndex}
          getItemLayout={(items, index) => ({length: windowWidth, offset: windowWidth * index, index})}
          contentContainerStyle={styles.stepsContainer}
          renderItem={({item}) => (
            <StepView
              key={item.id}
              step={item}
              onUpdateStep={handleUpdateStep}
              onAddPhotos={handleAddPhotos}
              onOpenPhoto={handleOpenPhoto}
            />
          )}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      <SafeAreaView style={styles.buttonsSafeArea}>
        <View style={styles.buttons}>
          <Button
            onPress={handleGoBack}
            disabled={!canGoBack}
            style={[styles.button, !canGoBack ? styles.disabledButton : null]}>
            <MaterialCommunityIcons name="chevron-left" size={32} color={Colors.whites[100]} />
          </Button>
          <Button
            onPress={handleGoNext}
            disabled={!canGoNext}
            style={[styles.button, !canGoNext ? styles.disabledButton : null]}>
            <MaterialCommunityIcons name="chevron-right" size={32} color={Colors.whites[100]} />
          </Button>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blacks[100],
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.grays[300],
  },

  headerLabel: {
    color: Colors.grays[900],
  },

  scrollView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },

  steps: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  stepsContainer: {
    height: '100%',
    alignItems: 'stretch',
  },

  buttonsSafeArea: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'android' ? 45 : 0,
    position: 'absolute',
    bottom: 0,
  },

  buttons: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.xsmall,
    justifyContent: 'space-between',
  },

  button: {
    borderRadius: 999,
    width: 64,
    height: 64,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  disabledButton: {
    backgroundColor: Colors.grays[500],
  },
});

export default CheckScreen;
