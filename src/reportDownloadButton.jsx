import React, { Component } from 'react'
import config from '../.ooditconfig.js'
import fs from 'fs'

const reportDownloadButton = (id) => {
  const handleClick = (event) => {
    event.preventDefault()
    console.log(`nappia ${id} painettu`)
    fetch(config.suotarAddress + id, {
      method: 'GET',
      headers: {
        Authorization: config.suotarToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const file = fs.createWriteStream(config.saveLocation + data.fileName)
        file.write(data.data)
        file.end()
      })
      .catch((e) => {
        console.log(`Report could not be downloaded. Error message:\n${e}`)
      })
  }

  return <button onClick={handleClick}>Download</button>
}

export { reportDownloadButton }
