import segment from './analytics'

const env_check = process.env.NODE_ENV === 'production'

const analytics = {
  identify: (id: any) => {
    if (env_check) segment?.identify(id) //eslint-disable-line no-unused-expressions
  },
  track: (name: any, props?: any) => {
    if (env_check) segment?.track(name, props) //eslint-disable-line no-unused-expressions
  },
  page: (data?: any, options?: any, callback?: any) => {
    if (env_check) segment?.page(data, options, callback) //eslint-disable-line no-unused-expressions
  },
}
export default analytics
