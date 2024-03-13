import React from 'react'
import { render, screen } from '@testing-library/react'

import List from 'components/List'

import { CHANNEL_MOCK } from '__test__/views/Channel/Channel.mock'

describe('Test on <List />', () => {
  const mockChannel = CHANNEL_MOCK.channels[0]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(<List channel={mockChannel} />)

    expect(screen.getByTestId('channel-number')).toBeTruthy()
    expect(screen.getByTestId('channel-img')).toBeTruthy()
  })

  it('should render data in component', () => {
    render(<List channel={mockChannel} />)

    const img = screen.getByTestId('channel-img')

    expect(screen.getByTestId('channel-number')).toHaveTextContent(mockChannel.number)
    expect(img).toHaveAttribute('src', mockChannel.image)
    expect(img).toHaveAttribute('alt', mockChannel.name)
  })
})
