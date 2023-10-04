const { gql } = require('apollo-server');

const typeDefs = gql`
type Hero{
    id: ID
    name: String
    xman: String
    snapped: String
    power :String
    image: String
    views:Int
}

type Power{
    id:ID
    power: String
}

type Query{
    heroes: [Hero]
    hero(id:ID!): Hero

}

type Mutation{
    hero(views:Int! , id:ID!): Hero
}

`

exports.typeDefs = typeDefs;