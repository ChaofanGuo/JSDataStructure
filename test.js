let a = null

let {b} = a === null || a === undefined ? {} : a

console.log(b)
// debugger
