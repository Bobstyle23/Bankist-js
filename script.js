const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = (movements) => {
  containerMovements.innerHTML = "";
  movements.forEach((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
         <div class="movements__row">
           <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
           <div class="movements__value">${movement}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

const movementsUSD = account1.movements.map((movement) => {
  return Number((movement * 1.1).toFixed(0));
});
console.log(movementsUSD);

const createUser = (account) => {
  account.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

const createBalance = (userBalance) => {
  userBalance.forEach((balance) => {
    balance.balance = balance.movements.reduce((accumulator, item) => {
      return accumulator + item;
    }, 0);
  });
};

const displaySummary = (summary) => {
  const income = summary
    .filter((sum) => sum > 0)
    .reduce((accumulator, item) => accumulator + item, 0);

  const expenses = summary
    .filter((sum) => sum < 0)
    .reduce((accumulator, item) => accumulator + item, 0);

  const interest = summary
    .filter((deposit) => deposit > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .reduce((acc, item) => acc + item, 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(expenses)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

createUser(accounts);
createBalance(accounts);
displaySummary(account1.movements);

labelBalance.textContent = `${account1.balance}€`;

const deposits = movements.filter((item) => item > 0);
console.log(deposits);

const withdrawals = movements.filter((item) => item < 0);
console.log(withdrawals);

const balance = movements.reduce((accumulator, item) => {
  return accumulator + item;
}, 0);

// function checkDogs(dogsJulia, dogsKate) {
//     const dogsJuliaCopy = dogsJulia.slice(1, -2); //creates a shallow copy of an array and takes 1st and last 2 elements from an array
//     const dogs = dogsJuliaCopy.concat(dogsKate)
//     dogs.forEach((dog, index) => {
//         console.log(dog >= 3 ? `Dog number ${index + 1} is an adult, and is ${dog} years old` : `Dog number ${index + 1} is still a puppy 🐶`)
//     })
//     console.log(dogs);
// }
//
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])

function calcHumanAge(ages) {
  const humanAge = ages.map((age) => {
    return age <= 2 ? age * 2 : 16 + age * 4;
  });
  const adult = humanAge.filter((dog) => {
    return dog >= 18;
  });

  const average =
    adult.reduce((accumulator, age) => {
      return accumulator + age;
    }, 0) / adult.length;
  return average;
}

const calcAvgHumanAge = (ages) => {
  const humanAge = ages
    .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter((dog) => dog >= 18)
    .reduce((acc, item, i, arr) => acc + item / arr.length, 0);
  return humanAge;
};

console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

console.log(calcHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcHumanAge([16, 6, 10, 5, 6, 1, 4]));
