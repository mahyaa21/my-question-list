export class NumberUtils {
  static makeItTwoDigits(value, prefix = '', suffix = '') {
    const generatedString = '0'.concat(value).substr(-2, 2);
    return `${prefix}${generatedString}${suffix}`;
  }

  static separateWithComma(value, step = 3) {
    if (value) {
      const pattern = new RegExp(`\B(?=(\d{${step})+(?!\d))`, 'g');
      return value.toString().replace(pattern, ',');
    } else {
      return '';
    }
  }
}
