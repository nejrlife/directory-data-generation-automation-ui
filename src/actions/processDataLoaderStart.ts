import { PROCESS_DATA_LOADER_START } from '../sagas/constants';

export function processDataLoaderStart() {
  return {
    type: PROCESS_DATA_LOADER_START
  }
}