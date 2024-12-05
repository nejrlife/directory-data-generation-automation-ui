import { put, call } from "redux-saga/effects";
import {
  BLUEROOM_DETAILS_DATA_LOADER_START,
  BLUEROOM_DETAILS,
  BLUEROOM_DETAILS_DATA_LOADER_END,
  BLUEROOM_DETAILS_FETCH_ERROR
} from "./constants";
import { uploadBlueroom } from './api/uploadBlueroom'
import { ResponseGenerator } from "../types"

export function* watchHandleUploadBlueroom(action: any) {
  yield put({
    type: BLUEROOM_DETAILS_DATA_LOADER_START
  });
  try {
    const response: ResponseGenerator = yield call(uploadBlueroom, action?.payload);
    const errorMessage = response?.data?.errorMessage;
    if (errorMessage) {
      yield put({
        type: BLUEROOM_DETAILS_FETCH_ERROR,
        payload: {
          errorMessage
        },
      });
    } else {
      yield put({
        type: BLUEROOM_DETAILS,
        payload: {
          response
        },
      });
    }
  } catch (err) {
    // err
  } finally {
    yield put({
      type: BLUEROOM_DETAILS_DATA_LOADER_END
    });
  }
}