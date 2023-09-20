import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import Table from 'src/modules/udm/components/pdf-components/table'

type Props = {
  labsAndVitalsData: {
    labs: any[]
    vitals: any[]
  }
  columns: any[]
}

export function LabsAndVitalsTemplate({ labsAndVitalsData, columns }: Props) {
  return (
    <View>
      <View style={styles.tablesSection} wrap={false}>
        <Text style={styles.tableTitle}>Vitals Report</Text>
        <Table data={labsAndVitalsData.vitals} columns={columns} />
      </View>
      <View style={styles.tablesSection} wrap={false}>
        <Text style={styles.tableTitle}>Lab Report</Text>
        <Table data={labsAndVitalsData.labs} columns={columns} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tableTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: 'rgb(55, 48, 163)',
    paddingLeft: 10,
  },
  tablesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})

export default LabsAndVitalsTemplate
