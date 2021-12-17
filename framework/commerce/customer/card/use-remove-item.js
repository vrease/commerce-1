import { useHook, useMutationHook } from '../../utils/use-hook'
import { mutationFetcher } from '../../utils/default-fetcher'

export const fetcher = mutationFetcher

const fn = (provider) => provider.customer?.card?.useRemoveItem

const useRemoveItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useRemoveItem
