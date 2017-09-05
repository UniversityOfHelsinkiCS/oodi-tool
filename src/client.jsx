import React, { Component, Button } from 'react';
import ReactDOM from 'react-dom';
import { fetchFrozenCourses } from './apiCaller.jsx';

const FileSaver = require('file-saver');
const contentNode = document.getElementById('app');
const config = require('../config.js')

class CourseList extends Component {
  constructor() {
    super();
    this.state  = { courses : []};
  }

  componentDidMount() {
    this.fetchFrozenCourses();
  }
  fetchFrozenCourses = () => {
    //TODO: Add error handling
    fetch('http://localhost:4567/frozen_courses?authorization=' + config.authKey)
        .then((response) => {
          return response.json();
        }).then((data) => {
          this.setState({ courses: data });
          console.log(this.state.courses);
          return data;
        });
  }


  render() {
    return (
      <div>
        <h1>Welcome to OodiTool</h1>
        <hr />
        <CourseTable courses={this.state.courses}/>
      </div>
    );
  }
}

function CourseTable(props) {
  const courseRows = props.courses.map((course, index) => <CourseRow
    key={index}
    course={course}
    />);

  return (
    <table>
      <thead>
        <tr>
          <th>Course code</th>
          <th>Name</th>
          <th>Year</th>
          <th>Term</th>
          <th>Type</th>
          <th>Number</th>
          <th>Responsible</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>{courseRows}</tbody>
    </table>
  )
}

const CourseRow = props => (
  <tr>
    <td>{props.course.code}</td>
    <td>{props.course.name}</td>
    <td>{props.course.year}</td>
    <td>{props.course.term}</td>
    <td>{props.course.type}</td>
    <td>{props.course.number}</td>
    <td>{props.course.responsible}</td>
    <td><CourseDownload
      link={props.course.code + '.' + props.course.year + '.'  + props.course.term + '.'
        + props.course.type + '.' + props.course.number} /></td>
  </tr>
);

class CourseDownload extends Component {
  constructor() {
    super();
  }

  fetchCourseInfo = (e) => {
    e.preventDefault();
    fetch('http://localhost:4567/frozen_course_participants/' + this.props.link + '?authorization=' + config.authKey)
        .then((response) => {
          return response.json();
        }).then((data) => {
          var result = new Blob([this.formatData(data)], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(result, "hello world.txt");
        });
  }


  formatData = (data) =>  {
    let row = [];
    let result = '';
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      this.formatRow(data[i]);
      row = Object.values(data[i]);
      for (var j = 0; j < row.length; j++) {
        result += row[j] + '#';
      }
      result += '\n';
      row = [];
      console.log(data.length);
    }
    console.log(result);
    return result;
  }

// Formats student_id and date in the right form.
// TODO: Checks if grader_id exists
// if exists: deletes grader_uni_id and sets hyväksyjän tunnuksen tyyppi to 1
// else deletes grader_id and sets ^ to ???
// TODO: How to react if student_id is not available?
// TODO: Sets the organization_id determined by the code [CSM, DAT, TKT, or else H523]
// TODO: Addd ,0 to credits?
  formatRow = (row) => {
    let formattedDate = new Date(row['finish_date']).toLocaleDateString();
    let formattedStudentId = row['student_id'].slice(0,6) +'-' + row['student_id'].slice(6);
    row['finish_date'] = formattedDate;
    row['student_id'] = formattedStudentId;

  }

  render() {
    return (
      <div>
        <button onClick={this.fetchCourseInfo}>{this.props.link}</button>
      </div>
    )
  }
}

ReactDOM.render(<CourseList />, contentNode);
const appDom = document.getElementById('app')
