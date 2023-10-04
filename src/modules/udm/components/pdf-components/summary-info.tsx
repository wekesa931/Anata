import { View, StyleSheet, Text } from '@react-pdf/renderer'
import React from 'react'
import { Divider } from 'src/modules/udm/components/pdf-components/divider'

type Props = {
  nextActions?: string
  additionalInsights?: string
}

const styles = StyleSheet.create({
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: 'rgb(55, 48, 163)',
    paddingLeft: 10,
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 14,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 14,
    width: '120pt',
    textAlign: 'left',
  },
  textContainer: {
    flex: 1,
    whiteSpace: 'wrap',
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
})
export function SummaryInfo({ additionalInsights, nextActions }: Props) {
  const hasSummary = additionalInsights || nextActions

  return (
    <View>
      {hasSummary && (
        <View>
          <Divider />
          <Text style={styles.summaryTitle}>Antara Summary</Text>
          {additionalInsights && (
            <View style={styles.summaryItem}>
              <Text style={styles.infoLabel}>Additional Insights:</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{additionalInsights}</Text>
              </View>
            </View>
          )}
          {nextActions && (
            <View style={styles.summaryItem}>
              <Text style={styles.infoLabel}>Next Actions:</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{nextActions}</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}
