import { put, select } from "redux-saga/effects";
import {
  PROCESS_DATA_LOADER_START,
  PROCESS_DATA_LOADER_END,
  PROCESS_DATA_SUCCESS_SPONSORED,
  PROCESS_DATA_SUCCESS_ADM_UNSPONSORED,
  PROCESS_DATA_SUCCESS_NON_BLUEROOM
} from "./constants";
import { filter, uniq, map, includes, partition } from "lodash";
import { ResponseGenerator } from "../types";

export function* watchHandleProcessData(action: any) {
  yield put({
    type: PROCESS_DATA_LOADER_START
  });
  const blueroomEmps: ResponseGenerator = yield select((s: any) => {
    return s?.app?.blueroomEmps
  });
  const filteredBlueroomEmps = filter(blueroomEmps, obj => {
    const status = obj["Project Assignee Status"]?.toLowerCase();
    return status === "on-boarding" || status === "on-boarded";
  });
  const emps: ResponseGenerator = yield select((s: any) => {
    return s?.app?.emps
  });
  const ibmEmps = filter(emps, { company: '(PW) IBM' });
  const uniqueCuids = uniq(map(ibmEmps, item => item.cuid.toLowerCase()));
  const [filteredSponsered, filteredUnsponsored] = partition(filteredBlueroomEmps, item => {
    return includes(uniqueCuids, item["Lumen CUID"]?.trim().toLowerCase())
  });
  const admTowers = ['bss', 'oss', 'pase', 'pase/dba', 'pmo', 'smo'];
  const admSubTowers = ['ewas', 'ewas implementation- snow'];
  const admUnsponsoredEmps = filter(filteredUnsponsored, item => {
    return includes(admTowers, item["Project Name"]?.trim().toLowerCase()) || includes(admSubTowers, item["Sub Tower"]?.trim().toLowerCase())
  });
  const uniqueBlueroomCuids = uniq(map(filteredBlueroomEmps, item => item["Lumen CUID"]?.trim().toLowerCase()));
  const nonBlueroomIbmEmps = filter(ibmEmps, item => {
    return !includes(uniqueBlueroomCuids, item["cuid"]?.trim().toLowerCase())
  });

  yield put({
    type: PROCESS_DATA_SUCCESS_SPONSORED,
    payload: {
      filteredSponsoredEmps: filteredSponsered,
    },
  });
  yield put({
    type: PROCESS_DATA_SUCCESS_NON_BLUEROOM,
    payload: {
      nonBlueroomIbmEmps,
    },
  });
  yield put({
    type: PROCESS_DATA_SUCCESS_ADM_UNSPONSORED,
    payload: {
      admUnsponsoredEmps,
    },
  });
  yield put({
    type: PROCESS_DATA_LOADER_END
  });
}