export type TStateObject<T = any> = {
  current: T;
  bind: (
    target: { update: (key: string, value: T) => void },
    key: string
  ) => void;
  watch: (fn: () => void) => void;
};

export const watch = (deps: TStateObject[], fn: () => void) => {
  deps.forEach((dep) => dep.watch(fn));
};

export const state = <T>(initialValue: T) => {
  let state = initialValue;
  let bound: {
    target: { update: (key: string, value: T) => void };
    key: string;
  }[] = [];
  let watchers: (() => void)[] = [];

  const setState = (newValue: T) => {
    state = newValue;
    bound.forEach((elem) => elem.target.update(elem.key, newValue));
    watchers.forEach((fn) => fn());
  };

  const result: [TStateObject<T>, (newValue: T) => void] = [
    {
      get current() {
        return state;
      },
      bind: (target, key) => {
        bound = [...bound, { target, key }];
      },
      watch: (fn: () => void) => {
        watchers = [...watchers, fn];
      },
    },
    setState,
  ];

  return result;
};
