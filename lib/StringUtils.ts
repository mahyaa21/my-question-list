import {ObjectUtils} from './ObjectUtils';

export class StringUtils {
  static clearAndUpper(text) {
    return text.replace(/([_-]+)/, ' ').toUpperCase();
  }

  static isItFilled(...values) {
    return values.every(value => ObjectUtils.checkIfItsFilled(value) && value !== '')
  }

  static nameToTitle(prefix, name, ...suffixes) {
    return `${prefix && prefix !== '' ? `${prefix} ` : ''}${name.replace(
      /(^\w|[-_]+\w)/g,
      this.clearAndUpper,
    )}${
      ObjectUtils.checkIfItsFilled(suffixes) ? ` ${suffixes.join(' ')}` : ''
    }`;
  }
}
