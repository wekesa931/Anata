import {
  InteractionLogFormData,
  InteractionLog,
  InboundInteractionFormData,
  OutboundInteractionFormData,
  InboundInteractionLog,
  OutboundInteractionLog,
  BaseInteractionLog,
  BaseInteractionLogFormData,
} from 'src/modules/interactions/types'
import { extractUsername } from 'src/modules/interactions/utils'

export const transformBaseInteractionLogData = (
  data: BaseInteractionLogFormData,
  antaraId: string,
  userEmail: string
): BaseInteractionLog => {
  const {
    'Interaction Direction': interactionDirection,
    'Encounter Date': interactionStartedAt,
    'Mode of Communication': modeOfCommunication,
    'Interactor Type': interactorType,
    'Interactor Summary Notes': interactionSummaryNotes,
    'MHC Reasons for Referral': mhcReferralReasons,
    'NC Reasons for Referral': ncReferralReasons,
    'Notes for Nutritional Consultation': ncReferralNotes,
    'Pedriatic Reasons for Referral': pedcReferralReasons,
    'Notes for Pediatric': pedcReferralNotes,
    'Flag for Review': flagForReview,
    'Interactor Name': interactorName,
    'Relationship Type': relationshipType,
    'Reasons for Consultation': reasonForConsultation,
    'Next Steps': nextSteps,
  } = data

  const outcomeMetadata: any = {
    creator: userEmail,
  }
  const outcome = JSON.stringify(nextSteps)
  if (reasonForConsultation) {
    outcomeMetadata.reasonForConsultation = reasonForConsultation
  }

  return {
    outcome,
    outcomeMetadata,
    member: antaraId,
    historyUserIdField: userEmail,
    healthNavigator: extractUsername(userEmail),
    interactionDirection,
    interactionStartedAt,
    modeOfCommunication,
    interactorType,
    interactionSummaryNotes,
    mhcReferralReasons,
    ncReferralReasons,
    ncReferralNotes,
    pedcReferralReasons,
    pedcReferralNotes,
    flagForReview,
    interactorName,
    relationshipType,
  }
}

export const transformInboundInteractionLogData = (
  data: InboundInteractionFormData,
  antaraId: string,
  userEmail: string
): InboundInteractionLog => {
  const baseInteractionLog = transformBaseInteractionLogData(
    data,
    antaraId,
    userEmail
  )
  const inboundInteractionLog: InboundInteractionLog = {
    ...baseInteractionLog,
    inboundInteractionCategory: data['Inbound Interaction Category'],
    otherCategoryInbound: data['Other Category (Inbound)'],
  }
  return inboundInteractionLog
}

export const transformOutboundInteractionLogData = (
  data: OutboundInteractionFormData,
  antaraId: string,
  userEmail: string
): OutboundInteractionLog => {
  const baseInteractionLog = transformBaseInteractionLogData(
    data,
    antaraId,
    userEmail
  )
  const outboundInteractionLog: OutboundInteractionLog = {
    ...baseInteractionLog,
    outboundInteractionCategory: data['Outbound Interaction Category'],
    otherCategoryOutbound: data['Other Category (Outbound)'],
  }
  return outboundInteractionLog
}

export const transformInteractionLogData = (
  data: InteractionLogFormData,
  antaraId: string,
  email: string
): InteractionLog => {
  // check if inbound or outbound
  return data['Interaction Direction'] === 'Inbound interaction'
    ? transformInboundInteractionLogData(
        data as InboundInteractionFormData,
        antaraId,
        email
      )
    : transformOutboundInteractionLogData(
        data as OutboundInteractionFormData,
        antaraId,
        email
      )
}
