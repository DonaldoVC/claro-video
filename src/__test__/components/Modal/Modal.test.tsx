import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Modal from 'components/Modal'

describe('Test on <Modal />', () => {
  const onClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    render(
      <Modal onClose={onClose}>
        <div />
      </Modal>
    )

    expect(screen.getByTestId('modal-body')).toBeTruthy()
  })

  it('should close element', () => {
    render(<Modal onClose={onClose}>asd</Modal>)

    const closeButton = screen.getByTestId('btn-close')

    fireEvent.click(closeButton)
    expect(onClose).toBeCalledTimes(1)
  })
})
