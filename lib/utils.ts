import { AxiosResponse } from 'axios';
import getConfig from 'next/config';
import { wrappedLocalStorage } from './hybridStorage';
import { TOKEN } from '../store/constants';
import { RequestInstance } from '../store/request';
import moment from 'moment';

const {
  publicRuntimeConfig: { baseUrl, fileBaseUrl },
} = getConfig();

interface MappedError {
  message: string;
  hasAction: boolean;
}

interface MakeItTwoDigits {
  (value: string, prefix?: string, suffix?: string): string;
  (value: number, prefix?: string, suffix?: string): string;
  (value: string | number, prefix?: unknown, suffix?: unknown): string;
}

interface SeparateWithComma {
  (value?: string): string;
  (value?: number): string;
  (value?: unknown): string;
}

class Utils {
  static separateWithComma: SeparateWithComma = (value) => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  };

  static objectIsEmpty(obj: Record<string, unknown>): boolean {
    return obj ? Object.keys(obj).length === 0 : false;
  }

  // TODO: add the type to method.
  static makeItTwoDigits = (value, prefix = '', suffix = '') => {
    const generatedString = '0'.concat(value).substr(-2, 2);
    return `${prefix}${generatedString}${suffix}`;
  };

  static parseJwt(token = ''): Record<string, any> | null {
    let targetToken = token;
    if (!targetToken) {
      const tokenHolder = wrappedLocalStorage.getItem(TOKEN);
      if (tokenHolder) {
        targetToken = tokenHolder;
      } else {
        return null;
      }
    }

    try {
      const base64Url = targetToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  static calculateRemainingTime(expireDate: number): number {
    return Math.floor((expireDate - (Date.now() + 60000)) / 1000);
  }

  static convertToPersianNumber = (number) => {
    const persianNumber = [
      'صفر',
      'یک',
      'دو',
      'سه',
      'چهار',
      'پنج',
      'شش',
      'هفت',
      'هشت',
      'نه',
      'ده',
    ];
    return persianNumber[number];
  };

  static get isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  static get baseUrl(): string {
    return baseUrl || "http://localhost:3001";
  }

  static get fileBaseUrl(): string {
    return fileBaseUrl;
  }

  static checkIfItsFilled(value) {
    return value !== null && typeof value !== 'undefined';
  }

  static toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }

  static generateDurationTime(time) {
    const date = new Date(time).getTime();
    const today = new Date().getTime();
    const durationTime = today - date;
    if (moment.duration(durationTime).days() !== 0) {
      return `${moment.duration(durationTime).days()} روز پیش `;
    } else if (
      moment.duration(durationTime).days() === 0 &&
      moment.duration(durationTime).hours() !== 0
    ) {
      return `${moment.duration(durationTime).hours()} ساعت پیش`;
    } else if (
      moment.duration(durationTime).hours() === 0 &&
      moment.duration(durationTime).minutes() !== 0
    ) {
      return `${moment.duration(durationTime).minutes()} دقیقه پیش`;
    } else if (
      moment.duration(durationTime).minutes() === 0 &&
      moment.duration(durationTime).seconds() !== 0
    ) {
      return `${moment.duration(durationTime).seconds()} ثانیه پیش`;
    } else if (
      moment.duration(durationTime).seconds() === 0 &&
      moment.duration(durationTime).milliseconds() !== 0
    ) {
      return `هم‌اکنون`;
    } else {
      return '';
    }
  }
}

export default Utils;
