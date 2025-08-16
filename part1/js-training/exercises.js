const x = 1;
let y = 5;

console.log(x, y); // Output: 1 5
y += 10;
console.log(x, y); // Output: 1 15
y = "sometext";
console.log(x, y); // Output: 1 sometext
// x = 4; // This will cause an error because x is a constant

const t = [1, -1, 3];

t.push(5);

console.log(t.length); // Output: 4
console.log(t[1]); // Output: -1

t.forEach((value) => {
  console.log(value); // numbers 1, -1, 3, 5 are printed one by one
});

const g = [1, -1, 3];

const g2 = g.concat([5, 6, 7]);

console.log(g);
console.log(g2); // g remains unchanged, g2 is a new array with values [1, -1, 3, 5, 6, 7]

const ö = [1, 2, 3];

const m1 = ö.map((value) => value * 2);
console.log(m1); // Output: [2, 4, 6]

const m2 = ö.map((value) => "<li>" + value + "</li>");
console.log(m2); // Output: ["li1</li>", "li2</li>", "li3</li>"]

const [first, second, ...rest] = g2;
console.log(first, second); // Output: 1 2
console.log(rest); // Output: [3]

const object1 = {
  name: "Elmo Käppi",
  age: 34,
  education: "Bachelor of Engineering - BEng",
};

const object2 = {
  name: "Arto Hellas",
  age: 35,
  education: "Master of Science - MSc",
};

const object3 = {
  name: {
    first: "John",
    last: "Doe",
  },
  age: 36,
  education: "Bachelor of Science - BSc",
  grades: [3, 4, 5],
  department: "Computer Science",
};

console.log(object1);
console.log(object1.name); // Output: Elmo Käppi
console.log(object3.name.first); // Output: John

const fieldName = "age";
console.log(object1[fieldName]); // Output: 34

object1.address = "Helsinki";
object1["phone number"] = 12341;
console.log(object1);

const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};

const result = sum(1, 5);
console.log(result); // Output: 6

const square = (p) => {
  console.log(p);
  return p * p;
};

const square2 = (p) => p * p;

const k = [1, 2, 3, 4, 5];
const ksquared = k.map((p) => p * p);
console.log(ksquared); // Output: [1, 4, 9, 16, 25]
