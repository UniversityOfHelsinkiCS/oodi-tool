import React, { Component, Button } from 'react';
import ReactDOM from 'react-dom';
import { CourseTable } from './courseTable.jsx';

const contentNode = document.getElementById('app');
const config = require('../.ooditconfig.js');

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
    fetch(config.address + 'froyo/frozen_courses?authorization=' + config.authKey)
        .then((response) => {
          return response.json();
        }).then((data) => {
          this.setState({ courses: data });
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

ReactDOM.render(<CourseList />, contentNode);
const appDom = document.getElementById('app')
