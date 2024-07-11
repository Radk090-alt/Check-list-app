import {schema} from 'normalizr';
import photoSchema from './Photo';

const idAttribute = 'id';
const relations = {
  photos: [photoSchema],
};

const stepSchema = new schema.Entity('steps', relations, {
  idAttribute,
});

export default stepSchema;
