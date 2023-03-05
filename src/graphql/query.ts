import gql from 'graphql-tag'

export const CHARACTERS_QUERY = gql`
  query ($page: Int, $filterName: String!) {
    characters(page: $page, filter: { name: $filterName }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        gender
        image
        species
        type
        origin {
          name
          dimension
        }
        location {
          name
          dimension
        }
      }
    }
  }
`