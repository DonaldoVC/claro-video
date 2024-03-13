import React, { FC } from 'react'

import styles from './List.module.css'
import { ListTypes } from './List.types'

const List: FC<ListTypes> = ({ channel }) => {
  return (
    <div className={styles.main}>
      <div className={styles.channel}>
        <span className={styles.number} data-testid="channel-number">
          {channel.number}
        </span>
        <img
          src={channel.image}
          className={styles.img}
          alt={channel.name}
          data-testid="channel-img"
        />
      </div>
    </div>
  )
}

export default List
