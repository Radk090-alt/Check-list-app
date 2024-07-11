import {schema} from 'normalizr';

const idAttribute = 'id';
const relations = {};

const categorySchema = new schema.Entity('categories', relations, {
  idAttribute,
});

export default categorySchema;
