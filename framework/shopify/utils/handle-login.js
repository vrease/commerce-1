import { setCustomerToken } from './customer-token'
import { customerAccessTokenCreateMutation } from './mutations'
import throwUserErrors from './throw-user-errors.js'

const handleLogin = (data) => {
  const response = data.customerAccessTokenCreate
  throwUserErrors(response?.customerUserErrors)

  const customerAccessToken = response?.customerAccessToken
  const accessToken = customerAccessToken?.accessToken

  if (accessToken) {
    setCustomerToken(accessToken)
  }

  return customerAccessToken
}

export const handleAutomaticLogin = async (fetch, input) => {
  try {
    const loginData = await fetch({
      query: customerAccessTokenCreateMutation,
      variables: {
        input,
      },
    })
    handleLogin(loginData)
  } catch (error) {}
}

export default handleLogin
