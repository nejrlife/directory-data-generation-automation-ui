/* eslint-disable no-unsafe-optional-chaining */
import * as actions from "./sagas/constants";
import { AppDetails } from "./types"

const INITIAL_STATE : AppDetails = {
  progressSpinnerShow: false,
  processDataPending: false,
  emps: [],
  empsPending: false,
  blueroomEmps: [],
  blueroomPending: false,
  filteredSponsoredEmps: [],
  admUnsponsoredEmps: [],
  nonBlueroomIbmEmps: []
}

export default function appReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case actions.PROCESS_DATA_SUCCESS_SPONSORED:
      return {
        ...state,
        filteredSponsoredEmps: [...action.payload.filteredSponsoredEmps],
      };
    case actions.PROCESS_DATA_SUCCESS_NON_BLUEROOM:
      return {
        ...state,
        nonBlueroomIbmEmps: [...action.payload.nonBlueroomIbmEmps],
      };
    case actions.PROCESS_DATA_SUCCESS_ADM_UNSPONSORED:
      return {
        ...state,
        admUnsponsoredEmps: [...action.payload.admUnsponsoredEmps],
      };
    case actions.BLUEROOM_DETAILS:
      return {
        ...state,
        blueroomEmps: [...action?.payload?.response],
      };
    case actions.BLUEROOM_DETAILS_DATA_LOADER_START:
      return {
        ...state,
        blueroomPending: true,
      };
    case actions.BLUEROOM_DETAILS_DATA_LOADER_END:
      return {
        ...state,
        blueroomPending: false,
      };
    case actions.DIRECTORY_DETAILS:
      return {
        ...state,
        emps: [...action?.payload?.response],
      };
    case actions.DIRECTORY_DETAILS_DATA_LOADER_START:
      return {
        ...state,
        empsPending: true,
      };
    case actions.DIRECTORY_DETAILS_DATA_LOADER_END:
      return {
        ...state,
        empsPending: false,
      };
    case actions.PROCESS_DATA_LOADER_START:
      return {
        ...state,
        processDataPending: true,
      };
    case actions.PROCESS_DATA_LOADER_END:
      return {
        ...state,
        processDataPending: false,
      };
    default:
      return state;
  }
}