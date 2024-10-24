import { PROCESS_DATA_LOADER_END } from '../sagas/constants';

export function processDataLoaderEnd() {
  return {
    type: PROCESS_DATA_LOADER_END
  }
}