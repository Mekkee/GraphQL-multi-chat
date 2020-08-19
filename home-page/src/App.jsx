import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'shards-react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shards-ui/dist/css/shards.min.css'

import './index.css'

import Chat from 'chat/Chat'

const App = () => (
  <Container>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor officiis
      laborum maxime placeat inventore? Accusamus voluptas laudantium excepturi
      architecto quasi! Lorem ipsum dolor sit amet consectetur, adipisicing
      elit. Ex quos, ipsam totam delectus necessitatibus obcaecati commodi eum,
      repudiandae laudantium, modi molestiae officiis autem beatae atque eaque
      quae perferendis veniam distinctio ut magni facilis quod vel omnis.
      Voluptatibus in ipsum maiores.
    </p>
    <h1>Chat</h1>
    <Chat />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste autem porro
      consequatur voluptatibus, repellendus earum enim obcaecati ratione at
      inventore?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
      fugit dolorum est harum doloremque autem corrupti voluptatum alias
      exercitationem amet Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Libero iusto illum voluptatum ratione, nihil dolor. Totam in fugit
      et ratione.
    </p>
  </Container>
)

ReactDOM.render(<App />, document.getElementById('app'))
