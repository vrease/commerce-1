import { getSearchStaticProps } from '@lib/search-props'
import Search from '@components/search'

export async function getStaticProps(context) {
  return getSearchStaticProps(context)
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Search
