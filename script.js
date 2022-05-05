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
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
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

const checkDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCopy = dogsJulia.slice().splice(1, 2);
  const dogs = dogsJuliaCopy.concat(dogsKate);
  // const dogs = [...dogsJuliaCopy, ...dogsKate];
  const checkDogAges = dogs.filter((dog, index) => {
    return dog >= 3
      ? console.log(`Dog number ${index + 1} is an adult`)
      : console.log(`Dog number ${index + 1} is still a puppy`);
  });
  console.log(dogs, checkDogAges);
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

function calcAverageHumanAge(ages) {
  const dogAges = ages.map((age) => {
    return age <= 2 ? age * 2 : 16 + age * 4;
  });
  const adultDog = dogAges.filter((age) => {
    return age >= 18;
  });
  const average =
    adultDog.reduce((acc, current) => {
      return acc + current;
    }, 0) / adultDog.length;

  console.log(adultDog, average);
}

const calcAverageHumanAges = (ages) => {
  const dogAges = ages
    .map((age) => {
      return age <= 2 ? age * 2 : 16 + age * 4;
    })
    .filter((age) => {
      return age >= 18;
    })
    .reduce((acc, current, index, arr) => {
      return acc + current / arr.length;
    }, 0);
  console.log(dogAges);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
calcAverageHumanAges([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAges([16, 6, 10, 5, 6, 1, 4]);

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

//eating too much = curFood > recFood
//eating too little = curFood < recFood
//eating ok = curFood > (recFood * 0.90) && curFood < (recFood * 1.10)

const portion = dogs.forEach((dog) => {
  return (dog.portion = dog.weight ** 0.75 * 28);
});

const sarahDog = () => {
  const dog = dogs.map((dog) => dog);
  const findSarah = dog.find((owner) => owner.owners.includes("Sarah"));
  const checkFood =
    findSarah.curFood > findSarah.portion
      ? console.log("Sarah dog eating too much")
      : console.log("Sarah dog eating too little");

  return checkFood;
};

sarahDog();

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.portion)
  .flatMap((owner) => owner.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.portion)
  .flatMap((owner) => owner.owners);

dogs.some((dog) => console.log(dog.curFood === dog.portion));
dogs.some((dog) =>
  console.log(
    dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1
  )
);

const dogsEatingOk = dogs.filter((dog) => {
  return dog.curFood > dog.portion * 0.9 && dog.curFood < dog.portion * 1.1;
});

const dogsCopy = dogs
  .slice()
  .map((dog) => dog.portion)
  .sort((a, b) => (a > b ? 1 : -1));

console.log(ownersEatTooMuch, ownersEatTooLittle);
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little`);
console.log(dogsEatingOk);
console.log(dogsCopy);

// const convertTitleCase = (title) => {
//   const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((word) =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(" ");

//   return titleCase;
// };

// console.log(convertTitleCase("this is a nice title"));
// console.log(convertTitleCase("this is a LONG title but not too long"));
// console.log(convertTitleCase("and here is another title with an EXAMPLE"));
