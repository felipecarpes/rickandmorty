import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          merge(existing, incoming) {
            return incoming
          }
        },
        locations: {
          merge(existing, incoming) {
            return incoming
          }
        },
        episodes: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    },
    Character: {
      keyFields: ['id'],
      fields: {
        origin: {
          merge(existing, incoming) {
            return incoming
          }
        },
        location: {
          merge(existing, incoming) {
            return incoming
          }
        },
        episode: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})
