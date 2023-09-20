import { diffRecordsById } from 'src/utils/diff'

describe('diffRecordsById test suite', () => {
  // Tests that the function works when given two arrays of records with the same length
  it('test_same_length', () => {
    const oldRecords = [{ id: '1' }, { id: '2' }, { id: '3' }]
    const newRecords = [{ id: '1' }, { id: '4' }, { id: '5' }]
    const result = diffRecordsById(oldRecords, newRecords)
    expect(result.deleted).toEqual([{ id: '2' }, { id: '3' }])
    expect(result.updated).toEqual([{ id: '1' }])
    expect(result.created).toEqual([{ id: '4' }, { id: '5' }])
  })

  // Tests that the function works when given two arrays of records with different lengths
  it('test_different_length', () => {
    const oldRecords = [{ id: '1' }, { id: '2' }, { id: '3' }]
    const newRecords = [{ id: '1' }, { id: '4' }]
    const result = diffRecordsById(oldRecords, newRecords)
    expect(result.deleted).toEqual([{ id: '2' }, { id: '3' }])
    expect(result.updated).toEqual([{ id: '1' }])
    expect(result.created).toEqual([{ id: '4' }])
  })

  // Tests that the function works when given two empty arrays
  it('test_empty_arrays', () => {
    const oldRecords: [] = []
    const newRecords: [] = []
    const result = diffRecordsById(oldRecords, newRecords)
    expect(result.deleted).toEqual([])
    expect(result.updated).toEqual([])
    expect(result.created).toEqual([])
  })

  // Tests that the function works when given null or undefined values for oldRecords and newRecords
  it('test_null_values', () => {
    const oldRecords = null
    const newRecords = undefined
    const result = diffRecordsById(oldRecords as any, newRecords as any)
    expect(result.deleted).toEqual([])
    expect(result.updated).toEqual([])
    expect(result.created).toEqual([])
  })
  // Tests that the function works when given oldRecords and newRecords containing records with null or undefined id
  it('test_null_id', () => {
    const oldRecords = [{ id: '1' }, { id: null }, { id: '3' }]
    const newRecords = [{ id: '1' }, { id: undefined }, { id: '4' }]
    const result = diffRecordsById(oldRecords as any, newRecords as any)
    expect(result.deleted).toEqual([{ id: null }, { id: '3' }])
    expect(result.updated).toEqual([{ id: '1' }])
    expect(result.created).toEqual([{ id: undefined }, { id: '4' }])
  })

  // Tests that the function works when given oldRecords and newRecords containing records with null or undefined id
  it('test_null_id', () => {
    const oldRecords = [{ id: '1' }, { id: null }, { id: '3' }]
    const newRecords = [{ id: '1' }, { id: undefined }, { id: '4' }]
    const result = diffRecordsById(oldRecords as any, newRecords as any)
    expect(result.deleted).toEqual([{ id: null }, { id: '3' }])
    expect(result.updated).toEqual([{ id: '1' }])
    expect(result.created).toEqual([{ id: undefined }, { id: '4' }])
  })
})
