import { View, StyleSheet, Text } from '@react-pdf/renderer'
import React from 'react'
import type { Intervention } from 'src/modules/interventions/db/models'
import Table from 'src/modules/udm/components/pdf-components/table'

type Props = {
  interventions: Intervention[]
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

export function ConditionsTemplate({ interventions }: Props) {
  const columns = [
    { name: 'Name', dataIndex: 'interventionType', width: '20%' },
    { name: 'Starting Measurement', dataIndex: 'currentStage', width: '20%' },
    {
      name: 'Starting Milestone',
      dataIndex: 'startingMilestone',
      width: '20%',
    },
    { name: 'Current Milestone', dataIndex: 'currentMilestone', width: '20%' },
    { name: 'Status', dataIndex: 'interventionStatus', width: '20%' },
  ]

  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>Current interventions</Text>
      <Table columns={columns} data={interventions} />
    </View>
  )
}

export default ConditionsTemplate
