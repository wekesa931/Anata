import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#182c4c',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    position: 'relative',
  },
})

export function Divider() {
  return (
    <>
      <View style={styles.divider} />
    </>
  )
}

export default Divider
