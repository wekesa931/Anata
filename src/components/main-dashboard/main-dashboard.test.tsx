
import React from 'react'
import renderer from 'react-test-renderer';
import HNDashboard from './main-dashboard'

describe('<mainDashboard>', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<HNDashboard/>).toJSON()
    expect (tree).toMatchSnapshot()
  })
})