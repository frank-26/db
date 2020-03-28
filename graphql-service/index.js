const http = require('http');
const express = require('express');
const {
  ApolloServer
} = require('apollo-server-express');
const {
  gql
} = require('apollo-server');
const {
  PubSub,
  withFilter
} = require("graphql-subscriptions");
const pubsub = new PubSub();

let typeDefs = gql ` 
type Comment {
    id: ID!
    content: String
}

type Course {
    id: ID!
    name: String
    comment: [Comment]
}

type Query {
    hello: String
    course: Course
    courses: [Course]
}

type Mutation {
    add: Course
    remove: Course
}

type Subscription {
    subCourse: [Course]
}`;
let resolvers = {
  Query: {
    hello: () => 'Hello world!',
    course: () => ({
      id:'MOCK_COURSE_ID_1',
      name: 'MOCK_COURSE_NAME_1',
      comment: [{
        id: 'MOCK_COMMENT_ID_1',
        content: 'MOCK_COMMENT_CONTENT_1'
      }, {
        id: 'MOCK_COMMENT_ID_2',
        content: 'MOCK_COMMENT_CONTENT_2'
      }]
    }),
    courses: () => [{
      id: 'MOCK_COURSE_ID_1',
      name: 'MOCK_COURSE_NAME_1',
      comment: [{
        id: 'MOCK_COMMENT_ID_1',
        content: 'MOCK_COMMENT_CONTENT_1'
      }, {
        id: 'MOCK_COMMENT_ID_2',
        content: 'MOCK_COMMENT_CONTENT_2'
      }]
    }, {
      id: 'MOCK_COURSE_ID_2',
      name: 'MOCK_COURSE_NAME_2',
      comment: [{
        id: 'MOCK_COMMENT_ID_2_1',
        content: 'MOCK_COMMENT_CONTENT_2_1'
      }]
    }]
  },
  Mutation: {
    add: () => {},
    remove: () => {
      pubsub.publish('ALL_COURSES', {
        subCourse: [{
          id: 'MOCK_COURSE_ID_1',
          name: 'MOCK_COURSE_NAME_1',
          comment: [{
            id: 'MOCK_COMMENT_ID_2',
            content: 'MOCK_COMMENT_CONTENT_2'
          }]
        }]
      });
      // 当客户端调用该方法时获得的值
      return {
        id: 'MOCK_COURSE_ID_2',
        name: 'MOCK_COURSE_NAME_2',
        comment: [{
          id: 'MOCK_COMMENT_ID_2_1',
          content: 'MOCK_COMMENT_CONTENT_2_1'
        }]
      }
    }
  },
  Subscription: {
    subCourse: {
      subscribe: () => pubsub.asyncIterator('ALL_COURSES')
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscription'
  },
  playground: true
});

const app = express();

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({
  port: 4001
}, () => {
  console.log(`Server ready`);
});