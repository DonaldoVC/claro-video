import axios from 'axios'
import moment from 'moment'

import { API } from 'constants/api'
import { ResponseEPG } from './epg.types'

export const getEPG = async (): Promise<ResponseEPG> => {
  const now = moment()

  const { data } = await axios.get(API, {
    params: {
      device_id: 'web',
      device_category: 'web',
      device_model: 'web',
      device_type: 'web',
      device_so: 'Chrome',
      format: 'json',
      device_manufacturer: 'generic',
      authpn: 'webclient',
      authpt: 'tfg1h3j4k6fd7',
      api_version: 'v5.93',
      region: 'mexico',
      HKS: 'web65f0849a995fb',
      user_id: '7430760',
      node_id: '18132',
      date_from: `${now.format('YYYYMMDDHH')}0000`,
      date_to: `${now.add(1, 'day').format('YYYYMMDDHH')}0000`,
      quantity: '200',
    },
  })

  return data.response
}
