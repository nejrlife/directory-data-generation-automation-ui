import { call } from "redux-saga/effects";
import * as XLSX from 'xlsx';
import { ResponseGenerator } from "../../types";
import { every, includes } from "lodash";
import { getTableUtilsSingleton } from "../../common/utils/tableUtilsSingleton";
import { EXPORT_SHEET_RELEVANT_COLS } from "../../constants";

const tableUtils = getTableUtilsSingleton();

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
      const excelColumnHeaders = tableUtils.getTableColumnHeadersAsString(json_object);
      if (excelColumnHeaders?.length > 0) {
        if (!every(EXPORT_SHEET_RELEVANT_COLS, item => {
          console.log(item);
          console.log(includes(excelColumnHeaders, item));
          return includes(excelColumnHeaders, item)
        })) {
          resolve({
            data: {
              errorMessage: "ColErr"
            }
          });
        }
      }
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