import axios from "axios"

const API_HOST = process.env.REACT_APP_API_HOST

const api = axios.create({
  baseURL: API_HOST,
})

export default api
