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
        fs.writeFile(config.saveLocation + data.fileName, data.data, (err) => {
          if (err) {
            alert(
              'Error writing transfer file. Please retry and contact TOSKA.'
            )
            console.log(err)
          } else {
            hideRow()
          }
        })
      })
      .catch((e) => {
        alert(`Report could not be downloaded. Error message:\n${e}`)
      })
  }

  return <button onClick={handleClick}>Download</button>
}

export { reportDownloadButton }
