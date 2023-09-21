import {
  possiblyUndefinedEval,
  convertToNumberIfDefined,
} from 'src/modules/vitals/utils'

describe('possiblyUndefinedEval suite', () => {
  // Tests that input with some required keys missing returns undefined
  test('test_missing_required_keys_returns_undefined', () => {
    expect(possiblyUndefinedEval({ a: 1 }, ({ b }: any) => b)).toBeUndefined()
  })

  // Tests that input with extra keys is ignored and returns a number
  test('test_extra_keys_are_ignored', () => {
    expect(
      possiblyUndefinedEval({ a: 1, b: 2, c: 3 }, ({ a, b }) => a + b)
    ).toBe(3)
  })

  // Tests that input with all required keys returns a number
  test('test_all_required_keys_returns_number', () => {
    expect(possiblyUndefinedEval({ a: 1, b: 2 }, ({ a, b }) => a + b)).toBe(3)
  })

  // Tests that input with some required keys missing returns a number
  test('test_missing_required_keys_returns_number', () => {
    expect(
      possiblyUndefinedEval({ a: 1 }, ({ a, b }: any) => a + b)
    ).toBeUndefined()
  })

  // Tests that input with some required keys missing and some extra keys returns a number
  test('test_missing_and_extra_keys_returns_number', () => {
    expect(
      possiblyUndefinedEval({ a: 1, c: 3 }, ({ a, b }: any) => a + b)
    ).toBeUndefined()
  })
})

describe('toNumberOrDefault suite', () => {
  // Tests that input with a number returns that number
  test('test_number_returns_number', () => {
    expect(convertToNumberIfDefined(1)).toBe(1)
  })

  // Tests that input with a string that can be parsed as a number returns that number
  test('test_parsable_string_returns_number', () => {
    expect(convertToNumberIfDefined('1')).toBe(1)
  })

  // Tests that input with undefined returns the default
  test('test_undefined_returns_default', () => {
    expect(convertToNumberIfDefined(undefined)).toBe(undefined)
  })

  // Tests that input with null returns the default
  test('test_null_returns_default', () => {
    expect(convertToNumberIfDefined(null)).toBe(undefined)
  })
})
