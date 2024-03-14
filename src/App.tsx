import React, { useState } from 'react'

import Modal from 'components/Modal'

import Epg from 'views/Epg'

import styles from './App.module.css'

const App = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        Mostrar EPG
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Epg />
        </Modal>
      )}
    </div>
  )
}

export default App
