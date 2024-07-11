import {schema} from 'normalizr';
import machineSchema from './Machine';
import stepSchema from './Step';

const idAttribute = 'checklist_id';
const relations = {
  machine: machineSchema,
  steps: [stepSchema],
};

const checklistSchema = new schema.Entity('checklists', relations, {
  idAttribute,
});

export default checklistSchema;
