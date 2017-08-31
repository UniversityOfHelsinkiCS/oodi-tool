import React, { Component, Button } from 'react';
import ReactDOM from 'react-dom';
import { fetchFrozenCourses } from './apiCaller.jsx';

const FileSaver = require('file-saver');
const contentNode = document.getElementById('app');

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
    fetch('http://localhost:4567/frozen_courses')
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
    fetch('http://localhost:4567/frozen_course_details/' + this.props.link)
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
      row = Object.values(data[i]);
      console.log(row);
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
