import React, { Component } from 'react';
import { formatData } from './formatData.jsx'

const config = require('../config.js')
const FileSaver = require('file-saver');

export default class CourseDownload extends Component {
  constructor() {
    super();
  }

  fetchCourseInfo = (e) => {
    e.preventDefault();
    fetch('http://localhost:4567/froyo/frozen_course_participants/' + this.props.link + '?authorization=' + config.authKey)
        .then((response) => {
          return response.json();
        }).then((data) => {
          var result = new Blob([formatData(data)], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(result, "hello world.txt");
        });
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchCourseInfo}>{this.props.link}</button>
      </div>
    )
  }
}
