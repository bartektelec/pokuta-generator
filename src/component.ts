import type { TStateObject } from './state';

export const c = (
  tag: keyof HTMLElementTagNameMap,
  options: Record<string, any>,
  children: (Node | { render: () => Node })[]
) => {
  const element = document.createElement(tag);

  Object.entries(options).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  element.append(
    ...children.map((item) => (item instanceof Node ? item : item.render()))
  );

  return {
    render: () => element,
    update: <T extends typeof element, K extends keyof T>(
      key: any,
      value: string
    ) => {
      element[key] = value;
      element.setAttribute(key, value);
    },
    bind: function (state: TStateObject, key: string) {
      state.bind(this, key);
      return this;
    },
    on(name: string, fn: (e: Event) => void) {
      element.addEventListener(name, fn);
      return this;
    },
  };
};

export const t = (text: string | TStateObject) => {
  let element = document.createTextNode('');

  const result = {
    render: () => element,
    update: (key: any, value: string) => {
      element.textContent = value;
    },
    bind: function (state: TStateObject, key: string) {
      state.bind(this, key);
      return this;
    },
  };

  if (typeof text === 'string') {
    element.textContent = text;
  } else {
    result.bind(text, 'textContent');
    element.textContent = text.current;
  }
  return result;
};
