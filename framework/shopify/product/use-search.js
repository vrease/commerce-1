import { SWRHook } from '@commerce/utils/types'
import useSearch from '@commerce/product/use-search'

import {
  getAllProductsQuery,
  getCollectionProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '../utils'

export default useSearch

export const handler = {
  fetchOptions: {
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const { categoryId, brandId } = input
    const method = options?.method
    const variables = getSearchVariables(input)
    let products

    // change the query to getCollectionProductsQuery when categoryId is set
    if (categoryId) {
      const data = await fetch({
        query: getCollectionProductsQuery,
        method,
        variables,
      })
      // filter on client when brandId & categoryId are set since is not available on collection product query
      products = brandId
        ? data.node?.products?.edges?.filter(
            ({ node: { vendor } }) =>
              vendor.replace(/\s+/g, '-').toLowerCase() === brandId
          )
        : data.node?.products?.edges
    } else {
      const data = await fetch({
        query: options.query,
        method,
        variables,
      })
      products = data.products?.edges
    }

    return {
      products: products?.map(({ node }) => normalizeProduct(node)),
      found: !!products?.length,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
          ['locale', input.locale],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
