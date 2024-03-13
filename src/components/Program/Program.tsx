import React, {FC, useEffect, useState} from "react";
import moment, {Moment} from "moment";

import styles from './Program.module.css'
import {ProgramTypes} from "./Program.types";

const Program: FC<ProgramTypes> = ({event, isFirstElement, onMouseOver}) => {
  const [date, setDate] = useState<Moment>()

  useEffect(() => {
    const now = moment()

    if (Number(now.format('mm')) < 30) {
      now.minutes(0);
    } else {
      now.minutes(30);
    }
    
    setDate(now)
  }, []);
  
  const width = 
    moment(event.date_end)
    .diff(moment(isFirstElement ? date : event.date_begin), 'minutes')

  return (
    <div 
      className={styles.main} 
      style={{width: `${width * 4 - 2}px`, maxWidth: `${width * 4 - 2}px`}}
      onMouseOver={() => onMouseOver(event)}
    >
      <span className={styles.name}>{event.name}</span>
      <span className={styles.time}>{moment(event.date_begin).format('HH:mm')} - {moment(event.date_end).format('HH:mm')}</span>
    </div>
  )
}

export default Program