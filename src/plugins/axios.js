import axios from 'axios'

axios.defaults.baseURL = '/api/v1'
axios.defaults.timeout = 5000

export default axios