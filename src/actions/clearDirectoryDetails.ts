import { DIRECTORY_DETAILS_CLEAR } from '../sagas/constants';

export function clearDirectoryDetails() {
  return {
    type: DIRECTORY_DETAILS_CLEAR,
  }
}