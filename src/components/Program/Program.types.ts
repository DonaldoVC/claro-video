import { Event } from 'apis/epg/epg.types'

export type ProgramTypes = {
  isFirstElement?: boolean
  event: Event
  onMouseOver: (event: Event) => void
}
