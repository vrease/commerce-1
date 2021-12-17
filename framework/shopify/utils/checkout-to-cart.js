import { CommerceError } from '@commerce/utils/errors'

import { normalizeCart } from './normalize'
import throwUserErrors from './throw-user-errors.js'

const checkoutToCart = (checkoutPayload) => {
  throwUserErrors(checkoutPayload?.checkoutUserErrors)

  if (!checkoutPayload?.checkout) {
    throw new CommerceError({
      message: 'Missing checkout object from response',
    })
  }

  return normalizeCart(checkoutPayload?.checkout)
}

export default checkoutToCart
