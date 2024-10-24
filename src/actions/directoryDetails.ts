import { DIRECTORY_DETAILS } from '../sagas/constants';

export function directoryDetails(payload:any) {
  return {
    type: DIRECTORY_DETAILS,
    payload: payload
  }
}