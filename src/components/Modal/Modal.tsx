import React, { FC } from 'react'

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'

import styles from './Modal.module.css'
import { ModalTypes } from './Modal.types'

const Modal: FC<ModalTypes> = ({ onClose, children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.close}>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Modal
