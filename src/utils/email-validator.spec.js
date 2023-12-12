const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@gmail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should return true if validator returns true', () => {
    validator.isEmailValid = false

    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@gmail.com')

    expect(isEmailValid).toBe(false)
  })
})
