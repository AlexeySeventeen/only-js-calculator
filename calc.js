const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const allSign = document.querySelectorAll('[data-sign]');
const allNumber = document.querySelectorAll('[data-number]');
const equal = document.querySelector('#equal');
const values = document.querySelector('#values');
const clear = document.querySelector('#clear');
const clearAll = document.querySelector('#clearAll');
const signChange = document.querySelector('#signChange');
const sqrt = document.querySelector('#sqrt');

let x, y, thisSign;

function emptyAfterEqual() {
  input1.classList.remove('none');
  input2.classList.add('none');
  input2.value = '';
}

// work with numbers btn
allNumber.forEach((number) => {
  number.addEventListener('click', () => {
    // write in first input
    if (input2.classList.contains('none')) {
      input1.value += number.textContent;
    }
    // write in second input
    if (input1.classList.contains('none')) {
      input2.value += number.textContent;
    }
  });
});

// work with sign
function signClick() {
  // input change
  x = +input1.value;
  input1.classList.add('none');
  input2.classList.remove('none');
  // values between
  values.textContent = `${x} ${thisSign}`;
  // remove focus on input
  input2.focus();
}
// btn sign
allSign.forEach((sign) => {
  sign.addEventListener('click', () => {
    // what sign
    thisSign = sign.textContent;

    signClick();
  });
});
// keybord sign
input1.addEventListener('keydown', (e) => {
  // what sign
  if (e.key === '+') {
    thisSign = '+';
    signClick();
  }
  if (e.key === '-') {
    thisSign = '-';
    signClick();
  }
  if (e.key === '*') {
    thisSign = '*';
    signClick();
  }
  if (e.key === '/') {
    thisSign = '/';
    signClick();
  }
  if (e.key === '^') {
    thisSign = '^';
    signClick();
  }
});

// clear all
clearAll.addEventListener('click', () => {
  emptyAfterEqual();
  input1.value = '';
  values.textContent = ``;
});

// clear last symbol
clear.addEventListener('click', () => {
  // delete in first input
  if (input2.classList.contains('none')) {
    input1.value = input1.value.slice(0, -1);
  }
  // delete in second input
  if (input1.classList.contains('none')) {
    input2.value = input2.value.slice(0, -1);
  }
});

function chahgeSign(sign) {
  if (typeof +sign.value[0] === 'number') {
    sign.value = -+sign.value;
  }
}

// chahge sign
signChange.addEventListener('click', function () {
  if (input2.classList.contains('none')) {
    chahgeSign(input1);
  }
  // delete in second input
  if (input1.classList.contains('none')) {
    chahgeSign(input2);
  }
});

// sqrt
sqrt.addEventListener('click', function () {
  x = +input1.value;

  if (input2.classList.contains('none')) {
    input1.value = Math.sqrt(x);
  }
  // write in second input
  if (input1.classList.contains('none')) {
    equalResult(true);
    emptyAfterEqual();
  }
});

// equal
function equalResult(sqrt) {
  y = +input2.value;
  // delete minus from keyboard

  // y for sqrt
  if (sqrt === true) {
    y = Math.sqrt(y);
  }

  if (thisSign === '+') {
    input1.value = x + y;
  }
  if (thisSign === '-') {
    input1.value = x - y;
  }
  if (thisSign === '*') {
    input1.value = x * y;
  }
  if (thisSign === '/') {
    input1.value = x / y;
  }
  if (thisSign === '^') {
    input1.value = Math.pow(x, y);
  }

  emptyAfterEqual();
  values.textContent = `${x} ${thisSign} ${y} =`;
  // focus on input
  input1.focus();
}

// equal with Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    equalResult();
  }
});

// equal with btn
equal.addEventListener('click', () => {
  equalResult();
});
