import moment from 'moment';
moment.locale('fi');
// Returns the data in the correct form for the file
export const formatData = (data) =>  {
  let result
  let fileText = '';
  const date = moment(new Date(data[0]['finish_date'])).format('DD.MM.YY');
  for (var i = 0; i < data.length; i++) {
    formatRow(data[i]);
    fileText += data[i]['student_uni_id'] + '#' +
            data[i]['student_id'] + '#' +
            data[i]['language_id'] + '#' +
            data[i]['code'] + '#' +
            data[i]['name'] + '#' +
            data[i]['finish_date'] + '#' +
            data[i]['weeks'] + '#' +
            data[i]['grade'] + '#' +
            '106' + '#' + // grading type code
             '#' + // grading type name
            data[i]['grader_id'] + '#' +
            data[i]['grader_id_type'] + '#' +
            data[i]['organization_id'] + '#' +
            '#' + // other organizationsid
            '#' + // ^ id type
            '#' + //  misc info
            data[i]['credits'];

    fileText += '\n';
  }
  const title = data[0]['code'] + '%' + date + '-' +  data[0]['type'] +
    data[0]['number'] + '-' + data[0]['semester'] + data[0]['finish_date'].slice(6) + '.dat';
  result = [title, fileText];
  return result;
}

export const formatRow = (row) => {
  row['finish_date'] = moment(new Date(row['finish_date'])).format('L');
  row['student_id'] = row['student_id'].slice(0,6) +'-' + row['student_id'].slice(6);

  if(!row['grade'] || row['grade'] ==='-' ) row['grade'] = 'Eisa';
  if(row['grade'] === '0') row['grade'] = 'Hyl.';

  // In kurki en=2, oodi en=6
  if(row['language_id'] == 3) row['language_id'] = 6;
  row['credits'] += ',0';

  if(row['grader_id']) row['grader_id_type'] = '1';

  if(row['code'].includes('CSM')) row['organization_id'] = '500-M009';
  else if(row['code'].includes('DATA')) row['organization_id'] = '500-M010';
  else if(row['code'].includes('TKT')) row['organization_id'] = 'DATA500-K005';
  else row['organization_id'] = 'H523';
}
