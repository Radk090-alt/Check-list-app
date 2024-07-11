import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, FontSize, Spacing} from '@rcd/utility';
import {Photo, Step} from '@rcd/entities';
import {CheckInput} from './CheckInput';
import {TextInput} from './Inputs/TextInput';

interface Payload {
  step: Step;
  answer: string | undefined;
  comment: string | undefined;
}
interface Props {
  step: Step;
  onUpdateStep: ({step, answer, comment}: Payload) => void;
  onAddPhotos: () => void;
  onOpenPhoto: (photo: Photo) => void;
}

export const StepView = ({step, onUpdateStep, onAddPhotos, onOpenPhoto}: Props) => {
  const isInitialMount = useRef(true);

  const [answer, setAnswer] = useState(step.answer);
  const [comment, setComment] = useState(step.comment);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onUpdateStep({step, answer, comment});
    }
  }, [answer, comment]);

  return (
    <View style={[styles.container]}>
      <View style={styles.stepInfo}>
        <View style={styles.stepInfoBox}>
          <Text style={styles.stepInfoLabel}>Категория</Text>
          <Text style={styles.stepInfoTitle}>{step.category_name}</Text>
        </View>
        {!!step.title && (
          <View style={styles.stepInfoBox}>
            <Text style={styles.stepInfoLabel}>Стъпка</Text>
            <Text style={styles.stepInfoTitle}>{step.title}</Text>
          </View>
        )}
      </View>

      {step.type !== null && (
        <View style={styles.section}>
          <Text style={styles.stepInfoText}>{step.info_text}</Text>

          <CheckInput type={step.type} options={step.options} value={answer} onChange={setAnswer} />
        </View>
      )}

      {step.has_comment && (
        <View style={styles.section}>
          <Text style={styles.stepInfoText}>Коментар</Text>
          <TextInput oldValue={comment} onChange={setComment} multiline={true} />
        </View>
      )}

      {step.photos && (
        <React.Fragment>
          <View style={styles.stepInfo}>
            <View style={styles.stepInfoBox}>
              <Text style={styles.stepInfoLabel}>
                Снимки <Text style={styles.stepInfoLabelSub}>(Минимум {step.minPhotos})</Text>
              </Text>
            </View>
          </View>

          <View style={styles.photos}>
            {step.photos
              .filter((photo) => photo.photo !== null)
              .map((photo, i) => (
                <View style={styles.photoContainer} key={i}>
                  <Pressable style={styles.photoNode} onPress={() => onOpenPhoto(photo)}>
                    <Image style={styles.photo} source={{uri: photo.photo as string}} />
                  </Pressable>
                </View>
              ))}

            {step.assignedPhotos < step.maxPhotos && (
              <Pressable style={[styles.photoContainer, styles.emptyPhotoContainer]} onPress={onAddPhotos}>
                <MaterialCommunityIcons name="image-plus" size={48} style={styles.addPhotosIcon} />
              </Pressable>
            )}
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height * 0.8,
    width: Dimensions.get('window').width,
    paddingHorizontal: Spacing.small,
    paddingBottom: Spacing.xxxlarge,
  },

  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.medium,
  },

  stepInfo: {
    width: '100%',
    flexDirection: 'column',
  },

  stepInfoBox: {
    // flex: 1,
    marginTop: Spacing.xsmall,
  },

  stepInfoLabel: {
    textTransform: 'uppercase',
    color: Colors.grays[900],
  },

  stepInfoLabelSub: {
    textTransform: 'uppercase',
    color: Colors.grays[900],
    fontSize: FontSize.xxxxsmall,
  },

  stepInfoTitle: {
    color: Colors.whites[100],
  },

  stepInfoText: {
    color: Colors.whites[100],
    marginBottom: Spacing.xxsmall,
    textAlign: 'center',
  },

  addPhotosText: {
    color: Colors.whites[100],
  },

  addPhotosIconContainer: {
    position: 'absolute',
    right: 0,
    marginRight: Spacing.small,
  },

  addPhotosIconAmount: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: Colors.whites[100],
    borderRadius: 999,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addPhotosIconAmountText: {
    color: Colors.blues[100],
    fontWeight: 'bold',
  },

  addPhotosIcon: {
    color: Colors.whites[100],
  },

  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: Spacing.small,
  },

  photoContainer: {
    flexBasis: '33.333%',
    flexGrow: 0,
    flex: 1,
    height: 110,
    padding: Spacing.xxsmall,
  },

  photoNode: {
    flex: 1,
    shadowColor: Colors.grays[500],
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  emptyPhotoContainer: {
    borderRadius: 5,
    borderColor: Colors.whites[100],
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  requiredPhotoLabel: {
    backgroundColor: Colors.reds[100],
    padding: Spacing.xxsmall,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    position: 'absolute',
    borderColor: Colors.whites[100],
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    top: -1,
    left: -1,
    right: -1,
  },

  requiredPhotoLabelText: {
    color: Colors.whites[100],
    fontSize: FontSize.xxxsmall,
    textAlign: 'center',
  },

  deletePhoto: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  photo: {
    flex: 1,
    borderRadius: 5,
  },
});
