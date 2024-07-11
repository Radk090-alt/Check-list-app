import {schema} from 'normalizr';

const idAttribute = 'id';
const relations = {};

const machineSchema = new schema.Entity('machines', relations, {
  idAttribute,
});

export default machineSchema;
