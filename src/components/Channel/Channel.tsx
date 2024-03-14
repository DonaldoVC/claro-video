import React, { FC } from 'react'

import styles from './Channel.module.css'
import { ChannelTypes } from './Channel.types'

const Channel: FC<ChannelTypes> = ({ channel }) => {
  return (
    <div className={styles.main} data-testid={`channel-content-${channel.number}`}>
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

export default Channel
