import React from 'react'
import { Circles } from 'react-loader-spinner'

import styles from './Loader.module.css'
import { createPortal } from 'react-dom'

const Loader = () => {
  return createPortal(
    <div className={styles.main}>
      <div data-testid="loader">
        <Circles height="80" width="80" color="#ffffff" ariaLabel="circles-loading" visible />
      </div>
    </div>,
    document.body
  )
}

export default Loader
