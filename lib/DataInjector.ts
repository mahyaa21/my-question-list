import { NextRouter } from 'next/router';
import { wrappedLocalStorage } from './hybridStorage';
import { ObjectUtils } from './ObjectUtils';

const TimeMapper = {
  y: 3600 * 24 * 365,
  m: 3600 * 24 * 3,
  w: 3600 * 24 * 7,
  d: 3600 * 24,
  h: 3600,
  i: 60,
  s: 1,
};

export default class DataInjector {
  public static dataInjector(
    value: string,
    router: NextRouter,
    params?: Record<string, any>,
  ): InjectedInterface {
    let errorStatus = false;
    const pattern = {
      global: new RegExp(
        /\${(url|data|localStorage|unixDate|isoDate):([\d\w-]+)(\(\w+:\w+\))?}/g,
      ),
      pure: new RegExp(
        /\${(url|data|localStorage|unixDate|isoDate):([\d\w-]+)(\(\w+:\w+\))?}/,
      ),
    };
    const wholeObjectPattern = {
      global: new RegExp(/\${(url|data|localStorage|details)}/g),
      pure: new RegExp(/\${(url|data|localStorage|details)}/),
    };

    let mappedData: string | null = value;

    const globalMatched = value.match(pattern.global);
    if (ObjectUtils.checkIfItsFilled(globalMatched)) {
      globalMatched?.forEach(item => {
        const matchedData = mappedData?.match(pattern.pure);
        const action = matchedData ? matchedData[1] : null;
        mappedData =
          action == null
            ? mappedData
            : this.mapperFactory(action, mappedData || '', router, params);
      });
    } else if (value.match(wholeObjectPattern.global)) {
      const matchedData = value.match(wholeObjectPattern.pure);
      const action = matchedData ? matchedData[1] : null;

      mappedData = this.mapperFactory(action, value, router, params);
    }

    if (typeof mappedData === 'string' && mappedData?.match(pattern.global)) {
      errorStatus = true;
    }

    return {
      successful: !errorStatus,
      value: mappedData,
    };
  }

  private static mapperFactory(
    action: string | null,
    value: string,
    router: NextRouter,
    params?: Record<string, any>,
  ): string | null {
    if (action === 'url') {
      return this.urlMapper(value, router);
    } else if (params && action === 'data') {
      return this.dataMapper(value, params);
    } else if (action === 'unixDate') {
      return this.unixDateMapper(value);
    } else if (action === 'isoDate') {
      return this.isoDateMapper(value);
    } else if (action === 'localStorage') {
      return this.localStorageMapper(value);
    }
    return null;
  }

  private static localStorageMapper(value: string) {
    // @ts-ignore
    for (const item of value.match(/\${localStorage:([\w\d]+)}/g)) {
      // @ts-ignore
      value = value.replace(
        item,
        // @ts-ignore
        wrappedLocalStorage.getItem(
          // @ts-ignore
          item.match(/\${localStorage:([\w\d]+)}/)[1],
        ),
      );
    }
    return value;
  }

  private static isoDateMapper(value: string) {
    // @ts-ignore
    for (const item of value.match(/\${isoDate:([\w\d-]+)(\(\w+:\w+\))?}/g)) {
      const extractedValues = item.match(
        /\${isoDate:([\w\d-]+)(\(\w+:\w+\))?}/,
      );
      if (extractedValues) {
        const param: string = extractedValues[1];
        if (param === 'now') {
          value = value.replace(item, new Date().toISOString());
        } else {
          let baseDate = new Date();
          if (extractedValues[2]) {
            // @ts-ignore
            const targetTime = extractedValues[2].match(/\w+:\w+/g)[0];
            // @ts-ignore
            const mappedDate: string = this.mapperFactory(
              targetTime.split(':')[0],
              `\${${targetTime}}`,
            );
            if (!Number.isNaN(Number(mappedDate))) {
              baseDate = new Date(mappedDate);
            } else {
              baseDate = new Date(Number(mappedDate));
            }
          }
          const number: number = parseInt(param, 10);
          const unit: string = param.substr(param.length - 1);
          const seconds = TimeMapper[unit] * number;
          value = value.replace(
            item,
            new Date(baseDate.getTime() + seconds * 1000).toISOString(),
          );
        }
      }
    }
    return value;
  }

  private static unixDateMapper(value: string) {
    // @ts-ignore
    for (const item of value.match(/\${unixDate:([\w\d-]+)}/g)) {
      // @ts-ignore
      const param: string = item.match(/\${unixDate:([\w\d-]+)}/)[1];
      if (param === 'now') {
        value = value.replace(item, new Date().toISOString());
      } else {
        const number: number = parseInt(param, 10);
        const unit: string = param.substr(param.length - 1);
        const seconds = TimeMapper[unit] * number;
        value = value.replace(item, (Date.now() + seconds * 1000).toString());
      }
    }
    return value;
  }

  private static dataMapper(value: string, params: Record<string, any>) {
    // @ts-ignore
    for (const item of value.match(/\${data:([\w\d]+)}/g)) {
      // @ts-ignore
      if (!(typeof params[item.match(/\${data:([\w\d]+)}/)[1]] === 'object')) {
        // @ts-ignore
        value = value.replace(
          item,
          // @ts-ignore
          params[item.match(/\${data:([\w\d]+)}/)[1]],
        );
      } else {
        // @ts-ignore
        value = params[item.match(/\${data:([\w\d]+)}/)[1]];
      }
    }
    return value;
  }

  private static urlMapper(value: string, router: NextRouter) {
    // @ts-ignore
    for (const item of value.match(/\${url:(\w*|\d*)}/g)) {
      // @ts-ignore
      const param = router.query[item.match(/\${url:(\w*|\d*)}/)[1]] as string;
      value = value.replace(item, param);
    }
    return value;
  }
}
interface InjectedInterface {
  value: string | null;
  successful: boolean;
}
