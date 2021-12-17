import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'

export const fetcher = mutationFetcher

const fn = (provider) => provider.checkout?.useSubmitCheckout

const useSubmitCheckout = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useSubmitCheckout
