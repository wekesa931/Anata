import React from 'react'
import Accordion from './accordion.component'
import { render, fireEvent } from '@testing-library/react'

describe('<Accordion/>', () => {
  it('renders <Accordion/> successfully', () => {
    render(
      <Accordion
        title={'Test'}
        children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
      />
    )
  })

  it('toggles <Accordion/> successfully', () => {
    const { queryByTestId, getByTestId } = render(
      <Accordion
        title={'Test'}
        children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
      />
    )
    expect(queryByTestId('content')).not.toBeVisible()
    const toggle = getByTestId('toggle')
    fireEvent.click(toggle)
    expect(queryByTestId('content')).toBeVisible()
  })
})
