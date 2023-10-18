import Analytics from 'analytics'
import segmentPlugin from '@analytics/segment'

const segment = Analytics({
  app: 'Scribe2',
  plugins: [
    segmentPlugin({
      writeKey: process.env.SEGMENT_WRITE_KEY,
    }),
  ],
})
const env_check = process.env.NODE_ENV === 'production'

// const env_check = true

const identify = (id: any, props?: any) => {
  if (env_check) segment?.identify(id, props) // eslint-disable-line no-unused-expressions
}

const track = (name: any, props?: any) => {
  if (env_check) segment?.track(name, props) // eslint-disable-line no-unused-expressions
}

const page = (data?: any, options?: any, callback?: any) => {
  if (env_check) segment?.page(data, options, callback) // eslint-disable-line no-unused-expressions
}

export default {
  identify,
  track,
  page,
}
