import {identity, pathOr} from 'ramda';
import {createSelector, createStructuredSelector} from 'reselect';

interface QueuedItem {
  type: string;
  payload: any;
}

interface Selection {
  isProcessing: boolean;
  items: QueuedItem[];
}

const selectIsProcessing = pathOr(false, ['queue', 'isProcessing']);
const selectItems = pathOr([], ['queue', 'items']);

export default createStructuredSelector<Record<string, unknown>, Selection>({
  isProcessing: createSelector(selectIsProcessing, identity),
  items: createSelector(selectItems, identity),
});
