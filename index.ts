const name = "JungHunPark",
age = 24,
gender = "male"

//인자에 붙는 ? 는 optional argument
const sayHi = (name, age, gender?) => {
    console.log(`hello~ ${name}, you are ${age}, ${gender}`)
}

sayHi(name, age, gender)

export { }