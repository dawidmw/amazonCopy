import { formatCurrency } from '../../scripts/utils/money.js';


console.log('%ctest suite: formatCurrency', "font-size:16px;")

console.log('converts cents into dollars')

if (formatCurrency(2095) === '20.95') {
  console.log("passed");
} else {
  console.log("%cfailed", "color:red;");
}

console.log('works with zero?')

if (formatCurrency(0) === '0.00') {
  console.log("passed");
} else {
  console.log("%cfailed", "color:red;");
}

console.log('rounds up to the nearest cent')

if (formatCurrency(2000.5) === '20.01') {
  console.log("passed");
} else {
  console.log("%cfailed", "color:red;");
}

console.log('rounds down to the nearest cent')

if (formatCurrency(2000.4) === '20.00') {
  console.log("passed");
} else {
  console.log("%cfailed", "color:red;");
}