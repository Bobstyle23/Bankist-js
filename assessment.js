//1. 'dogs' 배열을 반복하고 각 개에 대해 권장되는 음식 부분을 계산하고 개체에 새 'portion' 속성으로 추가해주세요. !!!새 배열을 만들지 말고 배열을 반복하기만 하면 됩니다 (계산하려면 이 공식을 사용하십시오 'portion = weight ** 0.75 * 28')
//(Loop over the 'dogs' array and for each dog, calculate the recommended food portion and add it to the object as a new property. !!!DO NOT create a new array, simply loop over the array)
//2. Sarah의 개를 찾고 너무 많이 또는 너무 적게 먹는 경우 콘솔에 기록하십시오. 힌트: 일부 개에는 여러 명의 소유자가 있으므로 먼저 소유자 배열에서 Sarah를 찾아야 합니다. (너무 많이 먹는 = currentFood > portion) (너무 적게 먹는 = currentFood < portion)
//(Find Sarah's dog and log it to the console if it's eating too much or too little. Hint: some dogs have multiple owners, so first you need to find Sarah in the owner's array)
//3. 너무 많이 먹는 개 소유자를 모두 포함하는 'ownersEatTooMuch'라는 배열과 너무 적게 먹는 개 소유자를 모두 포함하는 'ownersEatTooLittle'이라는 배열을 만드십시오.
//(Create an array named 'ownersEatTooMuch' containing all owners of dogs who eat too much and an array named 'ownersEatTooLittle' containing all owners of dogs who eat too little)
//4. 작업 3에서 생성된 각 어레이에 대해 콘솔에 문자열을 기록하십시오. 예를 들어 'Matilda와 Sarah와 John의 개는 너무 많이 먹습니다' 및 'Alice와 Bob과 Michael과 Jonas의 개는 너무 적게 먹습니다
//(Log a string to the console for each array created in task 3, like this 'Matilda and Sarah and John's dogs eat too much' and 'Alice and Bob and Michael and Jonas's dogs eat too little')
//5. 'dogs' 배열의 얕은 사본을 만들고 음식의 일부를 오름차순으로 정렬하십시오(부분은 배열의 객체 내부에 있음을 명심하십시오)
//(Create a shallow copy of the 'dogs' array and sort it by a portion of food in ascending order (keep in mind that the portions are inside the array's objects))

const dogs = [
  { weight: 22, currentFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, currentFood: 200, owners: ["Matilda"] },
  { weight: 13, currentFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, currentFood: 340, owners: ["Michael"] },
  { weight: 25, currentFood: 280, owners: ["Jonas"] },
];
