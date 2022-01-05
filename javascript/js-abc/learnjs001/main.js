// 通过对象字面量来创建
var student = {
    name: 'zhangsan',
    age: 18,
    gender: 'male',
    sayHi: function () {
        console.log('hi,my name is ' + this.name);
    },
};

// 通过 new Object() 创建对象
var student = new Object();
(student.name = 'zhangsan'),
    (student.age = 18),
    (student.gender = 'male'),
    (student.sayHi = function () {
        console.log('hi,my name is ' + this.name);
    });

//通过工厂函数创建对象
function createStudent(name, age, gender) {
    var student = new Object();
    student.name = name;
    student.age = age;
    student.gender = gender;
    student.sayHi = function () {
        console.log('hi,my name is ' + this.name);
    };
    return student;
}
var s1 = createStudent('zhangsan', 18, 'male');

//自定义构造函数

function Student(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHi = function () {
        console.log('Hi, my name is ' + this.name);
    };
}
var s1 = new Student('zhangsan', 18, 'male')

/*
new 关键字
构造函数，是一种特殊的函数。主要用来在创建对象时初始化对象，即为对象成员变量赋初始值，总与 new 运算符一起使用在创建对象的语句中。这里有需要特别注意的几点：

构造函数用于创建一类对象，首字母要大写。
内部使用 this 关键字给对象添加成员。
使用 new 关键字调用对象构造函数。
*/

/*
this 详解
在 JavaScript 中，我们经常会使用到 this 关键字，那么 this 到底指向什么呢？这里有一个口诀：谁调用 this，它就是谁。大家也可以从前面的例子中细细体会一下。

函数在定义的时候 this 是不确定的，只有在调用的时候才可以确定。
一般函数直接执行，内部 this 指向全局 window。比如：

function test() {
    console.log(this);
  }
  test(); // window.test();

  函数作为一个对象的方法，被该对象所调用，那么 this 指向的是该对象。
  构造函数中的 this，始终是 new 的当前对象。

  */

//写一个函数，格式化日期对象，最终输入形式为：yyyy/MM/dd HH:mm:ss

function formatDate(d) {
    if (!d instanceof Date) {
        return;
    }
    var year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        second = d.getSeconds();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    return (
        year + '/' + month + '/' + date + '  ' +
        hour + ':' + minute + ':' + second
    );
}
console.log(formatDate(new Date()));

//写一个函数去掉数组中的重复元素。比如有一个数组 array = ["x", "c", "a", "b", "c", "b", "c"]。
var array = ['x', 'c', 'a', 'b', 'c', 'b', 'c'];

function clearDuplicateArray() {
    var arr = {}
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (arr[item]) {
            arr[item]++;
        } else {
            arr[item] = 1;
        }
    }
    var tmpArray = [];
    for (var key in arr) {
        if (arr[key] == 1) {
            tmpArray.push(key);
        } else {
            if (tmpArray.indexOf(key) == -1) {
                tmpArray.push(key);
            }
        }
    }

    /*
    var tmpArray = [];
    for (var key in array){  js 不像其他语言  key为1,2,3,4,5,6
        if (tmpArray.indexOf(key) == -1){
            tmpArray.push(key);
        }
    }
    
    */
    
    return tmpArray;
}