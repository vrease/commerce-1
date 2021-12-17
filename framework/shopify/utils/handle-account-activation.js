import throwUserErrors from './throw-user-errors.js'

import { customerActivateByUrlMutation } from './mutations/index.js'

const handleAccountActivation = async (fetch, input) => {
  try {
    const { customerActivateByUrl } = await fetch({
      query: customerActivateByUrlMutation,
      variables: {
        input,
      },
    })

    throwUserErrors(customerActivateByUrl?.customerUserErrors)
  } catch (error) {}
}

export default handleAccountActivation
