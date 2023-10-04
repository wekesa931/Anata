import React, { useEffect, useState } from 'react'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import Table from 'src/modules/vitals/components/table'

const columns: any = [
  {
    id: 'day',
    label: 'Date',
  },
  {
    id: 'total_cholesterol',
    label: 'TC',
    units: 'mg/dL',
  },
  {
    id: 'hdl',
    label: 'HDL',
    units: 'mg/dL',
  },
  {
    id: 'ldl',
    label: 'LDL',
    units: 'mg/dL',
  },
  {
    id: 'triglyceride',
    label: 'TG',
    units: 'mg/dL',
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
            <Table columns={columns} data={lipids} title="lipids" />
          </div>
        </div>
      )}
    </div>
  )
}

export default LipidsTable
