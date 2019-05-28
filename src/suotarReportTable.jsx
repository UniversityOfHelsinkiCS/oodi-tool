import React, { Component } from 'react'
import { reportDownloadButton } from './reportDownloadButton.jsx'

const SuotarReportTable = ({ data }) => {
  const reportRows = data.map((obj) => (
    <tr key={obj.id}>
      <td>{obj.id}</td>
      <td>{obj.fileName}</td>
      <td>{reportDownloadButton(obj.id)}</td>
    </tr>
  ))

  if (reportRows.length === 0) return <div>No new reports available.</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Report Id</th>
          <th>File name</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>{reportRows}</tbody>
    </table>
  )
}

export { SuotarReportTable }
