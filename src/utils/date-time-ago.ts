import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addLocale(ko);

export default (dateString: string): string => {
  const timeAgo = new TimeAgo('ko');
  return timeAgo.format(new Date(dateString));
};
