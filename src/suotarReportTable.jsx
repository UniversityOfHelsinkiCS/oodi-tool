import React, { Component } from 'react'
import { reportDownloadButton } from './reportDownloadButton.jsx'

const SuotarReportTable = ({ data }) => {
  const reportRows = data.map((obj) => (
    <ReportRow
      course={obj}
      key={obj.id}
      id={obj.id}
      courseName={obj.courseName}
      fileName={obj.fileName}
    />
  ))

  if (reportRows.length === 0) return <div>No new reports available.</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Report id</th>
          <th>Course name</th>
          <th>File name</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>{reportRows}</tbody>
    </table>
  )
}

class ReportRow extends Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }

  hideRow = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <tr>
        <td>{this.props.course.id}</td>
        <td>{this.props.course.courseName}</td>
        <td>{this.props.course.courseName}</td>
        {this.state.visible ? (
          <td>{reportDownloadButton(this.props.course.id, this.hideRow)}</td>
        ) : null}
      </tr>
    )
  }
}

export { SuotarReportTable }
