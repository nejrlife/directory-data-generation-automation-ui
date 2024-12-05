import "./Generate.css";
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from "react-redux";
import { clearDirectoryDetails } from "../../actions/clearDirectoryDetails";
import { clearBlueroomDetails } from "../../actions/clearBlueroomDetails";
import { useNavigate } from "react-router-dom";
import { BLUEROOM_DETAILS_FETCH, DIRECTORY_DETAILS_FETCH } from "../../sagas/constants";
import {
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table'
import SimpleTable from "../../components/SimpleTable/SimpleTable";
import { EXPORT_SHEET_RELEVANT_COLS, EXPORT_SHEET_NONBR_RELEVANT_COLS } from '../../constants';

const Generate = (props: any) => {
  const toastBC = useRef<Toast|null>(null);
  const frDirectoryRef = useRef<FileUpload|null>(null);
  const frBlueroomRef = useRef<FileUpload|null>(null);
  const navigate = useNavigate();
  const [directoryEmps, setDirectoryEmps] = useState<any[]>([]);
  const [blueroomEmps, setBlueroomEmps] = useState<any[]>([]);
  const [directoryEmpsTableOpen, setDirectoryEmpsTableOpen] = useState<boolean>(false);
  const [blueroomTableOpen, setBlueroomTableOpen] = useState<boolean>(false);
  
  // interface Practitioner {
  //   'PractitionerName': string
  //   'Lumen CUID': string
  // }

  const columnHelper = createColumnHelper<any>();
  const directoryColumnHelper = createColumnHelper<any>();
  const blueroomColumns = [
    columnHelper.accessor('Serial Number', {
      header: () => 'Serial Number',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('PractitionerName', {
      header: () => 'PractitionerName',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Lumen CUID', {
      header: () => 'Lumen CUID',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('LUMEN email address', {
      header: () => 'LUMEN email address',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Project Assignee Status', {
      header: () => 'Project Assignee Status',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Project Assignee E-Mail', {
      header: () => 'Project Assignee E-Mail',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Project Name', {
      header: () => 'Project Name',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Sub Tower', {
      header: () => 'Sub Tower',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
  ] as Array<ColumnDef<unknown, any>>

  const directoryColumns = [
    directoryColumnHelper.accessor('name', {
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    directoryColumnHelper.accessor('cuid', {
      header: () => 'cuid',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    directoryColumnHelper.accessor('company', {
      header: () => 'company',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
  ] as Array<ColumnDef<unknown, any>>

  const dispatch = useDispatch();

  const onUpload = async (event: any) => {
    const file = event.files[0];
    dispatch({
      type: DIRECTORY_DETAILS_FETCH,
      payload: {
        file
      }
    });
    if (frDirectoryRef.current) {
      frDirectoryRef.current.clear();
    }
  }

  const onUploadBlueroom = async (event: any) => {
    const file = event.files[0];
    dispatch({
      type: BLUEROOM_DETAILS_FETCH,
      payload: {
        file
      }
    });
    if (frBlueroomRef.current) {
      frBlueroomRef.current.clear();
    }
  }

  const onClearEmps = () => {
    props.clearDirectoryDetails();
    if (frDirectoryRef.current) {
      frDirectoryRef.current.clear();
    }
  }

  const onClearBlueroomEmps = () => {
    props.clearBlueroomDetails();
    if (frDirectoryRef.current) {
      frDirectoryRef.current.clear();
    }
  }

  const onProceed = () => {
    navigate('/proceed');
  }

  const showToast = (items: string[]) => {
    if (toastBC.current) {
      toastBC.current.show({
        severity: 'error',
        sticky: true,
        content: (
          <div>
            <p>Please upload an Excel file with the following headers:</p>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li> // Always use a unique `key` prop
              ))}
            </ul>
          </div>
        )
      });
    }
  };

  useEffect(() => {
    // if (props.stateBlueroomEmps?.length >= 1 && props.stateBlueroomEmps?.length >= 1) {
      setBlueroomEmps(props.stateBlueroomEmps);
    // }
  }, [props.stateBlueroomEmps]);

  useEffect(() => {
    // if (props.stateBlueroomEmps?.length >= 1 && props.stateBlueroomEmps?.length >= 1) {
      setDirectoryEmps(props.stateDirectoryEmps);
    // }
  }, [props.stateDirectoryEmps]);

  useEffect(() => {
    if (props.stateBlueroomError === "ColErr") {
      showToast(EXPORT_SHEET_RELEVANT_COLS);
    }
  }, [props.stateBlueroomError]);

  useEffect(() => {
    if (props.stateDirectoryError === "ColErr") {
      showToast(EXPORT_SHEET_NONBR_RELEVANT_COLS);
    }
  }, [props.stateDirectoryError]);

  return (
    <>
      <Toast ref={toastBC}/>
      <Dialog header="Please upload an XLSX file with the following column headers:" visible={directoryEmpsTableOpen} style={{ width: '50vw' }} onHide={() => {if (!directoryEmpsTableOpen) return; setDirectoryEmpsTableOpen(false); }}>   
        <SimpleTable tableData={directoryEmps} tableColumns={directoryColumns}/>
      </Dialog>
      <Dialog header="List of sponsored by RROCKWE table" visible={directoryEmpsTableOpen} style={{ width: '50vw' }} onHide={() => {if (!directoryEmpsTableOpen) return; setDirectoryEmpsTableOpen(false); }}>   
        <SimpleTable tableData={directoryEmps} tableColumns={directoryColumns}/>
      </Dialog>
      <Dialog header="Raw data from Blueroom table" visible={blueroomTableOpen} style={{ width: '50vw' }} onHide={() => {if (!blueroomTableOpen) return; setBlueroomTableOpen(false); }}>   
        <SimpleTable tableData={blueroomEmps} tableColumns={blueroomColumns}/>
      </Dialog>
      <div className="generate-div">
        <div>
          <div className='splitterUp'>
            <div className='left'>
              <Panel header="Corporate Directory Sponsored List">
                {directoryEmps && directoryEmps.length > 0 ?
                  (
                    <div className="uploaded-file">
                      <p>File has been uploaded</p>
                      <i onClick={() => setDirectoryEmpsTableOpen(true)} className="pi pi-eye"></i>
                      <i onClick={() => onClearEmps()} className="pi pi-times"></i>
                    </div>
                  ) :
                  (<>
                    <p>
                        Upload the Corporate Directory sponsored list XLS file
                    </p>
                  </>)
                }
                <div className="fetch-spinner">
                  <FileUpload
                    ref={frDirectoryRef}
                    disabled={props.stateDirectoryPending || props.stateBlueroomPending || (directoryEmps && directoryEmps.length > 0)}
                    mode="basic"
                    name="xlsFile"
                    accept=".xlsx"
                    uploadHandler={onUpload}
                    auto
                    customUpload={true}
                    chooseLabel="Fetch XLS file" />
                  {props.stateDirectoryPending &&
                    (<span>Loading...</span>)}
                </div>
              </Panel>
            </div>
            <div>
              <Divider layout="vertical" className='divide'/>
            </div>
            <div className='right'>
              <Panel header="Raw data from Blueroom">
                {blueroomEmps && blueroomEmps.length > 0 ?
                  (
                    <div className="uploaded-file">
                      <p>File has been uploaded</p>
                      <i onClick={() => setBlueroomTableOpen(true)} className="pi pi-eye"></i>
                      <i onClick={() => onClearBlueroomEmps()} className="pi pi-times"></i>
                    </div>
                  ) :
                  (
                    <>
                      <p>
                        Upload the Blueroom data XLS file
                      </p>
                    </>
                  )
                }
                <div className="fetch-spinner">
                  <FileUpload
                    ref={frBlueroomRef}
                    disabled={props.stateDirectoryPending || props.stateBlueroomPending || (blueroomEmps && blueroomEmps.length > 0)}
                    mode="basic"
                    name="xlsFile"
                    accept=".xlsx"
                    uploadHandler={onUploadBlueroom}
                    auto
                    customUpload={true}
                    chooseLabel="Fetch XLS file" />
                  {props.stateBlueroomPending &&
                    (<span>Loading...</span>)
                  }
                </div>
              </Panel>
            </div>
          </div>
        </div>
        <div>
          <div className='splitterDown'>
            <div className='splitterDownButtons'>
              <Button disabled={directoryEmps?.length === 0 || blueroomEmps?.length === 0} onClick={onProceed} label="Proceed" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state:any) => ({
  stateDirectoryEmps: state.app.emps,
  stateDirectoryPending: state.app.empsPending,
  stateDirectoryError: state.app.empsError,
  stateBlueroomEmps: state.app.blueroomEmps,
  stateBlueroomPending: state.app.blueroomPending,
  stateBlueroomError: state.app.blueroomError
});
const mapDispatchToProps  = (dispatch:any) => ({
  clearBlueroomDetails: () => dispatch(clearBlueroomDetails()),
  clearDirectoryDetails: () => dispatch(clearDirectoryDetails())
});
const ConnectedGenerate = connect(mapStateToProps, mapDispatchToProps)(Generate);
export default ConnectedGenerate;