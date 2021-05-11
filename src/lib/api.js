
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

export function setTokenToLocalStorage(token) {
  localStorage.setItem('token', token)
}
export function getTokenFromLocalStorage() {
  return localStorage.getItem('token')
}

export function getAllArtists() {
  return axios.get('https://api.artsy.net/api/artists?gene_id=50356574ab74980002000006&size=200', headers())
}

export function getSingleArtist(artistId) {
  return axios.get(`https://api.artsy.net/api/artists/${artistId}`, headers())
}