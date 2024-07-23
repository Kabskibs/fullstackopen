import axios from 'axios'
// const baseUrl = '/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (url) => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = async (url, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

/* const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
} */

export default { getAll, create, /* update, */ setToken }