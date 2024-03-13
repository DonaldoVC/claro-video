import React, {FC, useEffect, useRef, useState} from "react";
import moment from "moment/moment";

import {getChannels} from "apis/channels/channels.api";
import {Event, ResponseChannel} from "apis/channels/channels.types";

import List from "components/List";
import Program from "components/Program";

import styles from './Channel.module.css'

const Channels: FC = () => {
  const channelScrollRef = useRef<any>(null);
  const scheduleScrollRef = useRef<any>(null);
  
  const [channels, setChannels] = useState<ResponseChannel>()
  const [maxWidth, setMaxWidth] = useState(0)
  const [schedule, setSchedule] = useState<string[]>([])
  const [now, setNow] = useState(moment())
  const [eventInfo, setEvent] = useState({} as Event)

  useEffect(() => {
    getChannels().then((response) => {
      setChannels(response)
    })
  }, []);

  useEffect(() => {
    let max = 0

    channels?.channels.forEach((channel) => {
      const reduce = channel.events.reduce((a, b) => a + moment(b.date_end).diff(moment(b.date_begin), 'minutes'), 0)

      if (reduce > max) {
        max = reduce
      }
    })

    const size = max * 4
    const now = moment()

    if (Number(now.format('mm')) < 30) {
      now.minutes(0);
    } else {
      now.minutes(30);
    }

    setNow(now)

    const arraySize = Number((size / 120).toFixed(0))
    const timeTitle = [...Array(arraySize)].map((_, index) => {
      if (index !== 0) {
        now.add(30, 'minutes')
      }

      return `${now.format('HH.mm')}hs.`
    })

    setSchedule(timeTitle)
    setMaxWidth(size)
  }, [channels?.channels, maxWidth]);
  
  const handleScroll = () => {
    if (channelScrollRef.current && scheduleScrollRef.current) {
      scheduleScrollRef.current.scrollLeft = channelScrollRef.current.scrollLeft;
    }
  };

  const handleSetInfo = (event: Event) => {
    const duration = moment.duration(moment(event.date_end).diff(moment(event.date_begin)));

    setEvent({
      ...event,
      duration: `${duration.hours()}h ${duration.minutes()}m`
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        {eventInfo.id && (
          <div style={{height: '100%'}}>
            <h1>{eventInfo.name}</h1>

            <p>{eventInfo.description}</p>
            <p>
              <span>{`${moment(eventInfo.date_begin).format('HH.mm')}hs.`} a {`${moment(eventInfo.date_end).format('HH.mm')}hs. `}</span>
              <span>{eventInfo.duration}</span>
            </p>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.channels}>
          <div className={styles.channelList}>
            <div className={styles.schedule} style={{width: '220px'}} />

            {channels?.channels.map((channel) => (
              <List key={channel.id} channel={channel}/>
            ))}
          </div>
          
          <div className={styles.program} onScroll={handleScroll} ref={channelScrollRef}>
            <div className={styles.schedule} style={{width: `${maxWidth}px`}}>
              <div className={styles.scheduleContent} ref={scheduleScrollRef}>
                {schedule.map((time, index) => (
                  <span key={`${index}-${time}`}>{time}</span>
                ))}
              </div>
            </div>
            
            {channels?.channels.map((channel) => (
              <div key={`channel-${channel.id}`}>
                {channel.events.map((event, index) => now?.isAfter(moment(event.date_end)) && (
                  <Program 
                    key={`${channel.id}-${event.id}`} 
                    event={event} 
                    isFirstElement={index === 0} 
                    onMouseOver={handleSetInfo}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels