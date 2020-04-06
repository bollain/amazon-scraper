import { ApolloServer } from "apollo-server"
import typeDefs from './schema/product-schema'
import { resolvers } from './resolvers/resolvers'
import Models from './models/index'

const context = {
  Models
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});