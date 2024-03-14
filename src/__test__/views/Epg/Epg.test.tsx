import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import axios from 'axios'

import Epg from 'views/Epg'

import { CHANNEL_MOCK } from './Epg.mock'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Test on <Epg />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component with loader', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: {
          channel: [],
          total: 0,
        },
      },
    })

    render(<Epg />)

    await act(async () => {
      expect(screen.getByTestId('loader')).toBeTruthy()
    })
  })

  it('should render component', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    render(<Epg />)

    await waitFor(async () => {
      expect(screen.getByTestId('content')).toBeTruthy()
    })
  })

  it('should render schedule', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    render(<Epg />)

    await waitFor(async () => {
      expect(screen.getByTestId('schedule')).toBeTruthy()
    })

    await waitFor(async () => {
      expect(screen.getByTestId('schedule')).toHaveStyle('width: 7200px;')
    })

    await waitFor(async () => {
      const container = screen.getAllByTestId(/^schedule-element/)

      expect(container).toHaveLength(60)
    })
  })

  it('should render channels', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    render(<Epg />)

    await waitFor(async () => {
      const container = screen.getAllByTestId(/^channel-content/)

      expect(container).toHaveLength(3)
    })
  })

  it('should render programs', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    const elements = CHANNEL_MOCK.channels.reduce((a, b) => a + b.events.length, 0)

    render(<Epg />)

    await waitFor(async () => {
      const container = screen.getAllByTestId(/^program-content/)

      expect(container).toHaveLength(elements)
    })
  })

  it('should not render program info', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    render(<Epg />)

    await waitFor(async () => {
      expect(screen.getByTestId('content')).toBeTruthy()
    })

    expect(screen.queryByTestId('eventInfo-name')).toBeFalsy()
    expect(screen.queryByTestId('eventInfo-schedule')).toBeFalsy()
    expect(screen.queryByTestId('eventInfo-duration')).toBeFalsy()
    expect(screen.queryByTestId('eventInfo-description')).toBeFalsy()
  })

  it('should render program info on hover', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: CHANNEL_MOCK,
      },
    })

    render(<Epg />)

    await waitFor(async () => {
      expect(screen.getByTestId('content')).toBeTruthy()
    })

    const programContent = screen.getByTestId(
      `program-content-${CHANNEL_MOCK.channels[0].events[0].id}`
    )
    fireEvent.mouseOver(programContent)

    expect(screen.getByTestId('eventInfo-name')).toBeTruthy()
    expect(screen.getByTestId('eventInfo-schedule')).toBeTruthy()
    expect(screen.getByTestId('eventInfo-duration')).toBeTruthy()
    expect(screen.getByTestId('eventInfo-description')).toBeTruthy()
  })
})
