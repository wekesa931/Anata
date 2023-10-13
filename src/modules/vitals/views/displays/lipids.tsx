import React, { useEffect, useState } from 'react'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import Table from 'src/components/table/data-table'

const columns: any = [
  {
    id: 'day',
    label: 'Date',
    sortable: true,
    type: 'date',
  },
  {
    id: 'total_cholesterol',
    label: 'TC',
    units: 'mg/dL',
    sortable: true,
  },
  {
    id: 'hdl',
    label: 'HDL',
    units: 'mg/dL',
    sortable: true,
  },
  {
    id: 'ldl',
    label: 'LDL',
    units: 'mg/dL',
    sortable: true,
  },
  {
    id: 'triglyceride',
    label: 'TG',
    units: 'mg/dL',
    sortable: true,
  },
  {
    id: 'lipid_panel_test_type',
    label: 'T.T',
    units: 'F/NF',
  },
]

function LipidsTable() {
  const { isLoading, getLipidsClusters } = useClustersData()
  const [lipids, setLipids] = useState<any[]>([])

  useEffect(() => {
    getLipidsClusters().then((data) => {
      setLipids(data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading Lipids Data ..." />
        </div>
      ) : (
        <div>
          <div>
            <Table
              columns={columns}
              data={lipids}
              title="lipids"
              defaultSortColumn="day"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LipidsTable
