import React from 'react'
import { render, screen } from '@testing-library/react'

import Channel from 'components/Channel'

import { CHANNEL_MOCK } from '__test__/views/Channels/Channels.mock'

describe('Test on <Channel />', () => {
  const mockChannel = CHANNEL_MOCK.channels[0]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(<Channel channel={mockChannel} />)

    expect(screen.getByTestId('channel-number')).toBeTruthy()
    expect(screen.getByTestId('channel-img')).toBeTruthy()
  })

  it('should render data in component', () => {
    render(<Channel channel={mockChannel} />)

    const img = screen.getByTestId('channel-img')

    expect(screen.getByTestId('channel-number')).toHaveTextContent(mockChannel.number)
    expect(img).toHaveAttribute('src', mockChannel.image)
    expect(img).toHaveAttribute('alt', mockChannel.name)
  })
})
