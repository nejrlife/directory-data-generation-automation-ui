import { put, call } from "redux-saga/effects";
import {
  BLUEROOM_DETAILS_DATA_LOADER_START,
  BLUEROOM_DETAILS,
  BLUEROOM_DETAILS_DATA_LOADER_END
} from "./constants";
import { uploadBlueroom } from './api/uploadBlueroom'

interface ResponseGenerator{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

export function* watchHandleUploadBlueroom(action: any) {
  yield put({
    type: BLUEROOM_DETAILS_DATA_LOADER_START
  });
  try {
    const response: ResponseGenerator = yield call(uploadBlueroom, action?.payload);
    yield put({
      type: BLUEROOM_DETAILS,
      payload: {
        response
      },
    });
  } catch (err) {
    // err
  } finally {
    yield put({
      type: BLUEROOM_DETAILS_DATA_LOADER_END
    });
  }
}