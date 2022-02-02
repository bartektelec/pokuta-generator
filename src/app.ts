interface ISin {
  id: number;
  name: string;
  cost: number;
}

const sins: ISin[] = [
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

// state
let selectedSins: number[] = [];
let weeksSinceLastTime: number = 0;

const sinsWrapper = document.querySelector('#fieldset-sins')!;

const updatePrice = () => {
  let sum = 0;

  for (let id of selectedSins) {
    const current = sins.find((sin) => sin.id === id);

    if (!current) continue;
    sum += current.cost;
  }

  document.querySelector(
    '#result'
  )!.textContent = `Ostatni raz u spowiedzi bylem ${weeksSinceLastTime} i zaplace ${sum}`;
};

const toggleSinChange = (sin: ISin, isChecked: boolean) => {
  if (!isChecked) {
    selectedSins = selectedSins.filter((item) => item !== sin.id);
  } else {
    selectedSins = [...selectedSins, sin.id];
  }

  updatePrice();
};

const createSinCheckbox = (input: ISin): Node => {
  const element = document.createElement('div');
  const labelElement = document.createElement('label');
  const inputElement = document.createElement('input');

  const uid = `sin-${input.id}`;

  labelElement.innerText = input.name;
  labelElement.setAttribute('for', uid);

  inputElement.type = 'checkbox';
  inputElement.id = uid;
  inputElement.addEventListener('change', (e) => {
    const el = <HTMLInputElement>e.currentTarget;
    toggleSinChange(input, el.checked);
  });

  element.append(labelElement, inputElement);

  return element;
};

document.querySelector('#form-date-since')?.addEventListener('change', (e) => {
  const el = <HTMLInputElement>e.target;

  const today = new Date();

  const result = Number(new Date(el.value)) - Number(today);

  const MS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7;

  if (result >= 0) weeksSinceLastTime = 1;

  weeksSinceLastTime = Math.floor(Math.abs(result) / MS_IN_A_WEEK);

  updatePrice();
});

sinsWrapper.append(...sins.map((sin) => createSinCheckbox(sin)));
