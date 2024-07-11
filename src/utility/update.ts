import {Context} from 'immutability-helper';
import {omit, without} from 'ramda';

const myContext = new Context();

myContext.extend('$without', without);
myContext.extend('$omit', omit);

export default myContext.update;
