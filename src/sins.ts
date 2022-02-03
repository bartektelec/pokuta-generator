import { c, t } from './component';
import { state, TStateObject } from './state';

interface ISin {
  id: number;
  name: string;
  cost: number;
}

export const sins: ISin[] = [
  {
    id: 0,
    name: 'Pycha',
    cost: 10,
  },
  {
    id: 1,
    name: 'Chciwość',
    cost: 30,
  },
  {
    id: 2,
    name: 'Nieczystość',
    cost: 50,
  },
  {
    id: 3,
    cost: 15,
    name: 'Zazdrość',
  },
  {
    id: 4,
    cost: 30,
    name: 'Nieumiarkowanie w jedzeniu i piciu',
  },
  {
    id: 5,
    cost: 2,
    name: 'Gniew',
  },
  {
    id: 6,
    cost: 80,
    name: 'Lenistwo',
  },
];

const component = (list: TStateObject<number[]>, setState: (v: any) => void) =>
  c('div', {}, [
    ...sins.map((sin) =>
      c('div', {}, [
        c('label', { for: `sin-${sin.id}` }, [t(sin.name)]),
        c('input', { type: 'checkbox', id: `sin-${sin.id}` }, []).on(
          'change',
          (e) => {
            const target = <HTMLInputElement>e.currentTarget;
            if (!target.checked) {
              setState(list.current.filter((x) => x !== sin.id));
            } else {
              setState([...list.current, sin.id]);
            }
          }
        ),
      ])
    ),
  ]);

export default component;
