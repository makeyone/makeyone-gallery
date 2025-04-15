import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de.json'; // de
import en from 'javascript-time-ago/locale/en.json'; // en-US
import es from 'javascript-time-ago/locale/es.json'; // es
import ko from 'javascript-time-ago/locale/ko'; // ko
import zhHant from 'javascript-time-ago/locale/zh-Hant.json'; // zh-TW, zh-HK
import zh from 'javascript-time-ago/locale/zh.json'; // zh-CN

TimeAgo.addLocale(en);
TimeAgo.addLocale(ko);
TimeAgo.addLocale(zhHant);
TimeAgo.addLocale(zh);
TimeAgo.addLocale(es);
TimeAgo.addLocale(de);

const timeAgoLocaleMap: Record<string, string> = {
  ko: 'ko',
  'en-US': 'en',
  es: 'es',
  de: 'de',
  'zh-CN': 'zh',
  'zh-TW': 'zh-Hant',
  'zh-HK': 'zh-Hant',
};

const getClientLocale = (): string => {
  const match = document.cookie.split('; ').find((row) => row.startsWith('NEXT_LOCALE='));

  return match?.split('=')[1] || 'en-US';
};

const timeAgo = (dateString: string): string => {
  if (typeof document === 'undefined') return '...';

  const currentLanguage = getClientLocale();
  const locale = timeAgoLocaleMap[currentLanguage];

  const timeAgo = new TimeAgo(locale);
  return timeAgo.format(new Date(dateString));
};

export default timeAgo;
