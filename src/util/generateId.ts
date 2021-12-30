// Creates an ID consisting of the date as a number in seconds turned into a hex
// and 16 random numbers also turned into hex.
// This last thing is achieved by repeating a whitespace 16 times then using a regular expression
// to replace each space with the return value of a function. The function takes a random number
// between 0 and 16 and makes it a hex.

const objectId = (): string => {
  return hex(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
}

const hex = (value: number): string => {
  return Math.floor(value).toString(16)
}

export default objectId
