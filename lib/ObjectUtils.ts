function execCondition(
  targetItem,
  key: string,
  operator: string,
  value: string,
): boolean {
  if (key in targetItem) {
    if (operator === '==') {
      return targetItem[key] === value;
    } else if (operator === '!=') {
      return targetItem[key] !== value;
    } else if (operator === '>=') {
      return targetItem[key] >= value;
    } else if (operator === '<=') {
      return targetItem[key] <= value;
    }
  }
  return false;
}

declare function isNaN(number: number);
export class ObjectUtils {
  static resolveStringPathInObject(targetObject, path) {
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path
      .match(/\[(\w+\.(and|or)):(([\w\d]+)(==|!=|<=|>=)([\w\d]+)(\|)?)+\]/g)
      ?.forEach((item) => {
        let replacedValue = item
          .replace('[', '.')
          .replace(']', '')
          .replace(/(\w+\.(and|or)):/, '$1,');
        const constraints = replacedValue.match(
          /([\w\d]+)(==|!=|<=|>=)([\w\d]+)/g,
        );
        constraints.forEach((constraint) => {
          const mappedConstraint = constraint.replace(
            /([\w\d]+)(==|!=|<=|>=)([\w\d]+)/,
            '$1,$2,$3',
          );
          replacedValue = replacedValue.replace(constraint, mappedConstraint);
        });
        replacedValue = replacedValue.replaceAll(/(,)+/g, ',');
        path = path.replace(item, replacedValue);
      });
    path
      .match(/\[(\w+):([\w\d]+)(==|!=|<=|>=)([\w\d]+)\]/g)
      ?.forEach((item) => {
        const replacedValue = item.replace(
          /\[(\w+):([\w\d]+)(==|!=|<=|>=)([\w\d]+)\]/g,
          '.$1,$2,$3,$4',
        );
        path = path.replace(item, replacedValue);
      });
    path = path.replace(/^\./, '');
    const levels = path.split('.');
    for (let item of levels) {
      if (typeof targetObject === 'undefined' || targetObject === null) {
        return null;
      } else if (typeof targetObject === 'string') {
        return targetObject;
      }
      if (item.indexOf(',') > -1) {
        if (item.match(/(\w+-(and|or)),/g)) {
          const [, action, match] = item.match(/((\w+)-(and|or)),/);
          if (action in targetObject) {
            item = item.replace(/((\w+)-(and|or)),/, '');
            const constraints = item.split(/(&&|\|\|)/);
            const predicate = (targetItem) => {
              if (match.toLowerCase() === 'or') {
                return ObjectUtils.checkIfItsFilled(
                  constraints
                    .filter((constraint) => constraint !== '|')
                    .some((constraint) => {
                      const [key, operator, value] = constraint.split(',');
                      return execCondition(targetItem, key, operator, value);
                    }),
                );
              } else if (match.toLowerCase() === 'and') {
                return constraints
                  .filter((constraint) => constraint !== '|')
                  .every((constraint) => {
                    const [key, operator, value] = constraint.split(',');
                    return execCondition(targetItem, key, operator, value);
                  });
              }
              throw new Error(`Unhandled match: ${match}`);
            };
            targetObject = targetObject[action](predicate);
          }
        } else {
          const [action, key, operator, value] = item.split(',');
          if (action in targetObject) {
            const predicate = (targetItem) =>
              execCondition(targetItem, key, operator, value);
            targetObject = targetObject[action](predicate);
          }
        }
      } else if (item in targetObject) {
        targetObject = targetObject[item];
      } else {
        return null;
      }
    }
    return targetObject;
  }

  static insertDataIntoObjectByStringPath(targetObject, path, value) {
    path = path.replace(/\[([\w\+]+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    const levels = path.split('.');
    const currentLevel = levels[0];
    if (levels.length === 1) {
      const justPush = currentLevel.includes('+');
      if (targetObject) {
        if (
          targetObject instanceof Array &&
          justPush &&
          ObjectUtils.checkIfItsFilledAndNotAnEmptyObject(value)
        ) {
          targetObject.push(value);
        } else if (ObjectUtils.checkIfItsFilledAndNotAnEmptyObject(value)) {
          targetObject[currentLevel] = value;
        }
        return targetObject;
      } else if (
        isNaN(currentLevel) &&
        !justPush &&
        ObjectUtils.checkIfItsFilledAndNotAnEmptyObject(value)
      ) {
        return { [currentLevel]: value };
      } else {
        const targetArray: Array<any> = [];
        if (ObjectUtils.checkIfItsFilledAndNotAnEmptyObject(value)) {
          targetArray[justPush ? 0 : currentLevel] = value;
        }
        return targetArray;
      }
    } else {
      if (!targetObject) {
        if (isNaN(currentLevel)) {
          targetObject = {};
        } else {
          targetObject = [];
        }
      }
      levels.shift();
      targetObject[currentLevel] = this.insertDataIntoObjectByStringPath(
        targetObject[currentLevel],
        levels.join('.'),
        value,
      );
      return targetObject;
    }
  }

  static isEmpty(obj) {
    return this.checkIfItsFilled(obj) ? Object.keys(obj).length === 0 : false;
  }

  static checkIfItsFilled(...values) {
    return values.every(
      (value) => value !== null && typeof value !== 'undefined',
    );
  }

  static checkIfItsFilledAndNotAnEmptyObject(...values) {
    return values.every(
      (value) =>
        value !== null &&
        typeof value !== 'undefined' &&
        this.checkIfItsNotAnEmptyObject(value),
    );
  }

  static checkIfItsNotAnEmptyObject(value) {
    if (typeof value === 'object' && !(value instanceof Array)) {
      if (Object.keys(value).length === 0) {
        return false;
      }
    }
    return true;
  }

  static removeNulls(data): any {
    if (this.checkIfItsFilled(data)) {
      if (typeof data === 'object' && !(data instanceof Array)) {
        const targetObject = {};
        for (const item in data) {
          if (data.hasOwnProperty(item) && this.checkIfItsFilled(data[item])) {
            targetObject[item] = this.removeNulls(data[item]);
          }
        }
        return targetObject;
      } else if (data instanceof Array) {
        const targetArray: Array<any> = [];
        data.forEach((item) => {
          const cleanItem = this.removeNulls(item);
          if (this.checkIfItsFilled(cleanItem)) {
            targetArray.push(cleanItem);
          }
        });
        return targetArray;
      } else {
        return data;
      }
    } else {
      return null;
    }
  }
}

export default ObjectUtils;
