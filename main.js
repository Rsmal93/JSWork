let a=10
function outer() {
    let b=20
    function inner() {
        let c=30
        console.log(a,b,c)
    }
    inner()
}
outer()


function outer2() {
    let counter=0
    function inner2() {
        counter++
        console.log(counter)
    }
    return inner2
}
const fn = outer2() 
//Closures
//Functions called from within another function in javascript also return the functions
//scope and declared variables, giving pseudo global variable status, known as 'Closure' in JS
//const fn remembers the scoped variables
fn()
fn()


//Function Currying
//transform fn with multiple arguments f(1,2,3).. 
//into a sequence of nesting fucntions f(1)(2)(3)
//Google this..
function sum(a,b,c) {
    return a+b+c
}

console.log(sum(2,3,5))

function curry(fn) {
    return function(a) {
        return function(b) {
            return function(c) {
                return fn(a,b,c)
            }
        }
    }
}

const curriedSum = curry(sum)
console.log(curriedSum(2)(3)(5))

const add2 = curriedSum(2)
const add3 = add2(3)
const add5 = add3(5)
console.log(add5)



//JS 'this' keyword
//refers to the object it belongs to
//makes functions reusable by letting you decide the object value
//Determined by: implicit/explicit/new/default bindings

//function sayMyName(name) {
//   console.log(`My name is ${name}`)
//}


//Implicit Binding
const person = {
    name: 'Rooster',
    sayMyName: function() {
        console.log(`my name is ${this.name}`)
    }
}

person.sayMyName()
//this

//Explicit Binding
function sayMyName(name) {
    console.log(`My name is ${name}`)
}

sayMyName.call(person)

//New Binding
function Person(name) {
    this.name = name
}
    //Constructur functions
const p1= new Person('Rooster')
const p2 = new Person('Batman')
console.log(p1.name, p2.name)

//Default Binding
//searches up to global scope for name object
sayMyName()

//new->explicit->implicit->default




//PROTOTYPES
function Person(fName, lName) {
    this.fName = fName
    this.lName = lName
}

const person1 = new Person(`Bruce`, `Wayne`)
const person2 = new Person(`Clark`, `Kent`)

//Create new Constructur function with protype
Person.prototype.getFullName = function() {
    return this.fName +' ' +this.lName
}

function SuperHero(fName,lName) {
    //this = {}
    Person.call(this,fName,lName)
    this.isSuperHero = true
}
SuperHero.prototype.fightCrime = function () {
    console.log('Fighting Crime')
}

SuperHero.prototype= Object.create(Person.prototype)

const batman = new SuperHero('bruce', 'wayne')
console.log(batman.getFullName())

//console.log(person1.getFullName())
//console.log(person2.getFullName())




///CLASSES

class Person {
    constructor(fName,lName) {
        this.fName = fName
        this.lName = lName
    }
    sayMyName() {
        return this.fName+' '+this.lName
    }
}

const classP1 = new Person('Bruce', 'Wayne')
console.log(classP1.sayMyName())

class SuperHero extends Person {
    constructor(fName, lName) {
        super(fName,lName)
        this.isSuperHero = true
    }
    fightCrime() {
        console.log('Fighting Crime')
    }
}

const batman = new SuperHero('Bruce', Wayne)
console.log(batman.sayMyName())


//Iterators
const obj = {
    [Symbol.iterator]: function() {
        let step = 0
        const iterator = {
            next: function() {
                step++
                if (step==1) {
                    return {value: 'Hello', done: false}
                }
                else if (step==2) {
                    return {value: 'World', done: false}
                }
                return {value: undefined, done: true}
            }
        }
        return iterator
    }
}

for(const word of obj) {
    console.log(word)
}

//Generators -> much better than Iterators
function normalFunction(){
    console.log('Hello')
    console.log('world')
}

//normalFunction()
//normalFunction()

function* generatorFunction(){
    yield 'Hello'
    yield 'World'
}

const generatorObject = generatorFunction()
for(const word of generatorObject) {
    console.log(word)
}
