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

type HeroList{
    superhero : String
    publisher: String
    alter_ego : String
    first_appearance: String
    character: String
    url: String
}

type Query{
    heroes: [Hero]
    hero(id:ID!): Hero
    superheroeslist: [HeroList]

}

type Mutation{
    hero(views:Int! , id:ID!): Hero
}

`

exports.typeDefs = typeDefs;