const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
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

let currentAccount;

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = "";
  const actions = sort ? movements.slice().sort((a, b) => a - b) : movements;
  actions.forEach((movement, index) => {
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

  btnSort.addEventListener("click", (event) => {
    event.preventDefault();
    displayMovements(currentAccount.movements, !sort);
  });
};

const displayBalance = (movements) => {
  const balance = movements.reduce((acc, item) => {
    return acc + item;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};

const movementsUSD = account1.movements.map((movement) => {
  return Number((movement * 1.1).toFixed(0));
});

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

const displaySummary = (accountSummary) => {
  const income = accountSummary.movements
    .filter((sum) => sum > 0)
    .reduce((accumulator, item) => accumulator + item, 0);

  const expenses = accountSummary.movements
    .filter((sum) => sum < 0)
    .reduce((accumulator, item) => accumulator + item, 0);

  const interest = accountSummary.movements
    .filter((deposit) => deposit > 0)
    .map((deposit) => (deposit * accountSummary.interestRate) / 100)
    .reduce((acc, item) => acc + item, 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(expenses)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

createUser(accounts);
createBalance(accounts);

const updateUI = (account) => {
  displayMovements(account.movements);
  displaySummary(account);
  displayBalance(account.movements);
};

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (account) => account.userName === inputTransferTo.value
  );
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  if (
    amount > 0 &&
    receiver &&
    currentAccount.balance >= amount &&
    receiver.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((movement) => movement >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex((account) => {
      return account.userName === currentAccount.userName;
    });
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

//////////////////////////////////////////////////EXERCISES

// function checkDogs(dogsJulia, dogsKate) {
//   const dogsJuliaCopy = dogsJulia.slice(1, -2); //creates a shallow copy of an array and takes 1st and last 2 elements from an array
//   const dogs = dogsJuliaCopy.concat(dogsKate);
//   dogs.forEach((dog, index) => {
//     console.log(
//       dog >= 3
//         ? `Dog number ${index + 1} is an adult, and is ${dog} years old`
//         : `Dog number ${index + 1} is still a puppy 🐶`
//     );
//   });
//   console.log(dogs);
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// function calcHumanAge(ages) {
//   const humanAge = ages.map((age) => {
//     return age <= 2 ? age * 2 : 16 + age * 4;
//   });
//   const adult = humanAge.filter((dog) => {
//     return dog >= 18;
//   });

//   const average =
//     adult.reduce((accumulator, age) => {
//       return accumulator + age;
//     }, 0) / adult.length;
//   return average;
// }

// const calcAvgHumanAge = (ages) => {
//   const humanAge = ages
//     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter((dog) => dog >= 18)
//     .reduce((acc, item, i, arr) => acc + item / arr.length, 0);
//   return humanAge;
// };

// console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

// console.log(calcHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcHumanAge([16, 6, 10, 5, 6, 1, 4]));

const accountMovements = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((acc, current) => acc + current, 0);
console.log(accountMovements);

const accountMovements2 = accounts
  .flatMap((account) => account.movements)
  .reduce((acc, current) => acc + current, 0);

console.log(accountMovements2);

// a > b return 1
// b > a return -1
movements.sort((a, b) => (a > b ? 1 : -1));
console.log(movements);

const totalDeposits = accounts
  .map((account) => account.movements)
  .flat()
  .filter((action) => action > 0)
  .reduce((accumulator, current) => accumulator + current, 0);

console.log(totalDeposits);

const depositsOverThousand = accounts
  .flatMap((deposit) => deposit.movements)
  .filter((deposit) => deposit >= 1000).length;

console.log(depositsOverThousand);

const depositsOverThousand2 = accounts
  .flatMap((deposit) => deposit.movements)
  //to count instances in an array which meets the condition
  .reduce((count, current) => (current >= 1000 ? count + 1 : count), 0);

console.log(depositsOverThousand2);

const { deposit, withdrawal } = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (sum, current) => {
      current > 0 ? (sum.deposit += current) : (sum.withdrawal += current);
      return sum;
    },
    { deposit: 0, withdrawal: 0 }
  );

console.log({ deposit, withdrawal });

const convertTitleCase = (title) => {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");

  return titleCase;
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

// const createBalance = (userBalance) => {
//     userBalance.forEach((balance) => {
//       balance.balance = balance.movements.reduce((accumulator, item) => {
//         return accumulator + item;
//       }, 0);
//     });
//   };

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

const createFoodPortion = (dogs) => {
  dogs.forEach((dog) => {
    dog.portion = Math.trunc(dog.weight ** 0.75 * 28);
  });
};
createFoodPortion(dogs);
console.log(dogs);

const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.portion ? "much" : "little"
  }`
);

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.portion)
  .map((owner) => owner.owners)
  .flat();

const ownersEatTooLittle = dogs
  .filter((dog) => dog.portion > dog.curFood)
  .map((owner) => owner.owners)
  .flat();
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little`);

console.log(dogs.some((dog) => dog.curFood === dog.portion));
console.log(
  dogs.some(
    (dog) => dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1
  )
);

const dogsEatingOk = dogs.filter(
  (dog) => dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1
);

console.log(dogsEatingOk);

const dogs2 = dogs
  .slice()
  .map((dog) => dog.portion)
  .sort((a, b) => (a > b ? 1 : -1));
console.log(dogs2);
