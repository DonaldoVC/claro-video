import { Event } from 'apis/channels/channels.types'

export type ProgramTypes = {
  isFirstElement: boolean
  event: Event
  onMouseOver: (event: Event) => void
}
