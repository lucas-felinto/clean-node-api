const HttpResponse = require('../helpers/http-reponse')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }
      const acessToken = await this.authUseCase.auth(email, password)
      if (!acessToken) {
        return HttpResponse.unauthorizedError()
      }
      return HttpResponse.ok({ acessToken })
    } catch (error) {
      // console.error(error) em modo de produção.
      return HttpResponse.serverError()
    }
  }
}
