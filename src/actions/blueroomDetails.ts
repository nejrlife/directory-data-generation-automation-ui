import { BLUEROOM_DETAILS } from '../sagas/constants';

export function blueroomDetails(payload: any) {
  return {
    type: BLUEROOM_DETAILS,
    payload: payload
  }
}