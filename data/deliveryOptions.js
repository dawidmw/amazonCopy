import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];


export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
};


export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();

  let remainingDeliveryDays = deliveryOption.deliveryDays;
  let nextDay = today.add(1, 'days');

  while (remainingDeliveryDays > 0) {
    const nextDayString = nextDay.format('dddd');
    if (nextDayString === "Saturday" || nextDayString === "Sunday") {
      nextDay = nextDay.add(1, 'days');
    } else {
      remainingDeliveryDays -= 1
      nextDay = nextDay.add(1, 'days');
    }
  }

  const deliveryDate = nextDay.subtract(1, 'days');
  return deliveryDate.format('dddd, MMM D');
};
