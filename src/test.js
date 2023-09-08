console.log("안녕하세요!");

// 제곱
const arr = [1, 2, 3, 4];
const result = arr.map((n) => n * n);
console.log(result);

// 짝수 배열
const arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr2
  .filter((i) => i % 2 == 0)
  .forEach((a) => {
    console.log(a);
  });

// 홀수 배열
const arr3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr3
  .filter((i) => i % 2 == 1)
  .forEach((a) => {
    console.log(a);
  });

// 비동기 : 콜백 -> Promise(then, catch) -> await, async(비동기) -> fetch(Promise 반) -> axios
function foo() {
  console.log("자바스크립트는 동기적입니다.");
  console.log("테스트중");
}

console.log("시작");
foo();
console.log("끝");

// 비동기적으로 실행하는 콜백함수 setTimeOut() 함수
console.log("시작");

setTimeout(function () {
  console.log("비동기 콜백함수 setTimeOut()");
}, 2000);

console.log("끝");

// Promise
const promise = new Promise((resolve, reject) => {
  const rand = Math.floor(Math.random() * 2);
  console.log(rand);
  if (rand === 0) {
    resolve();
  } else {
    reject();
  }
});

promise.then(() => console.log("success")).catch(() => console.log("fail!"));

function greet() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("hello");
    }, 2000);
  });
}

async function load() {
  var result = await greet(); //resolved 될 때까지 대기
  console.log(result);
}
load();
