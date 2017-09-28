import React, { Component } from 'react';
import { formatData } from './formatData.jsx'

const config = require('../.ooditconfig.js')
const FileSaver = require('file-saver');

export default class CourseDownload extends Component {
  constructor() {
    super();
  }

  fetchCourseInfo = (e) => {
    e.preventDefault();
    fetch(config.address + 'froyo/frozen_course_participants/' +
      this.props.link + '?authorization=' + config.authKey)
        .then((response) => {
          return response.json();
        }).then((data) => {
          if(data.length > 0) {
            let result = formatData(data);
            const file = new Blob([result[1]], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(file, result[0]);
          } else {
            alert('no participants that need to be updated');
            this.props.hideRow()
          }
        }).then((data) => {
          fetch(config.address + 'froyo/frozen_course_transferred?authorization=' + config.authKey,
           { method: 'POST', body: JSON.stringify({ id : this.props.link }) ,
	           headers: { 'Content-Type': 'application/json' },
           }).then((response) => {
             this.props.hideRow()
          });
        });
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchCourseInfo}>Download</button>
      </div>
    )
  }
}
