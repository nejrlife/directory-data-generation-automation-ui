import { call } from "redux-saga/effects";
import * as XLSX from 'xlsx';

// const sagaUtils = useSagaUtilsSingleton();
// const MOCK_TIME_BOUND_MIN = 500;
// const MOCK_TIME_BOUND_MAX = 2000;
interface ResponseGenerator{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

function readFileAsArrayBuffer(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let data = undefined;
      const result = event?.target?.result;
      if (result && result instanceof ArrayBuffer) {
        data = new Uint8Array(result);
      }
      if (!data) {
        return;
      }
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json_object = XLSX.utils.sheet_to_json(sheet);
      resolve(json_object);
    };
    reader.onerror = function(ex) {
      console.log('ERROR');
      console.log(ex);
      reject(ex);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function* uploadBlueroom(payload: any) {
  const file = payload.file;
  const data: ResponseGenerator = yield call(readFileAsArrayBuffer, file)
  return data;
}