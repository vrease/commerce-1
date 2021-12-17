import { normalizeCategory } from './normalize'
import getSiteCollectionsQuery from './queries/get-all-collections-query'

const getCategories = async ({ fetch, locale }) => {
  const { data } = await fetch(
    getSiteCollectionsQuery,
    {
      variables: {
        first: 250,
      },
    },
    {
      ...(locale && {
        headers: {
          'Accept-Language': locale,
        },
      }),
    }
  )

  return (
    data.collections?.edges?.map(({ node }) => normalizeCategory(node)) ?? []
  )
}

export default getCategories
