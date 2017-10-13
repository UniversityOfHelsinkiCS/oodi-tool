import React, { Component } from 'react';
import { formatData } from './formatData.jsx'
import config from  '../.ooditconfig.js'
import fs from 'fs';


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
            console.log(data)
            let result = formatData(data);
            const file = fs.createWriteStream('./data/' + result[0]);
            file.write(result[1]);
            file.end();
            // if more than one Transfer file needs to be created (only bachelors thesis currently)
            if(result.length > 2) {
              const file2 = fs.createWriteStream('./data/' + result[2]);
              file2.write(result[3]);
              file2.end();
              const file3 = fs.createWriteStream('./data/' + result[4]);
              file3.write(result[5]);
              file3.end();
              const file4 = fs.createWriteStream('./data/' + result[6]);
              file4.write(result[7]);
              file4.end();
            }
          } else {
            alert('no participants that need to be updated');
            this.props.hideRow()
          }
        }).then((data) => {
          // fetch(config.address + 'froyo/frozen_course_transferred?authorization=' + config.authKey,
          //  { method: 'POST', body: JSON.stringify({ id : this.props.link }) ,
	        //    headers: { 'Content-Type': 'application/json' },
          //  }).then((response) => {
             alert('Transfer file has been downloaded to \n /home/siven/oodi/data/\n /home/ad/fshome5/u5/s/siven/ \n' +
                'and relative path ./data');
             this.props.hideRow();
          // });
        }).catch((err) => {
          alert('Something went wrong, error message: \n' + err);
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
