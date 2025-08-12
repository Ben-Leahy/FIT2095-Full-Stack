//Task 3: Array Search Algorithm
//Write a JavaScript function that counts occurrences of a specific element in an array.

function countOccurences(array, elem) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elem) count += 1;
  }
  return count;
}

function testCountOccurences(){
  myArray = [2, 2, 3, 4, 2, 5, 5, 6];
  elem = 5;
  console.log("Task 1:");
  console.log(countOccurences(myArray, elem));
  console.log("\n");  
}

//Task 4: Frequency Analysis with Modern JavaScript
//Write JavaScript code that analyses and displays the frequency of all elements in an array.
function frequencyOfEachElem(myArray) {
  let frequencyDict = new Map();
  for (const elem of myArray) {
    frequencyDict.set(elem, (frequencyDict.has(elem) ? frequencyDict.get(elem) + 1 : 1));
  }
  return frequencyDict;
}

function prettyPrint(dictionary) {
  console.log("Pretty print:")
  Array.from(dictionary.entries()).forEach(([elem, count]) => {
    console.log(`Element: ${elem}, Count: ${count}`);
  });
}

function testfrequencyOfEachElem(){
  console.log("Task 2:");
  // myArray = [2, 2, 3, 4, 2, 5, 5, 6];
  myArray = ['red', 'blue', 'red', 'green', 'blue', 'red', 'yellow'];
  console.log("my array: " + myArray);

  const myFrequencyDict = frequencyOfEachElem(myArray);

  prettyPrint(myFrequencyDict);
  console.log("\n");
}

//Last-In-First-Out (LIFO) 
class Stack {
  constructor(){
    this.items = []
  }

  // This is like an attribute
  get size(){
    return this.items.length
  }

  //This is like. amethod
  get elements(){
    return [...this.items]
  }

  isEmpty(){
    return this.items.length === 0
  }

  push(elem){
    this.items.push(elem)
  }

  pop(){
    if (!this.items.isEmpty()){
      
    }
  }
}

const instance = new Stack()
console.log(instance.method1)
console.log(instance.method2())

