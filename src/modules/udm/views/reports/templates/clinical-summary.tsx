import { Text, View, StyleSheet } from '@react-pdf/renderer'
import React from 'react'

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: 'rgb(55, 48, 163)',
    paddingLeft: 10,
  },
  header: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'left',
    width: '100pt',
    paddingLeft: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  listing: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export function clinicalSummaryTemplate({ clinicalData }: any) {
  const { alergies, fh, surgeries, pmh } = clinicalData
  const [medication, food] = alergies

  return (
    <View>
      <Text style={styles.title}>Clinical Summary</Text>
      <View style={styles.header}>
        <View style={styles.item}>
          <Text style={styles.name}>Alergies: </Text>
          <View style={styles.listing}>
            <Text style={styles.text}>
              {' '}
              {medication || 'No known medication alergies'}
            </Text>
            <Text style={styles.text}> {food || 'No known food alergies'}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text style={styles.name}>FH: </Text>
          <View style={styles.listing}>
            <>
              {fh.length ? (
                <>
                  {fh.map((item: any, index: number) => (
                    <Text style={styles.text} key={index}>
                      {' '}
                      {item || ''}
                    </Text>
                  ))}
                </>
              ) : (
                <Text style={styles.text}> None</Text>
              )}
            </>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.name}>PSH: </Text>
          <View style={styles.listing}>
            <Text style={styles.text}> {surgeries || 'None'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>PMH: </Text>
        <View style={styles.listing}>
          {pmh.length ? (
            <>
              {pmh.map((item: any, index: number) => (
                <Text style={styles.text} key={index}>
                  {' '}
                  {item || ''}
                </Text>
              ))}
            </>
          ) : (
            <Text style={styles.text}> None</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default clinicalSummaryTemplate
