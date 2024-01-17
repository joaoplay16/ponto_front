import axios from "axios"

const API_HOST = process.env.REACT_APP_API_HOST

// withCredentials: true ára ter certeza que inclui os cookies na requisição
const api = axios.create({
  baseURL: API_HOST,
  withCredentials: true
})

export default api
