import test from 'ava';
import { courses } from './testData/testDataCourses.js';
import { bachelorParticipants, dataParticipants, csmParticipants, testParticipants } from './testData/testDataParticipants.js';
import { formatRow, formatData } from '../src/formatData.jsx';
require("babel-core/register");
require("babel-polyfill");

test.before(r => {
	formatRow(csmParticipants[1]);
	formatRow(dataParticipants[1]);
	formatRow(bachelorParticipants[0]);
});

test('one row is formatted correctly', t => {
	t.is(testParticipants[1]['student_id'], '070785-441A');
	t.is(testParticipants[1]['credits'], '6,0');
});

test('date formats correctly', t => {
	t.is(testParticipants[1]['finish_date'], '13.09.2017',
		'Date needs to be in form dd.mm.yyyy');
});

test('org_id in a course with old code is correct', t => {
	t.is(testParticipants[1]['organization_id'], 'H523',
		'needs to be H523 when code is only numbers');
});

test('grader_id_type is correct', t => {
	t.is(testParticipants[1]['grader_id_type'], '1',
		'needs to be 1 when grader_id number is available');
});

test('CSM Course org_id is correct ', t => {
	t.is(csmParticipants[1]['organization_id'], '500-M009',
		'needs to be 500-M009 when course code begins with CSM');
});

test('DATA Course org_id is correct ', t => {
	t.is(dataParticipants[1]['organization_id'], '500-M010',
	'needs to be 500-M010 when course code begins with DATA');
});

test('Bachelor courses org_id is correct ', t => {
	t.is(bachelorParticipants[0]['organization_id'], 'DATA500-K005',
	'needs to be DATA500-K005 when course code begins with TKT');
});

test('missing or - grade results in "Eisa"', t => {
	t.is(testParticipants[0]['grade'], 'Eisa');
});

test('0 grade results in "Hyl."', t => {
	t.is(testParticipants[2]['grade'], 'Hyl.');
});
