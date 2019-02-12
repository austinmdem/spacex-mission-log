const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    flight_number: { type: GraphQLInt },
    rocket: { type: RocketType }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Roadster
const RoadsterType = new GraphQLObjectType({
  name: 'Roadster',
  fields: () => ({
    name: { type: GraphQLString },
    launch_date_utc: { type: GraphQLString },
    launch_mass_lbs: { type: GraphQLString },
    orbit_type: { type: GraphQLString },
    speed_mph: { type: GraphQLString },
    earth_distance_mi: { type: GraphQLString },
    mars_distance_mi: { type: GraphQLString },
    details: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/rockets')
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.id}`)
          .then(res => res.data);
      }
    },
    roadster: {
      type: RoadsterType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/roadster')
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
