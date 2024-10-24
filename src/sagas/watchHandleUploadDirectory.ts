import { put, call } from "redux-saga/effects";
import {
  DIRECTORY_DETAILS_DATA_LOADER_START,
  DIRECTORY_DETAILS,
  DIRECTORY_DETAILS_DATA_LOADER_END
} from "./constants";
import { uploadDirectory } from './api/uploadDirectory'

interface ResponseGenerator{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

export function* watchHandleUploadDirectory(action: any) {
  yield put({
    type: DIRECTORY_DETAILS_DATA_LOADER_START
  });
  try {
    const response: ResponseGenerator = yield call(uploadDirectory, action?.payload);
    yield put({
      type: DIRECTORY_DETAILS,
      payload: {
        response
      },
    });
  } catch (err) {
    // err
  } finally {
    yield put({
      type: DIRECTORY_DETAILS_DATA_LOADER_END
    });
  }
}