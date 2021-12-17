import { getSearchStaticProps } from '@lib/search-props'
import Search from '@components/search'

export async function getStaticProps(context) {
  return getSearchStaticProps(context)
}

export default Search
