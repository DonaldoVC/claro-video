import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Program from 'components/Program'

import { CHANNEL_MOCK } from '__test__/views/Channels/Channels.mock'

describe('Test on <Program />', () => {
  const mockEvent = CHANNEL_MOCK.channels[0].events[0]
  const onMouseOver = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(<Program event={mockEvent} onMouseOver={onMouseOver} />)

    expect(screen.getByTestId('program-name')).toBeTruthy()
    expect(screen.getByTestId('program-time')).toBeTruthy()
  })

  it('should render data in component', () => {
    render(<Program event={mockEvent} onMouseOver={onMouseOver} />)

    expect(screen.getByTestId('program-name')).toHaveTextContent(mockEvent.name)
    expect(screen.getByTestId('program-time')).toHaveTextContent('07:00 - 14:00')
  })

  it('to calculate content width', () => {
    render(<Program event={mockEvent} onMouseOver={onMouseOver} />)

    const programContent = screen.getByTestId(/^program-content/)

    expect(programContent).toHaveStyle('width: 1678px;')
    expect(programContent).toHaveStyle('maxWidth: 1678px;')
  })

  it('to calculate content width with isFirstElement', () => {
    render(<Program event={mockEvent} onMouseOver={onMouseOver} isFirstElement />)

    const programContent = screen.getByTestId(/^program-content/)

    expect(programContent).not.toHaveStyle('width: 1678px;')
    expect(programContent).not.toHaveStyle('maxWidth: 1678px;')
  })

  it('should call onMouseOver', () => {
    render(<Program event={mockEvent} onMouseOver={onMouseOver} />)

    const programContent = screen.getByTestId(/^program-content/)

    fireEvent.mouseOver(programContent)

    expect(onMouseOver).toHaveBeenCalled()
    expect(onMouseOver).toHaveBeenCalledWith(mockEvent)
  })
})
