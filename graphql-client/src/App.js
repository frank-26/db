import React, {useReducer} from 'react';
import './App.css';

import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
 
const client = new ApolloClient({
  uri: "http://localhost:4001/graphql"
});

const ALLID = `{
  courses {
    id
  }
}`
function reducer(state, action) {
  switch(action) {
    case 'hello' : return `{
      hello 
    }`;
    case 'all' : return `{
      courses {
        id,
        name,
        comment{
          id,
          content
        }
      }
    }`;
    case 'one' : return `{
      course{
        id,
        name
      }
    }`;
    case 'add' : return `{
      mutation{
        add{
          id
        }
      }
    }`;
    case 'remove' : return `{ 
      mutation{
        remove{
          id,
          name
        }
      }
    }`;
    case 'subscribe' : return `{ 
      subscription {
        subCourse{
          id
        }
      }
    }`;
    default : return ALLID;
  }
}
function App() {
  const [query, dispatch]  = useReducer(reducer, ALLID);

  return (
    <ApolloProvider client={client}>
      <div className="flex-around">
      <button onClick={()=>dispatch(`hello`)}>hello</button>
      <button onClick={()=>dispatch(`one`)}>getOne</button>
      <button onClick={()=>dispatch(`all`)}>getAll</button>
      <button onClick={()=>dispatch(`add`)}>add</button>
      <button onClick={()=>dispatch(`remove`)}>remove</button>
      <button onClick={()=>dispatch(`subscribe`)}>subscribe</button>

      </div>
      <Query query={
        gql`${query}`}>
        {({data}) => {
          if(data) {
            return <code>{`${JSON.stringify(data, null, 4)}`}</code>
          }
          return null
        }}
      </Query>
    </ApolloProvider>
  );
}
 
export default App;