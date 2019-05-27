import React, { Component } from 'react'

const SuotarReportTable = ({ data }) => {
  if (!data) return <div>no data perkele</div>

  const reportRows = data.map((obj) => (
    <tr key={obj.id}>
      <td>{obj.id}</td>
      <td>{obj.fileName}</td>
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>Report Id</th>
          <th>File name</th>
        </tr>
      </thead>
      <tbody>{reportRows}</tbody>
    </table>
  )
}

export { SuotarReportTable }
