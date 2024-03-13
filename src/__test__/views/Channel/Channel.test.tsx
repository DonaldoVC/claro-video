import React from 'react'
import { render, screen } from '@testing-library/react'

import Channels from 'views/Channels'

describe('Test on <Channels />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(<Channels />)

    expect(screen.getByTestId('loader')).toBeTruthy()
  })
})
