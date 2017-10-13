import moment from 'moment';
moment.locale('fi');

export const formatData = (data) =>  {
  const date = moment(new Date(data[0]['finish_date'])).format('DD.MM.YY');
  const bachelors = data[0]['code'] == 'TKT20013' && data[0]['grade']
    && data[0]['grade'] != '-' && data[0]['grade'] != '0';
  let result = [];
  let courseRows = '';
  let arr = [];
// Used only if course is bachelors thesis
  let tutkimusRows = '';
  let aidinkRows = '';
  let kypsyysRows = '';
  let tutkimusthaku = [];
  let aidinkviestinta =  [];
  let kypsyysnayte =  [];

  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);

    formatRow(data[i]);
    courseRows += rowText(data[i])
    courseRows += '\n';
    console.log(data[i]['grade'])

    if(bachelors) {
      for(var k in data[i]) {
        tutkimusthaku[k]=data[i][k];
        aidinkviestinta[k]=data[i][k];
        kypsyysnayte[k]=data[i][k];
      }
      addTutkimus(tutkimusthaku);
      addAidink(aidinkviestinta);
      addKypsyys(kypsyysnayte);

      tutkimusRows += rowText(tutkimusthaku) + '\n';
      aidinkRows += rowText(aidinkviestinta) + '\n';
      kypsyysRows += rowText(kypsyysnayte) + '\n';
      console.log(aidinkRows);
    }
  }
  console.log(tutkimusthaku);
  if(bachelors) {
    const tutkimusTitle = createTitle(tutkimusthaku, date);
    const aidinkTitle = createTitle(aidinkviestinta, date);
    const kypsyysTitle = createTitle(kypsyysnayte, date);
    result.push(tutkimusTitle, tutkimusRows, aidinkTitle, aidinkRows, kypsyysTitle, kypsyysRows);
  }
  console.log(courseRows)
  const title = createTitle(data[0], date);
  result.push(title, courseRows);
  return result;
}

export const formatRow = (row) => {
  row['finish_date'] = moment(new Date(row['finish_date'])).format('L');
  row['student_id'] = row['student_id'].slice(0,6) +'-' + row['student_id'].slice(6);

  if(!row['grade'] || row['grade'] ==='-' ) row['grade'] = 'Eisa';
  if(row['grade'] === '0') row['grade'] = 'Hyl.';

  if(row['language_id'] == 3) row['language_id'] = 6; // In kurki en=2, oodi en=6
  row['credits'] += ',0';

  if(row['grader_id']) row['grader_id_type'] = '1';

  if(row['code'].includes('CSM')) row['organization_id'] = '500-M009';
  else if(row['code'].includes('DATA')) row['organization_id'] = '500-M010';
  else if(row['code'].includes('TKT')) row['organization_id'] = 'DATA500-K005';
  else row['organization_id'] = 'H523';
}

const rowText = (row) => {
  return row['student_uni_id'] + '#' +
          row['student_id'] + '#' +
          row['language_id'] + '#' +
          row['code'] + '#' +
          row['name'] + '#' +
          row['finish_date'] + '#' +
          row['weeks'] + '#' +
          row['grade'] + '#' +
          '106' + '#' + // grading type code
           '#' + // grading type name
          row['grader_id'] + '#' +
          row['grader_id_type'] + '#' +
          row['organization_id'] + '#' +
          '#' + // other organizations role
          '#' + // other organizationsid
          '#' + // ^ id type
          '#' + //  misc info
          row['credits'];
}

const createTitle = (row, date) => {
  return row['code'] + '%' + date + '-' +  row['type'] +
  row['number'] + '-' + row['semester'] + row['finish_date'].slice(6) + '.dat';
}

const addAidink = (row) => {
  row['code'] = 'TKT50001';
  row['name'] = '\xC4idinkielinen viestint\xE4';
  row['credits'] = '3,0';
  row['grade'] = 'Hyv.';
}

const addTutkimus = (row) => {
  row['code'] = 'TKT50002';
  row['name'] = 'Tutkimustiedonhaku';
  row['credits'] = '1,0';
  row['grade'] = 'Hyv.';
}

const addKypsyys = (row) => {
  row['code'] = 'TKT20014';
  row['name'] = 'Kypsyysn\xE4yte';
  row['credits'] = '0,0';
  row['grade'] = 'Hyv.';
}
