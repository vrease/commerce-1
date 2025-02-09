import { useCallback } from 'react'

import { ValidationError } from '@commerce/utils/errors'
import useRemoveItem from '@commerce/cart/use-remove-item'

import useCart from './use-cart'

export default useRemoveItem

import {
  checkoutLineItemRemoveMutation,
  getCheckoutId,
  checkoutToCart,
} from '../utils'

export const handler = {
  fetchOptions: {
    query: checkoutLineItemRemoveMutation,
  },
  async fetcher({ input: { itemId }, options, fetch }) {
    const data = await fetch({
      ...options,
      variables: { checkoutId: getCheckoutId(), lineItemIds: [itemId] },
    })
    return checkoutToCart(data.checkoutLineItemsRemove)
  },
  useHook:
    ({ fetch }) =>
    (ctx = {}) => {
      const { item } = ctx
      const { mutate } = useCart()
      const removeItem = async (input) => {
        const itemId = input?.id ?? item?.id

        if (!itemId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({ input: { itemId } })
        await mutate(data, false)
        return data
      }

      return useCallback(removeItem, [fetch, mutate])
    },
}
