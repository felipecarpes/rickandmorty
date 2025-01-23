import gql from 'graphql-tag'

export const CHARACTERS_QUERY = gql`
  query ($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
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

export const CHARACTER_QUERY = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      episode {
        name
        air_date
        episode
      }
    }
  }
`

export const LOCATIONS_QUERY = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          status
          image
        }
      }
    }
  }
`

export const EPISODES_QUERY = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          status
          image
        }
      }
    }
  }
`