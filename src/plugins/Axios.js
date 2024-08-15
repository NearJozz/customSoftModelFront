import Axios from 'axios'
export default function AxiosBoot(app,store){

  let api=Axios.create({ baseURL: 'http://localhost:5114' })
  let t=store.use(() => ({'$axios':api}))
  app.config.globalProperties.$axios = api
}
