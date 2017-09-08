// Returns the data in the correct form for the file
export const formatData = (data) =>  {
  let row = [];
  let result = '';
  for (var i = 0; i < data.length; i++) {
    console.log(data);
    formatRow(data[i]);
    result += data[i]['student_uni_id'] + '#' +
            data[i]['student_id'] + '#' +
            data[i]['language_id'] + '#' + // This is not right
            data[i]['code'] + '#' +
            data[i]['name'] + '#' +
            data[i]['finish_date'] + '#' +
            data[i]['weeks'] + '#' +
            data[i]['grade'] + '#' +
            '' + '#' + // grading type code
            data[i]['grader_id'] + '#' +
            data[i]['grader_id_type'] + '#' +
            data[i]['organization_id'] + '#' +
            '' + '#' + // other organizationsid
            '' + '#' + // ^ id type
            '' + '#' + //  misc info
            data[i]['number'] + '#' +
            data[i]['credits'];

    // row = Object.values(data[i]);
    // for (var j = 0; j < row.length; j++) {
    //   result += row[j] + '#';
    // }

    result += '\n';
    // row = [];
  }
  return result;
}

// Formats student_id and date in the right form.
// TODO: Checks if grader_id exists
// if exists: deletes grader_uni_id and sets hyväksyjän tunnuksen type to 1
// else deletes grader_id uses some other id (to find out) and sets type
// according to that
// TODO: Does the - need to be added if it's not there? (it is on test data)
const formatRow = (row) => {
  row['finish_date'] = new Date(row['finish_date']).toLocaleDateString();
  row['student_id'] = row['student_id'].slice(0,6) +'-' + row['student_id'].slice(6);

  if(!row['grade'] || row['grade'] ==='-' ) row['grade'] = 'Eisa';
  if(row['grade'] === '0') row['grade'] = 'Hyl.';

  row['credits'] += ',0';

  if(row['grader_id']) row['grader_id_type'] = '1';
  else if(row['grader_uni_id']) {
    row['grader_id'] = row['grader_uni_id']; // grader_uni_id is not correct rn
    row['grader_id_type'] = '2';
  }

  if(row['code'].includes('CSM')) row['organization_id'] = 'CSM';
  else if(row['code'].includes('DATA')) row['organization_id'] = 'DATA';
  else row['organization_id'] = 'H523';




}
