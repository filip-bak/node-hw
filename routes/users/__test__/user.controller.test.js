const userCtrl = require('../users.controllers')
const { generateAccessToken } = require('../../auth/auth.service')
const { getUser } = require('../users.dao')
const createMockObjects = require('../../../shared/testUtils')
const { default: mongoose } = require('mongoose')

jest.mock('../users.dao', () => ({
  getUser: jest.fn(),
  updateUser: jest.fn(),
}))

jest.mock('../../auth/auth.service', () => ({
  generateAccessToken: jest.fn(),
}))

const userId = new mongoose.Types.ObjectId()
const userPayload = {
  _id: userId,
  email: 'tost@gmail.com',
  subscription: 'starter',
}

const accessToken = 'mocked_access_token'
describe('user', () => {
  describe('login controller', () => {
    afterEach(async () => {
      expect(getUser).toHaveBeenCalledTimes(1)
    })

    describe('given the email and password are valid', () => {
      const { req, res, next } = createMockObjects({
        email: 'tost@gmail.com',
        password: '123456',
      })

      beforeAll(async () => {
        jest.clearAllMocks()
        getUser.mockResolvedValueOnce({
          ...userPayload,
          verify: true,
          verificationToken: null,
          validatePassword: jest.fn(() => true),
        })
        generateAccessToken.mockReturnValueOnce(accessToken)

        await userCtrl.loginHandaler(req, res, next)
      })

      it('should respond with status 200', async () => {
        expect(res.status).toHaveBeenCalledWith(200)
      })

      it('should respond with access token and user payload', async () => {
        expect(res.json).toHaveBeenCalledWith({
          token: accessToken,
          user: userPayload,
        })
      })
      it('should ensure user email and subscription are strings in the response', async () => {
        const response = res.json.mock.calls[0][0]
        expect(typeof response.user.email).toBe('string')
        expect(typeof response.user.subscription).toBe('string')
      })
    })

    describe('given the invalid email or password', () => {
      describe('when email is invalid', () => {
        const { req, res, next } = createMockObjects({
          email: 'invalid@gmail.com',
          password: '12456',
        })

        beforeAll(async () => {
          jest.clearAllMocks()
          getUser.mockResolvedValueOnce(null)
          await userCtrl.loginHandaler(req, res, next)
        })

        it('should respond with status 401', async () => {
          expect(res.status).toHaveBeenCalledWith(401)
        })
        it('should respond with error message', async () => {
          expect(res.json).toHaveBeenCalledWith({
            message: 'Email or password is wrong',
          })
        })
      })
      describe('when password is invalid', () => {
        const { req, res, next } = createMockObjects({
          email: 'tost@gmail.com',
          password: '12',
        })

        beforeAll(async () => {
          jest.clearAllMocks()
          getUser.mockResolvedValueOnce({
            ...userPayload,
            validatePassword: jest.fn(() => false),
          })
          await userCtrl.loginHandaler(req, res, next)
        })

        it('should respond with status 401', async () => {
          expect(res.status).toHaveBeenCalledWith(401)
        })
        it('should respond with error message', async () => {
          expect(res.json).toHaveBeenCalledWith({
            message: 'Email or password is wrong',
          })
        })
      })
    })
  })
})
