import "./Proceed.css";
import { connect, useDispatch } from "react-redux";
import { Panel } from 'primereact/panel';
import { useEffect, useState } from 'react';
import { map, pick, mapKeys } from 'lodash'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from "primereact/dropdown";
import { PROCESS_DATA } from "../../sagas/constants";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { EXPORT_SHEET_RELEVANT_COLS, EXPORT_SHEET_NONBR_RELEVANT_COLS } from '../../constants';
import { ColorRing } from "react-loader-spinner";

const Proceed = (props: any) => {
  const [filteredSponsoredEmps, setFilteredSponsoredEmps] = useState<any[]>([]);
  const [nonBlueroomIbmEmps, setNonBlueroomIbmEmps] = useState<any[]>([]);
  const [nonSponsoredButAdmEmps, setNonSponsoredButAdmEmps] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [processDataPending, setProcessDataPending] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("Sponsored");
  const navigate = useNavigate();

  const renameHeader = (key: string) => {
    if (key === 'Serial Number') return 'C-NUM';
    if (key === 'PractitionerName') return 'Project Assignee Name'; // Renaming PracticionerName to Name
    if (key === 'Project Assignee Status') return 'STATUS';
    if (key === 'Project Assignee E-Mail') return 'IBM email address';
    if (key === 'Project Name') return 'Tower';
    if (key === 'Sub Tower') return 'SUB-TOWER';
    return key;
  }

  const renameCorpHeader = (key: string) => {
    if (key === 'name') return 'Name';
    if (key === 'cuid') return 'Lumen CUID'; // Renaming PracticionerName to Name
    if (key === 'company') return 'Company';
    return key;
  }
  
  useEffect(() => {
    if (props.stateFilteredSponsoredEmps?.length >= 1) {
      const filteredData: any = map(props.stateFilteredSponsoredEmps, item => {
          const picked = pick(item, EXPORT_SHEET_RELEVANT_COLS)
          return mapKeys(picked, (__, key) => {
            return renameHeader(key);
          })
        }
      );
      setProcessDataPending(false);
      setFilteredSponsoredEmps(filteredData);
    }
  }, [props.stateFilteredSponsoredEmps]);

  useEffect(() => {
    if (props.stateAdmUnsponsoredEmps?.length >= 1) {
      const filteredData: any = map(props.stateAdmUnsponsoredEmps, item => {
          const picked = pick(item, EXPORT_SHEET_RELEVANT_COLS)
          return mapKeys(picked, (__, key) => {
            return renameHeader(key);
          })
        }
      );
      setNonSponsoredButAdmEmps(filteredData);
    }
  }, [props.stateAdmUnsponsoredEmps]);

  useEffect(() => {
    if (props.stateNonBlueroomIbmEmps?.length >= 1) {
      const filteredData: any = map(props.stateNonBlueroomIbmEmps, item => {
          const picked = pick(item, EXPORT_SHEET_NONBR_RELEVANT_COLS)
          return mapKeys(picked, (__, key) => {
            return renameCorpHeader(key);
          })
        }
      );
      setNonBlueroomIbmEmps(filteredData);
    }
  }, [props.stateNonBlueroomIbmEmps]);

  useEffect(() => {
    if (props.stateEmps?.length >= 1 && props.stateBlueroomEmps?.length >= 1) {
      if (props.stateFilteredSponsoredEmps?.length < 1) {
        dispatch({
          type: PROCESS_DATA
        });
      }
    } else {
      navigate('/generate');
    }
    
  }, [props.stateEmps, props.stateBlueroomEmps, props.stateFilteredSponsoredEmps, dispatch, navigate]);

  const onExport = () => {
    const admData = [...filteredSponsoredEmps];
    const nonBlueroomIbmData = [...nonBlueroomIbmEmps];
    const nonAdmData = [...nonSponsoredButAdmEmps];

    const worksheetAdm = XLSX.utils.json_to_sheet(admData);
    worksheetAdm['!cols'] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 }
    ];
    const worksheetNonblueroomIbm = XLSX.utils.json_to_sheet(nonBlueroomIbmData);
    worksheetNonblueroomIbm['!cols'] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    const worksheetNonAdm = XLSX.utils.json_to_sheet(nonAdmData);
    worksheetNonAdm['!cols'] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 }
    ];
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheetAdm, 'Sponsored by RROCKWE');
    XLSX.utils.book_append_sheet(workbook, worksheetNonblueroomIbm, 'Sponsored, non-blueroom');
    XLSX.utils.book_append_sheet(workbook, worksheetNonAdm, 'Blueroom, non-sponsored');
    // Generate and download the Excel file
    XLSX.writeFile(workbook, 'ADM-and-NonADM-sponsored-list.xlsx');
  }

  const headerTemplate = (options: any) => {
    const { className, titleElement, titleClassName, toggleable, collapsed, onToggle } = options;
    const filters = ["Sponsored", "Sponsored Non-Blueroom", "Non-Sponsored ADM"];
    return (
      <div className={className} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={titleClassName} style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Final Output, Blueroom list sponsored by RROCKWE
        </span>
        {/* <span className={titleClassName} style={{ fontSize: '16px' }}></span> */}
        <Dropdown value={selectedFilter} onChange={(e) => setSelectedFilter(e.value)} options={filters} optionLabel="name" 
          placeholder="Select a filter" className="w-full md:w-14rem" />
        <Button onClick={onExport} label="Export as XLS" />
      </div>
    );
  };

  const empsToUse = selectedFilter === 'Sponsored' ?
    filteredSponsoredEmps :
    (selectedFilter === 'Non-Sponsored' ? [] : nonSponsoredButAdmEmps);
  return (
    <>
      <Panel headerTemplate={headerTemplate} toggleable>
        {!processDataPending ?
          empsToUse?.length > 0 ?
            (<>
              <p>Placeholder</p>
            </>) :
            (<>
              <p>
                No Data present
              </p>
            </>) :
          (<>
            <p>
              Loading result...
            </p>
            {(<ColorRing
              height={50}
              width={50}
              // wrapperStyle={
              //   {
              //     'position': 'fixed',
              //     'top': '40%',
              //     'left': '50%',
              //     'zIndex': '9999',
              //     'transition': 'opacity 0.2s',
              //     'visibility': 'visible',
              //     'opacity': '1'
              //   }
              // }
              colors={['#00CCCC', '#00CCCC', '#00CCCC', '#00CCCC', '#00CCCC']}
            />)/* <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> */}
          </>)
        }
      </Panel>
    </>
  )
}

const mapStateToProps = (state:any) => ({
  stateEmps: state.app.emps,
  stateBlueroomEmps: state.app.blueroomEmps,
  stateFilteredSponsoredEmps: state.app.filteredSponsoredEmps,
  stateAdmUnsponsoredEmps: state.app.admUnsponsoredEmps,
  stateNonBlueroomIbmEmps: state.app.nonBlueroomIbmEmps
});
// const mapDispatchToProps  = (dispatch:any) => ({
//   startProcessDataLoader: () => dispatch(processDataLoaderStart()),
//   endProcessDataLoader: () => dispatch(processDataLoaderEnd())
// });
export default connect(mapStateToProps, null)(Proceed);