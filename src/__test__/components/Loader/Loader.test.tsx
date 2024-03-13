import React from 'react'
import { render, screen } from '@testing-library/react'

import Loader from 'components/Loader'

describe('Test on <Loader />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(<Loader />)

    expect(screen.getByTestId('loader')).toBeTruthy()
  })
})
