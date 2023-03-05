import gql from 'graphql-tag'

export const CHARACTERS_QUERY = gql`
  query {
    characters(page: 1, filter: {}) {
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