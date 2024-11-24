const express = require('express')
const cors = require('cors')

const app = express()

app.listen(5500, () => console.log('Rodando na porta 5500'))

app.use(cors())

app.use(express.json())

let heros = [{
  id: 1,
  nome: "Goku",
  anime: "Dragonball Z",
  img: "https://observatoriodocinema.uol.com.br/wp-content/uploads/2018/08/Goku-1.jpg",
  level: 10,
  historia: 'Goku é filho de Bardock, um guerreiro Saiyajin pouco popular entre a sua raça, e sua mãe é Gi-ne, tendo nascido no ano de 737 no Planeta Vegeta. Personagem mais forte do anime'

}]



app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

app.route('/api').get((req, res) => res.json({
  heros
}))

app.route('/api/:id').get((req, res) => {
  const userId = req.params.id

  const user = heros.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  res.json(user)
})

app.route('/api').post((req, res) => {
  const lastId = heros[heros.length - 1].id
  heros.push({
    id: lastId + 1,
    nome: req.body.nome,
    anime: req.body.anime,
    // img: req.body.img,
    // level: req.body.level,
    // historia: req.body.historia
  })
  res.json('Saved user')
})

app.route('/api/:id').put((req, res) => {
  const userId = req.params.id

  const user = heros.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  const updatedUser = {
    ...user,
    id: lastId + 1,
    nome: req.body.nome,
    anime: req.body.anime,
    // img: req.body.img,
    // level: req.body.level,
    // historia: req.body.historia
  }

  heros = heros.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("Updated user")
})

app.route('/api/:id').delete((req, res) => {
  const userId = req.params.id

  heros = heros.filter(user => Number(user.id) !== Number(userId))

  res.json('Deleted User')
})