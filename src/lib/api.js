
import axios from 'axios'

const tokenUrl = 'https://api.artsy.net/api/tokens/xapp_token?client_id=fc789482f420f5a617e1&client_secret=90bf0796a886f44bcb6a158cc2163390'

function headers() {
  return {
    headers: { 'X-Xapp-Token': getTokenFromLocalStorage() }, //getToken will look in localStorage and retrieve the token, then return the string
  }
}

export function getTokenFromAPI() {
  return axios.post(`${tokenUrl}`, headers())
}

export function getTokenFromLocalStorage(token) {
  localStorage.setItem('token', token)
}