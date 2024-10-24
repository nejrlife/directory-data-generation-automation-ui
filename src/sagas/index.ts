import { takeLeading } from "redux-saga/effects";
import * as actions from "./constants";
import { watchHandleProcessData } from "./watchHandleProcessData";
import { watchHandleUploadBlueroom } from "./watchHandleUploadBlueroom";
import { watchHandleUploadDirectory } from "./watchHandleUploadDirectory";


function* dataSaga() {
  yield takeLeading (actions.PROCESS_DATA, watchHandleProcessData);
  yield takeLeading (actions.BLUEROOM_DETAILS_FETCH, watchHandleUploadBlueroom);
  yield takeLeading (actions.DIRECTORY_DETAILS_FETCH, watchHandleUploadDirectory);
}

export default dataSaga;