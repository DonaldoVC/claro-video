import React, {useState} from 'react';
import {createPortal} from "react-dom";

import Modal from "components/Modal";
import Channels from "views/Channels";
import styles from './App.module.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);  
  
  return (
    <div>
      <button className={styles.button} onClick={() => setShowModal(true)}>Mostrar EPG</button>

      {showModal && createPortal(
        <Modal onClose={() => setShowModal(false)}>
          <Channels />
        </Modal>,
        document.body
      )}
    </div>
  );
}

export default App;
