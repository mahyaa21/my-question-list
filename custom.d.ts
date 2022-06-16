// / <reference path="typings/styled-patch.d.ts" />

declare module '*.json' {
  const content: any;
  export = content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: {
    [className: string]: string;
  };
  export default content;
}

declare module '*.scss' {
  const content: {
    [className: string]: string;
  };
  export default content;
}

type InheritedStylesheetRules = {
  [className: string]: string | InheritedStylesheetRules;
};
