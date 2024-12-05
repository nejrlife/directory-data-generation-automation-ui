import { put, call } from "redux-saga/effects";
import {
  DIRECTORY_DETAILS_DATA_LOADER_START,
  DIRECTORY_DETAILS,
  DIRECTORY_DETAILS_DATA_LOADER_END,
  DIRECTORY_DETAILS_FETCH_ERROR
} from "./constants";
import { uploadDirectory } from './api/uploadDirectory'
import { ResponseGenerator } from "../types";


export function* watchHandleUploadDirectory(action: any) {
  yield put({
    type: DIRECTORY_DETAILS_DATA_LOADER_START
  });
  try {
    const response: ResponseGenerator = yield call(uploadDirectory, action?.payload);
    const errorMessage = response?.data?.errorMessage;
    if (errorMessage) {
      yield put({
        type: DIRECTORY_DETAILS_FETCH_ERROR,
        payload: {
          errorMessage
        },
      });
    } else {
      yield put({
        type: DIRECTORY_DETAILS,
        payload: {
          response
        },
      });
    }
  } catch (err) {
    // err
  } finally {
    yield put({
      type: DIRECTORY_DETAILS_DATA_LOADER_END
    });
  }
}