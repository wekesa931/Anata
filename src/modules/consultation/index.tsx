import React, { useEffect, useState } from 'react'

import analytics from 'src/config/analytics'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import logError from 'src/utils/logging/logger'
import DataTable, { Column } from 'src/components/table/data-table'
import filterFields from 'src/utils/airtable/field-utils'
import { useRefreshTrigger } from 'src/context/refresh-trigger'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from 'src/modules/vitals/views/displays/data';

const COLUMNS: Column[] = [
  { id: 'Date of Consultation', label: 'Date', sortable: true, type: 'date' },
  { id: 'Primary Diagnosis', label: 'Primary Diagnosis' },
  { id: 'Plan', label: 'Plan' },
]

function Consultation() {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  const getConsultation = async () => {
    const allowedFields = [
      'Temperature (C)',
      'Any Medication Allergies',
      'Plan',
      'Date of Consultation',
      'Please select the system(s) with a relevant finding',
      'Chief Complaint',
      'Assessment',
      'Secondary Diagnosis',
      'Interaction type',
      'Next appointment',
      'Were you able to conduct a Physical Examination?',
      'Primary Diagnosis',
      'Please write in any additional comments or observation you think are important',
      'PE GASTROINTESTINAL findings',
      'LMP',
      'Consultation Type',
      'Consultation type - billing',
      'Sick days required',
      'Appointments',
      'Minor',
      'Initial vs FU',
      'Summary',
      'Created',
      'Record ID (from Appointments)',
      'Status (from Appointments)',
      "Doctor's Name",
      'Kenya National ID Number (from Member)',
      'created_by',
      'PMH',
    ]
    try {
      setLoading(true)
      const memberConsultation = await airtableFetch(
        `clinicalconsultation/list?&filterByFormula=FIND("${
          member?.antaraId
        }", {Antara ID (from Member)})&${filterFields(allowedFields)}`
      )
      const mappedResponses = Object.keys(memberConsultation).map((key) => {
        const parent = memberConsultation[key]
        Object.keys(parent).forEach((pointer) => {
          if (
            Object.prototype.toString.call(parent[pointer]) === '[object Array]'
          )
            parent[pointer] = parent[pointer].join(',')
        })
        return parent
      })
      setconsultationData(mappedResponses)
    } catch (e: any) {
      logError(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    analytics.track('Clinical Consultation Opened')

    if (member?.antaraId) {
      getConsultation()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    if (refreshKey.includes('Consultation')) {
      getConsultation()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

//   let dara = [
//     {
//         TaskID: 1,
//         TaskName: 'Project Initiation',
//         StartDate: new Date('04/02/2024'),
//         EndDate: new Date('04/21/2019'),
//         subtasks: [
//             { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
//             { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50  },
//             { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
//         ]
//     },
//     {
//         TaskID: 5,
//         TaskName: 'Project Estimation',
//         StartDate: new Date('04/02/2019'),
//         EndDate: new Date('04/21/2019'),
//         subtasks: [
//             { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
//             { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
//             { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
//         ]
//     }];
// let taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };

  let ganttInstance: GanttComponent;
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID:'ParentId'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings:any= {
      columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const onCreated=(): void=>{
    if(document.querySelector('.e-bigger'))
        {
            ganttInstance.rowHeight=48;
            ganttInstance.taskbarHeight=28;
        }
  }
  return error ? (
    <ErrorRetry retry={getConsultation} />
  ) : (
    // <DataTable
    //   columns={COLUMNS}
    //   data={consultationData}
    //   defaultSortColumn="Date of Consultation"
    //   title="Engagement Details"
    //   loading={loading}
    //   loadingContext={
    //     refreshKey.includes('Consultation') ? refreshKey : undefined
    //   }
    //   filterByDate
    //   dateColumnKey="Date of Consultation"
    //   defaultFilterColumn="Date of Consultation"
    // />
    <>
    <h1 className="text-xl text-[#444] font-rubik font-medium">Chronic Care Engagement Plan</h1>
    <div className='control-pane mb-4'>
      <div className='control-section'>
        <GanttComponent id='Default' ref={(gantt: any) => ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
          taskFields={taskFields} splitterSettings={splitterSettings} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} created={onCreated}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
    </div>
    </>
    
  )
}

export default Consultation
