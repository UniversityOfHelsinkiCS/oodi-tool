import moment from 'moment';
moment.locale('fi');

export const formatData = (data) =>  {
  const date = moment(new Date(data[0]['finish_date'])).format('DD.MM.YY');
  const bachelors = data[0]['code'] == 'TKT20013';
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
  let title = '';

  for (var i = 0; i < data.length; i++) {
    if(!data[i]['grade'] || data[i]['grade'] ==='-' ) {
      continue
    }
    formatRow(data[i]);
    courseRows += rowText(data[i])
    courseRows += '\n';

    if(bachelors && data[i]['grade'] != '0') {
      if(data[i]['harjoitustyopisteet'].charAt(4) != '?') {
        alert('Student needs attention! Only thesis credits will be generated for student '
        + data[i]['student_uni_id'] + '. \nContact course admin to find out what needs to be done.');
      } else {
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
      }
    }
    if(title.length==0) title = createTitle(data[i], date);
  }
  // Doesn't create extra files if all bachelors are exceptional
  if(bachelors && tutkimusthaku.length > 1) {
    const tutkimusTitle = createTitle(tutkimusthaku, date);
    const aidinkTitle = createTitle(aidinkviestinta, date);
    const kypsyysTitle = createTitle(kypsyysnayte, date);
    result.push(tutkimusTitle, tutkimusRows, aidinkTitle, aidinkRows, kypsyysTitle, kypsyysRows);
  }
  result.push(title, courseRows);
  return result;
}

export const formatRow = (row) => {
  row['finish_date'] = moment(new Date(row['finish_date'])).format('L');
  
  if(row['grade'] === '0') row['grade'] = 'Hyl.';
  if(row['grade'] === '+') row['grade'] = 'Hyv.';

  if(row['language_id'] == 3) row['language_id'] = 6; // In kurki en=3, oodi en=6
  if(row['student_credits']) row['credits'] = row['student_credits']; 
  row['credits'] += ',0';

  if(row['code'].includes('CSM')) row['organization_id'] = '500-M009';
  else if(row['code'].includes('DATA')) row['organization_id'] = '500-M010';
  else if(row['code'].includes('TKT')) row['organization_id'] = '500-K005';
  else row['organization_id'] = 'H523';

// If grader's social security number is not in Kurki, use Organisation ID 
  if(row['grader_id']) {
    row['grader_id_type'] = '1'
  } else {
    row['grader_id_type'] = '3'
    row['grader_id'] = row['organization_id']
  }
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
