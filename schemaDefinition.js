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

type Comics{
    name : String
    date : String
    rating  : String
    writer  : String
    cover_artist  : String
    editor  : String
    digital  : String
    link : String
    price  : String
    url : String
}

enum Sort{
    ASC
    DESC
}

type Games{
    name : String 
    date : String 
    developer : String 
    publisher : String 
    available_on : String
    overview : String
    src : String 
    extras : String 
    video : String
}

type Query{
    heroes: [Hero]
    hero(id:ID!): Hero
    superheroeslist: [HeroList]
    comics:[Comics]
    games:[Games]
    featuredGame ( action :Sort, limit: ID) : [Games]

}

type Mutation{
    hero( id:ID!): Hero
}

`

exports.typeDefs = typeDefs;