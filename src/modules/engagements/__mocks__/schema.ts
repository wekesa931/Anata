/* eslint-disable import/no-extraneous-dependencies */
import { SchemaLink } from '@apollo/client/link/schema'
import { faker } from '@faker-js/faker'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import { gql } from '@apollo/client'

const typeDefs = `
  type Query {
    engagementMembers: [EngagementMember!]!
  }

  type EngagementMember {
    antaraId: String!
    name: String!
    age: String!
    context: String!
    action: String!
    status: String!
  }
`

// seed to retain the same data once randomly generated
faker.seed(123)

const generateAntaraId = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const firstPart = `${
    alphabet[Math.floor(Math.random() * alphabet.length)]
  }${Math.floor(Math.random() * 90 + 10).toString()}`
  const secondPart = `${alphabet[Math.floor(Math.random() * alphabet.length)]}${
    alphabet[Math.floor(Math.random() * alphabet.length)]
  }${Math.floor(Math.random() * 90 + 10).toString()}`
  return `${firstPart}-${secondPart}`
}

const statusOptions = () => faker.helpers.arrayElement(['active'])
const contextOptions = () =>
  faker.helpers.arrayElement([
    'Diabetes Management',
    'Cardiac Rehab',
    'Roster onboarded female of 38 years with Diabetes From BlueCross, expired coverage and pending ID. Need to verify Insurance ID and schedule appointment CTA',
    'Mental Health',
    'Post-Op Care',
  ])
const actionOptions = () =>
  faker.helpers.arrayElement([
    'Schedule Follow-up',
    'Roster onboarded female of 38 years with Diabetes From BlueCross, expired coverage and pending ID. Need to verify Insurance ID and schedule appointment CTA',
    'Send Reminder',
    'Update Care Plan',
    'Review Medications',
  ])

const schema = makeExecutableSchema({ typeDefs })

export const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    Query: () => ({
      // generate 20 unique engagement members
      engagementMembers: () =>
        Array.from({ length: 20 }, () => ({
          __typename: 'EngagementMember',
          antaraId: generateAntaraId(),
          name: `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`,
          age: faker.number.int({ min: 18, max: 90 }).toString(),
          context: contextOptions(),
          action: actionOptions(),
          status: statusOptions(),
        })),
    }),
    EngagementMember: () => ({
      name: `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`,
    }),
  },
})

export const ENGAGEMENT_MEMBERS_MOCK = gql`
  query engagementRecommendations {
    engagementMembers {
      antaraId
      name
      age
      context
      action
      status
    }
  }
`

/**
 * how to make a mock query in component
 * 
   const [getMockData] = useLazyQuery(ENGAGEMENT_MEMBERS_MOCK, {
     context: {
       clientName: 'mock',
     },
   })
 */

export const mockLink = new SchemaLink({ schema: mockedSchema })
