import {
  transformBaseInteractionLogData,
  transformInteractionLogData,
} from 'src/modules/interactions/utils/data-transforms/input-transforms'
import { InteractionDirectionEnum } from 'src/modules/interactions/types'

describe('transformBaseInteractionLogData', () => {
  it('should return the correct data', () => {
    const data = {
      'Interaction Direction': InteractionDirectionEnum.Inbound,
      'Encounter Date': '2021-07-01',
      'Mode of Communication': 'Phone',
      'Interactor Type': 'Member',
      'Interactor Summary Notes': 'Test',
      'MHC Reasons for Referral': 'Test',
      'NC Reasons for Referral': 'Test',
      'Notes for Nutritional Consultation': 'Test',
      'Pedriatic Reasons for Referral': 'Test',
      'Notes for Pediatric': 'Test',
      'Flag for Review': 'Test',
      'Interactor Name': 'Test',
      'Relationship Type': 'Test',
      'Reasons for Consultation': 'Test',
      'Next Steps': ['Test'],
    }
    const antaraId = '123'
    const userEmail = 'shad@mail.com'

    const result = transformBaseInteractionLogData(data, antaraId, userEmail)

    expect(result).toEqual({
      outcome: JSON.stringify(['Test']),
      outcomeMetadata: {
        creator: 'shad@mail.com',
        reasonForConsultation: 'Test',
      },
      member: '123',
      historyUserIdField: 'shad@mail.com',
      interactionDirection: InteractionDirectionEnum.Inbound,
      interactionStartedAt: '2021-07-01',
      modeOfCommunication: 'Phone',
      interactorType: 'Member',
      interactionSummaryNotes: 'Test',
      mhcReferralReasons: 'Test',
      ncReferralReasons: 'Test',
      ncReferralNotes: 'Test',
      pedcReferralReasons: 'Test',
      pedcReferralNotes: 'Test',
      flagForReview: 'Test',
      interactorName: 'Test',
      relationshipType: 'Test',
      healthNavigator: 'shad',
    })
  })

  it('should return the correct data when the some keys are empty', () => {
    const antaraId = '123'
    const userEmail = 'test@mail.com'

    const data = {
      'Interaction Direction': InteractionDirectionEnum.Inbound,
      'Inbound Interaction Category': ['Test'],
      'Encounter Date': '2021-07-01',
      'Mode of Communication': 'Phone',
      'Interactor Type': 'Member',
      'Interactor Summary Notes': 'Test',
      'Next Steps': ['Test'],
    }

    const result = transformInteractionLogData(data, antaraId, userEmail)

    expect(result).toEqual({
      outcome: JSON.stringify(['Test']),
      outcomeMetadata: {
        creator: 'test@mail.com',
      },
      member: '123',
      historyUserIdField: 'test@mail.com',
      healthNavigator: 'test',
      interactionDirection: InteractionDirectionEnum.Inbound,
      interactionStartedAt: '2021-07-01',
      inboundInteractionCategory: ['Test'],
      otherCategoryInbound: undefined,
      outboundInteractionCategory: undefined,
      otherCategoryOutbound: undefined,
      modeOfCommunication: 'Phone',
      interactorType: 'Member',
      interactionSummaryNotes: 'Test',
      mhcReferralReasons: undefined,
      ncReferralReasons: undefined,
      ncReferralNotes: undefined,
      pedcReferralReasons: undefined,
      pedcReferralNotes: undefined,
      flagForReview: undefined,
      interactorName: undefined,
      relationshipType: undefined,
    })
  })
})
