// HERE ARE ALL THE REQUESTS

import axios from 'axios'


const tokenUrl = 'https://api.artsy.net/api/tokens/xapp_token?client_id=fc789482f420f5a617e1&client_secret=90bf0796a886f44bcb6a158cc2163390'

function headers() {
  return {
    // getTokenFromLocalStorage will look in localStorage and retrieve the token, then return the string
    // returns the headers object with the token from local storage
    headers: { 'X-Xapp-Token': getTokenFromLocalStorage() }, 
  }
}

//function to get the token from the API with headers()
export function getTokenFromAPI() {
  return axios.post(`${tokenUrl}`, headers())
}

//set the token to local storage
export function setTokenToLocalStorage(token) {
  localStorage.setItem('token', token)
}

// get the token from local storage
export function getTokenFromLocalStorage() {
  return localStorage.getItem('token')
}

// request to get a selection of 200 artists from the api
export function getAllArtists() {
  return axios.get('https://api.artsy.net/api/artists?gene_id=50356574ab74980002000006&size=200', headers())
}

// request to get a single artist with the headers token, passing the artist id to the link
export function getSingleArtist(artistId) {
  return axios.get(`https://api.artsy.net/api/artists/${artistId}`, headers())
}