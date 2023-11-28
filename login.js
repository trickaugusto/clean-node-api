module.exports = () => {
  const router = new SignUpRouter()
  router.post('/signup', ExpressRouteAdapter.adapt(router))
}

class ExpressRouteAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }

      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// presentation layer
// signup route
class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repeatPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}

// domain layer
// signup use case
class SignUpUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// infra layer
// add account repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
