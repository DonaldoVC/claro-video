import React, { FC, useEffect, useState } from 'react'
import moment, { Moment } from 'moment'

import styles from './Program.module.css'
import { ProgramTypes } from './Program.types'

const Program: FC<ProgramTypes> = ({ event, isFirstElement, onMouseOver }) => {
  const [date, setDate] = useState<Moment>()

  useEffect(() => {
    if (isFirstElement) {
      const now = moment()

      if (Number(now.format('mm')) < 30) {
        now.minutes(0)
      } else {
        now.minutes(30)
      }

      setDate(now)
    }
  }, [isFirstElement])

  const width = moment(event.date_end, 'YYYY/MM/DD HH:mm:ss').diff(
    isFirstElement ? date : moment(event.date_begin, 'YYYY/MM/DD HH:mm:ss'),
    'minutes'
  )

  return (
    <div
      className={styles.main}
      style={{ width: `${width * 4 - 2}px`, maxWidth: `${width * 4 - 2}px` }}
      onMouseOver={() => onMouseOver(event)}
      data-testid="program-content"
    >
      <span className={styles.name} data-testid="program-name">
        {event.name}
      </span>
      <span className={styles.time} data-testid="program-time">
        {moment(event.date_begin, 'YYYY/MM/DD HH:mm:ss').format('HH:mm')} -{' '}
        {moment(event.date_end, 'YYYY/MM/DD HH:mm:ss').format('HH:mm')}
      </span>
    </div>
  )
}

export default Program
