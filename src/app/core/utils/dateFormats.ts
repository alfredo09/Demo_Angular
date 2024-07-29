import * as moment from 'moment';
import { environment } from '../environments/environment.development';
const formatDB = 'YYYY-MM-DD';
const formatDate = environment.formatDate;
export function toDMYdateFormat(date: any) {
  if (date) return moment(date).format(formatDate);
  else return '';
}

export function toYMDdateFormat(date: string) {
  if (date) return moment(date, environment.formatDate).format(formatDB);
  else return '';
}

export function isDateDBFormatValid(date: string) {
  if (date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  } else {
    return '';
  }
}

export function typeDate(date: string) {
  if(date){
    const toYMDdateFormat = moment(date, environment.formatDate).format(formatDB);
    return moment(toYMDdateFormat, `${formatDB} hh:mm:ss`).toDate();
  } else {
    return null;
  }
}

export function typeDateForFilters(date: string) {
  if (date) return moment(date).toDate();
  else return '';
}

export function formatDateTable(formatEnv: string) {
  return formatEnv.replaceAll('DD', 'dd');
}

export function defaultDate(){
  return moment().format(environment.formatDate);
}

export function defaultYear(){
  return moment().format('YYYY');
}
