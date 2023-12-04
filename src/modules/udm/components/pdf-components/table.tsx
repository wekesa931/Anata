import React from 'react'
import { Text, StyleSheet, View } from '@react-pdf/renderer'

const borderColor = '#182c4c'

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderWidth: 1,
    borderColor,
    marginBottom: 24,
    marginLeft: 10,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'left',
    fontStyle: 'bold',
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    minHeight: 24,
  },
  tableBody: {
    flexGrow: 1,
    width: '100%',
    padding: '12px 0',
  },
  tableHeader: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  emptyData: {
    width: '100%',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    fontSize: 14,
  },
})

type Column = {
  name: string
  dataIndex: string
  width: string // width in percentage
}

export type TableProps = {
  data: any[]
  columns: Column[]
  width?: string
}

function Table({ data, columns, width = '98%' }: TableProps) {
  return (
    <View style={{ ...styles.tableContainer, width }}>
      {/* Table header */}
      <View style={styles.tableHeaderContainer}>
        {columns.map((column, index) => (
          <Text
            key={index}
            style={{
              ...styles.tableHeader,
              fontWeight: 'bold',
              width: column.width,
            }}
          >
            {column.name}
          </Text>
        ))}
      </View>
      {data.length === 0 ? (
        <View style={styles.emptyData}>
          <Text>No data available</Text>
        </View>
      ) : (
        <View style={styles.tableBody}>
          {data.map((item, i) => (
            <View key={i} style={styles.tableHeaderContainer}>
              {columns.map((column, idx) => (
                <Text
                  key={idx}
                  style={{ ...styles.tableHeader, width: column.width }}
                >
                  {item[column.dataIndex] || 'N/A'}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default Table
