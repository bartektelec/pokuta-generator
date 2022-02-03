import { state, watch } from './state';
import { c, t } from './component';

import sinsList, { sins } from './sins';

const [lastTime, setLastTime] = state<string>('');
const [pokutaDone, setPokutaDone] = state<boolean>(false);
const [isRegret, setIsRegret] = state<boolean>(false);
const [list, setList] = state<number[]>([]);
const [sum, setSum] = state<number>(0);

const calculatePrice = () => {
  const mappedSins = list.current.map(
    (x) => sins.find((item) => item.id === x)!
  );
  const sumSins = mappedSins.reduce((acc, curr) => acc + curr?.cost, 0);

  let result = sumSins;

  if (!pokutaDone.current) result += 50;
  if (!isRegret.current) result += 20;

  const then = Number(new Date(lastTime.current));
  const today = Date.now();

  const dateDiff = today - then;

  let WEEKS_SINCE = 1;
  if (dateDiff > 0)
    WEEKS_SINCE = Math.floor(Math.abs(dateDiff) / (1000 * 60 * 60 * 24 * 7));

  result += WEEKS_SINCE * 5;

  setSum(result);
};

watch([lastTime, pokutaDone, isRegret, list], calculatePrice);

const form = c('form', { target: '#' }, [
  c('fieldset', {}, [
    c('label', { for: 'last-time' }, [t('Ostatni raz bylem u spowiedzi')]),
    c('input', { id: 'last-time', type: 'date' }, []).on('change', (e) =>
      setLastTime((e.currentTarget as HTMLInputElement).value)
    ),
    c('label', { for: 'last-pokuta-done' }, [t('Pokute zadana wykonalem')]),
    c('input', { id: 'last-pokuta-done', type: 'checkbox' }, [
      t('Ostatni raz bylem u spowiedzi'),
    ])
      .on('change', (e) =>
        setPokutaDone((e.currentTarget as HTMLInputElement).checked)
      )
      .bind(pokutaDone, 'checked'),
    c('label', { for: 'is-regret' }, [t('Bylo zalowane')]),
    c('input', { id: 'is-regret', type: 'checkbox' }, []).on('change', (e) =>
      setIsRegret((e.currentTarget as HTMLInputElement).checked)
    ),
  ]),
  c('fieldset', {}, [sinsList(list, setList)]),
  c('div', {}, [t('Tyle kosztuje kurwa rozgrzeszenie:  '), t(sum)]),
]);

const app = c('main', {}, [c('h1', {}, [t('Generator pokuty')]), form]);

document.querySelector('#root')?.append(app.render());
