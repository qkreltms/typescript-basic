const name = "JungHunPark",
age = 24,
gender = "male"

//인터페이스는 js로 컴파일되지않음
interface SimpleObject {
    id: number
}
const object = {    
    id: 1
}

//인자에 붙는 ? 는 optional argument
const sayHi = (object:SimpleObject, name:string, age:number, gender?:string): string => {
    return `hello~ id=${object.id} ${name}, you are ${age}, ${gender}`
}
console.log(sayHi(object, name, age, gender))

class Human {
    private name: string
    private age: number
    public gender: string
    constructor(name: string, age: number, gender: string) {
        this.name = name
        this.age = age
        this.gender = gender
    }
    public print():string {
    return `hello~ ${this.name}, you are ${this.age}, ${this.gender} I'm from the class`
    }
}

const JHP = new Human('junhoon', 25, 'male')
console.log(JHP.print())

export { }