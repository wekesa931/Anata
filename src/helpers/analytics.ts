import Analytics from 'analytics'
import segmentPlugin from '@analytics/segment'

export default Analytics({
  app: 'Scribe2',
  plugins: [
    segmentPlugin({
      writeKey: process.env.SEGMENT_WRITE_KEY,
    }),
  ],
})
