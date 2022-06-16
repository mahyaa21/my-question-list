import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { NextRouter } from 'next/router';
import { DataSourceInterface } from '../interfaces/entity.interface';
import DataInjector from './DataInjector';
import { ObjectUtils } from './ObjectUtils';

export async function configurableRequest<T extends unknown>(
  requestInstance: AxiosInstance,
  { method, url, header, body }: DataSourceInterface,
  router: NextRouter,
  data: Record<string, any>,
  config?: Record<string, any>,
): Promise<T> {
  const injectedUrl = injectIntoString(url, router, data);
  if (injectedUrl) {
    try {
      const injectedHeaders = injectDataIntoObject(header, router, data);
      const injectedBody = injectDataIntoObject(body, router, data);
      const options: AxiosRequestConfig = {
        method,
        headers: injectedHeaders,
        data: injectedBody,
        url: injectedUrl,
        ...config,
      };
      const response = await requestInstance(options);
      return response.data;
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  } else {
    throw new Error(`couldn't inject data into url, check the url: ${url}`);
  }
}

export function injectDataIntoObject(baseObject, routerParams, data) {
  let injectedObject = {};
  if (typeof baseObject === 'string') {
    const injectedData = injectIntoString(baseObject, routerParams, data);
    if (ObjectUtils.checkIfItsFilled(injectedData)) {
      injectedObject = injectedData;
    } else {
      throw new Error(`couldn't inject data, check the object: ${baseObject}`);
    }
  } else {
    for (const item in baseObject) {
      if (baseObject.hasOwnProperty(item)) {
        const injectedItem = injectIntoString(
          baseObject[item],
          routerParams,
          data,
        );
        if (ObjectUtils.checkIfItsFilled(injectedItem)) {
          injectedObject = ObjectUtils.insertDataIntoObjectByStringPath(
            injectedObject,
            item,
            injectedItem,
          );
        } else {
          throw new Error(
            `couldn't inject data into object "${item}", check the object: ${baseObject[item]}`,
          );
        }
      }
    }
  }
  return injectedObject;
}

export function injectIntoString(
  value: string | undefined,
  router: NextRouter,
  data: Record<string, any>,
): any {
  if (ObjectUtils.checkIfItsFilled(value) && typeof value === 'string') {
    const injectedValue = DataInjector.dataInjector(value, router, data);
    if (injectedValue.successful) {
      return injectedValue.value as string;
    }
  } else if (ObjectUtils.checkIfItsFilled(value) && typeof value !== 'string') {
    return value;
  }
  return value;
}
