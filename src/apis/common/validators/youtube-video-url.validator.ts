/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'maxNumber', async: false })
export class YoutubeVideoUrlValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    let url = value;
    if (url.includes('youtube.com/shorts')) {
      url = url.replace('/shorts/', '/watch?v=');
    }

    const youtubeVideoUrlRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const youtubeVideoUrlMatch = url.match(youtubeVideoUrlRegExp);

    const valid = url === '' || (youtubeVideoUrlMatch !== null && youtubeVideoUrlMatch[7].length === 11);
    return valid;
  }

  defaultMessage() {
    return '유튜브 URL의 형식이 아닙니다.';
  }
}
