import React, { Component } from 'react';
import CourseDownload from './courseDownload.jsx';

export function CourseTable(props) {
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
          <th>Finish date</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>{courseRows}</tbody>
    </table>
  )
}

class CourseRow extends Component {
  constructor() {
    super();
    this.state = {
      visible: true
    }
  }

  hideRow = () => {
    this.setState({ visible: false })
  }

  render() {
    return(
      <tr>

          <td>{this.props.course.code}</td>
          <td>{this.props.course.name}</td>
          <td>{this.props.course.year}</td>
          <td>{this.props.course.term}</td>
          <td>{this.props.course.type}</td>
          <td>{this.props.course.number}</td>
          <td>{this.props.course.responsible}</td>
          <td>{this.props.course.finish_date.slice(0,10)}</td>
          {
            this.state.visible ?
              <td><CourseDownload
              link={this.props.course.code + '.' + this.props.course.year + '.'  + this.props.course.term + '.'
                + this.props.course.type + '.' + this.props.course.number}
                hideRow={this.hideRow}/></td>
              : null
            }
      </tr>
    ) };
}
