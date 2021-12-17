import useCustomer from '@commerce/customer/use-customer'
import { getCustomerQuery, getCustomerToken } from '../utils'

export default useCustomer

export const handler = {
  fetchOptions: {
    query: getCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const data = await fetch({
        ...options,
        variables: { customerAccessToken: getCustomerToken() },
      })
      return data.customer
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
