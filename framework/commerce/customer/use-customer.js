import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'

export const fetcher = SWRFetcher

const fn = (provider) => provider.customer?.useCustomer

const useCustomer = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useCustomer
