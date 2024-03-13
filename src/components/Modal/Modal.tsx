import React, { FC } from 'react'
import { createPortal } from 'react-dom'

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

import styles from './Modal.module.css'
import { ModalTypes } from './Modal.types'

const Modal: FC<ModalTypes> = ({ onClose, children }) => {
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.close}>
        <button onClick={onClose} data-testid="btn-close">
          <CloseIcon />
        </button>
      </div>
      <div className={styles.body} data-testid="modal-body">
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
