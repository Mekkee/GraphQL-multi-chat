import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSubscription,
  gql,
  useMutation,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { Container, Row, Col, FormInput, Button } from 'shards-react'

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
})

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`

const POST_MESSAGES = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`

const Messages = ({ user }) => {
  const { data } = useSubscription(GET_MESSAGES)

  if (!data) {
    return null
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          style={{
            display: 'flex',
            justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
            padding: '10px 0 10px 0',
          }}
        >
          {user !== messageUser && (
            <div
              style={{
                width: 50,
                height: 50,
                marginRight: '4px',
                border: '2px solid #e5e6eb',
                borderRadius: 25,
                textAlign: 'center',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? '#000' : '#e5e6eb',
              color: user === messageUser ? '#fff' : '#000',
              padding: '20px',
              borderRadius: '20px',
              maxWidth: '60%',
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  )
}

const Chat = () => {
  const [state, setState] = React.useState({
    user: 'Arre',
    content: '',
  })

  const [postMessage] = useMutation(POST_MESSAGES)

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      })
    }
    setState({
      ...state,
      content: '',
    })
  }

  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label='User'
            value={state.user}
            onChange={(event) =>
              setState({
                ...state,
                user: event.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label='Content'
            value={state.content}
            onChange={(event) =>
              setState({
                ...state,
                content: event.target.value,
              })
            }
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                onSend()
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: '100%' }}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)
