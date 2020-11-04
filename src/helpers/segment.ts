import segment from './analytics'

const env_check = process.env.NODE_ENV === 'production'

const analytics = {
  identify: (id: any) => {
    if (env_check) segment.identify(id)
  },
  track: (name: any, props?: any) => {
    if (env_check) segment.track(name, props)
  },
  page: (data?: any, options?: any, callback?: any) => {
    if (env_check) segment.page(data, options, callback)
  },
}
export default analytics
