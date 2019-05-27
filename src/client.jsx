import React, { Component, Button } from 'react'
import ReactDOM from 'react-dom'
import { CourseTable } from './courseTable.jsx'
import { SuotarReportTable } from './suotarReportTable.jsx'

const contentNode = document.getElementById('app')
const config = require('../.ooditconfig.js')

class CourseList extends Component {
  constructor() {
    super()
    this.state = { courses: [], suotarReports: [] }
  }

  componentDidMount() {
    this.fetchFrozenCourses()
    this.fetchSuotarReports()
  }

  fetchFrozenCourses = () => {
    fetch(
      config.address + 'froyo/frozen_courses?authorization=' + config.authKey
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({ ...this.state, courses: data })
        return data
      })
      .catch((err) => {
        alert('Courses could not be fetched, error message:\n' + err)
      })
  }

  fetchSuotarReports = () => {
    fetch(config.suotarAddress + 'undownloaded', {
      method: 'GET',
      headers: {
        Authorization: config.suotarToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, suotarReports: data })
        return data
      })
      .catch((err) => {
        alert(
          `Courses could not be fetched from Suoritustarkistin, error message:\n${err}`
        )
      })
  }

  render() {
    return (
      <div>
        <h1>OodiTool</h1>
        <hr />
        <h2>Courses from Kurki</h2>
        <CourseTable courses={this.state.courses} />
        <h2>Courses from Suoritustarkistin</h2>
        <SuotarReportTable data={this.state.suotarReports} />
      </div>
    )
  }
}

ReactDOM.render(<CourseList />, contentNode)
const appDom = document.getElementById('app')
