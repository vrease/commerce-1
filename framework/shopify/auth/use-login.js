import { useCallback } from 'react'
import { CommerceError } from '@commerce/utils/errors'
import useLogin from '@commerce/auth/use-login'
import useCustomer from '../customer/use-customer'

import {
  setCustomerToken,
  throwUserErrors,
  customerAccessTokenCreateMutation,
} from '../utils'

export default useLogin

export const handler = {
  fetchOptions: {
    query: customerAccessTokenCreateMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    const { customerAccessTokenCreate } = await fetch({
      ...options,
      variables: {
        input: { email, password },
      },
    })

    throwUserErrors(customerAccessTokenCreate?.customerUserErrors)

    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
