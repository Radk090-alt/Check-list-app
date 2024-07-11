import {Photo, Step} from '@rcd/entities';
import {schema} from 'normalizr';
import {prop} from 'ramda';

const idAttribute = (photo: Photo, step: Step) => {
  return photo.photo_id || `${step.id}-${photo.order}`;
};

const relations = {};

const photoSchema = new schema.Entity('photos', relations, {
  idAttribute,
  processStrategy: (photo: Photo, step: Step) => ({
    ...photo,
    photo_id: photo.photo_id || `${prop('id', step)}-${prop('order', photo)}`,
  }),
});

export default photoSchema;
