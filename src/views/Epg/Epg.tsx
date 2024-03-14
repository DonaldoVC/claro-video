import React, { FC, useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'

import { getEPG } from 'apis/epg/epg.api'
import { Event, ResponseEPG } from 'apis/epg/epg.types'

import Channel from 'components/Channel'
import Program from 'components/Program'
import Loader from 'components/Loader'

import { FORMAT_API_DATE } from 'constants/format'

import styles from './Epg.module.css'

const Epg: FC = () => {
  const channelScrollRef = useRef<any>(null)
  const scheduleScrollRef = useRef<any>(null)

  const [channels, setChannels] = useState<ResponseEPG>()
  const [maxWidth, setMaxWidth] = useState(0)
  const [schedule, setSchedule] = useState<string[]>([])
  const [now, setNow] = useState(moment())
  const [eventInfo, setEvent] = useState({} as Event)

  useEffect(() => {
    getEPG().then(response => {
      setChannels(response)
    })
  }, [])

  useEffect(() => {
    let max = 0

    channels?.channels.forEach(channel => {
      const reduce = channel.events.reduce(
        (a, b) =>
          a +
          moment(b.date_end, FORMAT_API_DATE).diff(
            moment(b.date_begin, FORMAT_API_DATE),
            'minutes'
          ),
        0
      )

      if (reduce > max) {
        max = reduce
      }
    })

    const size = max * 4
    const now = moment()

    if (Number(now.format('mm')) < 30) {
      now.minutes(0)
    } else {
      now.minutes(30)
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
  }, [channels?.channels, maxWidth])

  const handleScroll = () => {
    if (channelScrollRef.current && scheduleScrollRef.current) {
      scheduleScrollRef.current.scrollLeft = channelScrollRef.current.scrollLeft
    }
  }

  const handleSetInfo = (event: Event) => {
    const duration = moment.duration(
      moment(event.date_end, FORMAT_API_DATE).diff(moment(event.date_begin, FORMAT_API_DATE))
    )

    setEvent({
      ...event,
      duration: `${duration.hours()}h ${duration.minutes()}m`,
    })
  }

  return (
    <div className={styles.main}>
      {!channels?.total ? (
        <Loader />
      ) : (
        <>
          <div className={styles.info}>
            {eventInfo.id && (
              <div style={{ height: '100%' }}>
                <h1 data-testid="eventInfo-name">{eventInfo.name}</h1>

                <p>
                  <span data-testid="eventInfo-schedule">
                    {`${moment(eventInfo.date_begin, FORMAT_API_DATE).format('HH.mm')}hs.`} a{' '}
                    {`${moment(eventInfo.date_end, FORMAT_API_DATE).format('HH.mm')}hs. `}
                  </span>
                  <span data-testid="eventInfo-duration">{eventInfo.duration}</span>
                </p>

                <p data-testid="eventInfo-description">{eventInfo.description}</p>
              </div>
            )}
          </div>

          <div className={styles.content} data-testid="content">
            <div className={styles.channels}>
              <div className={styles.channelList}>
                <div className={styles.schedule} style={{ width: '220px' }} />

                {channels?.channels.map(channel => <Channel key={channel.id} channel={channel} />)}
              </div>

              <div
                className={styles.program}
                onScroll={handleScroll}
                ref={channelScrollRef}
                data-testid="program-scroll"
              >
                <div
                  className={styles.schedule}
                  style={{ width: `${maxWidth}px` }}
                  data-testid="schedule"
                >
                  <div
                    className={styles.scheduleContent}
                    ref={scheduleScrollRef}
                    data-testid="schedule-scroll"
                  >
                    {schedule.map((time, index) => (
                      <span key={`${index}-${time}`} data-testid={`schedule-element-${index}`}>
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {channels?.channels.map(channel => (
                  <div key={`channel-${channel.id}`}>
                    {channel.events.map(
                      (event, index) =>
                        now?.isAfter(moment(event.date_end, FORMAT_API_DATE)) && (
                          <Program
                            key={`${channel.id}-${event.id}`}
                            event={event}
                            isFirstElement={index === 0}
                            onMouseOver={handleSetInfo}
                          />
                        )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Epg
