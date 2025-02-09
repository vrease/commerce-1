import { useCallback } from 'react'
import { CommerceError } from '@commerce/utils/errors'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'

import {
  handleAutomaticLogin,
  throwUserErrors,
  customerCreateMutation,
} from '../utils'

export default useSignup

export const handler = {
  fetchOptions: {
    query: customerCreateMutation,
  },
  async fetcher({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }

    const { customerCreate } = await fetch({
      ...options,
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
        },
      },
    })

    throwUserErrors(customerCreate?.customerUserErrors)
    await handleAutomaticLogin(fetch, { email, password })

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
