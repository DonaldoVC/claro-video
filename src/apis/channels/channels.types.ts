export type ResponseChannel = {
  channels: Channel[]
  total: number
}

export type Channel = {
  epg_url: string
  events: Event[]
  group: Group
  group_id: string
  hd: boolean
  id: string
  image: string
  liveref: string
  name: string
  number: string
  provider_metadata_id: number
  provider_metadata_name: string
  source_uri: string
}

export type Event = {
  'channel_id': string,
  'source_uri': string,
  'id': string,
  'name': string,
  'description': string,
  'talent': null,
  'date_begin': string,
  'date_end': string,
  'unix_begin': number,
  'unix_end': number,
  'duration': string,
  'language': string,
  'type': string,
  'group_id': null,
  'confirmado': null,
  'id_empleado': null,
  'tms_id': null,
  'event_alf_id': string,
  'ext_ncont_id': string,
  'ext_nevt_id': string,
  'ext_actors': null,
  'ext_director': null,
  'ext_year': null,
  'ext_country': string | null,
  'ext_original_name': string,
  'ext_ep_original_name': null,
  'ext_series_id': string | null,
  'ext_season_id': string | null,
  'ext_episode_id': string | null,
  'ext_language': string,
  'ext_serie_short_desc': null,
  'ext_serie_desc': null,
  'image_base_horizontal': string,
  'image_base_vertical': string,
  'image_base_square': string,
  'ext_eventimage_name': string,
  'ext_eventimage_name_base': string,
  'ext_catchup': string,
  'ext_startover': string,
  'ext_recordable': string,
  'parental_rating': string,
  'aud_stereo': string,
  'aud_dolby': string,
  'vid_black_and_white': string,
  'dvb_content': string | null,
  'user_content': null,
  'group_rel': null,
  'gmt': number,
}

type Group = {
  common: {
    channel_number: string
    date: string
    description: string
    description_large: string
    duration: null
    encoder_tecnology: {
      desc: string
      id: string
    }
    episode_number: null
    format_types: string
    id: string
    image_background: string
    image_base_horizontal: string
    image_base_square: string
    image_base_vertical: string
    image_clean_horizontal: string
    image_clean_square: string
    image_clean_vertical: string
    image_external: null
    image_frames: string
    image_large: string
    image_medium: string
    image_small: string
    image_sprites: string
    image_still: null
    image_trickplay: string
    is_series: boolean
    live_enabled: string
    live_ref: string
    live_type: string
    preview: string
    proveedor_code: string
    proveedor_name: string
    rating_code: string
    recorder_technology: { id: string | null; desc: string | null }
    resource_name: null
    rollingcreditstime: null
    rollingcreditstimedb: null
    season_number: null
    short_description: null
    source_uri: string
    timeshift: string | null
    title: string
    title_episode: null
    title_original: string
    title_uri: string
    url_imagen_t1: string
    url_imagen_t2: string
    votes_average: number
    year: null
  }
}
