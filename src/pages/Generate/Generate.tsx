import "./Generate.css";
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { directoryDetails } from "../../actions/directoryDetails";
import { blueroomDetails } from "../../actions/blueroomDetails";
import { useNavigate } from "react-router-dom";
import { BLUEROOM_DETAILS_FETCH, DIRECTORY_DETAILS_FETCH } from "../../sagas/constants";

const Generate = (props: any) => {

  const navigate = useNavigate();
  const [directoryEmps, setDirectoryEmps] = useState<any[]>([]);
  const [blueroomEmps, setBlueroomEmps] = useState<any[]>([]);
  const [directoryEmpsTableOpen, setDirectoryEmpsTableOpen] = useState<boolean>(false);
  const [blueroomTableOpen, setBlueroomTableOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onUpload = async (event: any) => {
    const file = event.files[0];
    dispatch({
      type: DIRECTORY_DETAILS_FETCH,
      payload: {
        file
      }
    });
  }

  const onUploadBlueroom = async (event: any) => {
    const file = event.files[0];
    dispatch({
      type: BLUEROOM_DETAILS_FETCH,
      payload: {
        file
      }
    });
  }

  const onProceed = () => {
    navigate('/proceed');
  }

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

  return (
    <>
      <Dialog header="List of sponsored by RROCKWE table" visible={directoryEmpsTableOpen} style={{ width: '50vw' }} onHide={() => {if (!directoryEmpsTableOpen) return; setDirectoryEmpsTableOpen(false); }}>   
        <DataTable value={directoryEmps} scrollable scrollHeight="200px">
          <Column field="name" header="name"></Column>
          <Column field="cuid" header="cuid"></Column>
          <Column field="company" header="company"></Column>
        </DataTable>
      </Dialog>
      <Dialog header="Raw data from Blueroom table" visible={blueroomTableOpen} style={{ width: '50vw' }} onHide={() => {if (!blueroomTableOpen) return; setBlueroomTableOpen(false); }}>   
        <DataTable value={blueroomEmps} scrollable scrollHeight="200px">
          <Column field="PractitionerName" header="PractitionerName"></Column>
          <Column field="Lumen CUID" header="Lumen CUID"></Column>
        </DataTable>
      </Dialog>
      <Splitter style={{ height: '500px' }} layout="vertical">
        <SplitterPanel size={90}>
          <div className='splitterUp'>
            <div className='left'>
              <Panel header="List of sponsored by RROCKWE">
                {directoryEmps && directoryEmps.length > 0 ?
                  (
                    <div className="uploaded-file">
                      <p>File has been uploaded</p>
                      <i onClick={() => setDirectoryEmpsTableOpen(true)} className="pi pi-eye"></i>
                      <i className="pi pi-times"></i>
                    </div>
                  ) :
                  (<>
                    <p>
                        Click to fetch the File in Directory Corp
                    </p>
                  </>)
                }
                <div className="fetch-spinner">
                  <FileUpload
                    disabled={props.stateDirectoryPending || props.stateBlueroomPending || (directoryEmps && directoryEmps.length > 0)}
                    mode="basic"
                    name="xlsFile"
                    accept=".xlsx"
                    uploadHandler={onUpload}
                    auto
                    customUpload={true}
                    chooseLabel="Fetch" />
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
                      <i className="pi pi-times"></i>
                    </div>
                  ) :
                  (
                    <>
                      <p>
                        Click to fetch the File which has Raw data
                      </p>
                    </>
                  )
                }
                <div className="fetch-spinner">
                  <FileUpload
                    disabled={props.stateDirectoryPending || props.stateBlueroomPending || (blueroomEmps && blueroomEmps.length > 0)}
                    mode="basic"
                    name="xlsFile"
                    accept=".xlsx"
                    uploadHandler={onUploadBlueroom}
                    auto
                    customUpload={true}
                    chooseLabel="Fetch" />
                  {props.stateBlueroomPending &&
                    (<span>Loading...</span>)
                  }
                </div>
              </Panel>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel size={10} minSize={10}>
          <div className='splitterDown'>
            <div className='splitterDownButtons'>
              <Button disabled={directoryEmps?.length === 0 || blueroomEmps?.length === 0} onClick={onProceed}label="Proceed" />
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </>
  )
}

const mapStateToProps = (state:any) => ({
  stateDirectoryEmps: state.app.emps,
  stateDirectoryPending: state.app.empsPending,
  stateBlueroomEmps: state.app.blueroomEmps,
  stateBlueroomPending: state.app.blueroomPending
});
const mapDispatchToProps  = (dispatch:any) => ({
  setDirectoryDetails: (payload: any) => dispatch(directoryDetails(payload)),
  setBlueroomDetails: (payload: any) => dispatch(blueroomDetails(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Generate);