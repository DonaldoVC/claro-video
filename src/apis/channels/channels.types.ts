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
  aud_dolby: null
  aud_stereo: null
  channel_id: string
  confirmado: null
  date_begin: string
  date_end: string
  description: null
  duration: string
  dvb_content: null
  event_alf_id: null
  ext_actors: null
  ext_catchup: null
  ext_country: null
  ext_director: null
  ext_ep_original_name: null
  ext_episode_id: null
  ext_eventimage_name: string
  ext_eventimage_name_base: string
  ext_language: null
  ext_ncont_id: null
  ext_nevt_id: null
  ext_original_name: null
  ext_recordable: null
  ext_season_id: null
  ext_serie_desc: null
  ext_serie_short_desc: null
  ext_series_id: null
  ext_startover: null
  ext_year: null
  gmt: number
  group_id: null
  group_rel: null
  id: string
  id_empleado: null
  image_base_horizontal: string
  image_base_square: string
  image_base_vertical: string
  language: null
  name: string
  parental_rating: null
  source_uri: string
  talent: null
  tms_id: null
  type: null
  unix_begin: number
  unix_end: number
  user_content: null
  vid_black_and_white: null
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
    recorder_technology: { id: string; desc: string }
    resource_name: null
    rollingcreditstime: null
    rollingcreditstimedb: null
    season_number: null
    short_description: null
    source_uri: string
    timeshift: string
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
