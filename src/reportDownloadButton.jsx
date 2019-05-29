import React from 'react'
import config from '../.ooditconfig.js'
import fs from 'fs'

const reportDownloadButton = (id, hideRow) => {
  const handleClick = (event) => {
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
        hideRow()
      })
      .catch((e) => {
        alert(`Report could not be downloaded. Error message:\n${e}`)
      })
  }

  return <button onClick={handleClick}>Download</button>
}

export { reportDownloadButton }
