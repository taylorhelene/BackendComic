
const db = require('better-sqlite3')('chinook.db', { readonly: true, fileMustExist: true});
const { gql } = require('graphql-tag');


const typeDefs = gql`
	type Playlist {
		"PlaylistId"
		id: ID
		"Name"
		name: String
	}

	type Customer {
		"Customer ID"
		id: ID
		"First name"
		firstName: String
		"Last name"
		lastName: String
		"Country"
		country: String
		"Email"
		email: String
	}

	type Query {
		playlists: [Playlist]
		playlist(id: ID!): Playlist
		customerLocation(country: String!): [Customer]
	}
`

const resolvers = {
	Query: {
		playlists: () => db.prepare(
			'SELECT DISTINCT Name name ' + 
			'FROM playlists ' + 
			'ORDER BY name'
		).all()
		
		
		
		,

		playlist: (_, {id}) => db.prepare(
			'SELECT PlaylistId id, Name name ' +
			'FROM playlists ' + 
			'WHERE PlaylistId  = ?'
		).get(id),

		customerLocation: (_, {country}) => db.prepare(
			'SELECT FirstName firstName, LastName lastName, Email email ' + 
			'FROM customers ' + 
			'WHERE Country = ? ' + 
			'ORDER BY FirstName'
		).all(country),
	},
}

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;