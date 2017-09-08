import React from 'react';
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
