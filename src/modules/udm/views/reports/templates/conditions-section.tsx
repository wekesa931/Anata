import { View, StyleSheet, Text } from '@react-pdf/renderer'
import React from 'react'
import Table from 'src/modules/udm/components/pdf-components/table'

type Props = {
  conditions: any[]
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: 'rgb(55, 48, 163)',
    paddingLeft: 10,
  },
})

export function ConditionsTemplate({ conditions }: Props) {
  const columns = [
    { name: 'Condition', dataIndex: 'condition', width: '40%' },
    { name: 'Current Stage', dataIndex: 'currentStage', width: '30%' },
    { name: 'Date', dataIndex: 'dateOfDiagnosis', width: '30%' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnosed Conditions</Text>
      <Table columns={columns} data={conditions} width="70%" />
    </View>
  )
}

export default ConditionsTemplate
