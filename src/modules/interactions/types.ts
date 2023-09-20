import { RecordID, CreatedByRecord } from 'src/types'

export enum InteractionDirectionEnum {
  Inbound = 'Inbound interaction',
  Outbound = 'Outbound interaction',
}

export interface BaseInteractionLogFormData {
  'Encounter Date': string
  'Interaction Direction': InteractionDirectionEnum
  'Mode of Communication': string
  'Interactor Type': string
  'Interactor Name'?: string
  'Relationship Type'?: string
  'MHC Reasons for Referral'?: string
  'Next Steps': string[]
  'Flag for Review'?: string
  'Interactor Summary Notes': string
  Member?: RecordID
  createdBy?: CreatedByRecord
  updatedBy?: CreatedByRecord
  'Reasons for Consultation'?: string
  'NC Reasons for Referral'?: string
  'Notes for Nutritional Consultation'?: string
  'Pedriatic Reasons for Referral'?: string
  'Notes for Pediatric'?: string
}

// inbound interaction has 'Inbound Interaction Category' field required
export interface InboundInteractionFormData extends BaseInteractionLogFormData {
  'Outbound Interaction Category'?: string[]
  'Inbound Interaction Category': string[]
  'Other Category (Inbound)'?: string
  'Other Category (Outbound)'?: string
}

// outbound interaction has 'Outbound Interaction Category' field required
export interface OutboundInteractionFormData
  extends BaseInteractionLogFormData {
  'Outbound Interaction Category': string[]
  'Inbound Interaction Category'?: string[]
  'Other Category (Outbound)'?: string
  'Other Category (Inbound)'?: string
}

export type InteractionLogFormData =
  | InboundInteractionFormData
  | OutboundInteractionFormData

interface OutcomeMetadata {
  creator: string
  reasonForConsultation?: string
  [key: string]: any
}

export interface BaseInteractionLog {
  interactionStartedAt: string
  interactionDirection: InteractionDirectionEnum
  outcome: any
  flagForReview?: any
  interactionSummaryNotes: string
  modeOfCommunication: string
  interactorType: string
  relationshipType?: string
  interactorName?: string
  outcomeMetadata?: OutcomeMetadata
  historyUserIdField: string
  member?: string
  healthNavigator?: string
  reasonForConsultation?: string
  mhcReferralReasons?: string
  ncReferralReasons?: string
  ncReferralNotes?: string
  pedcReferralReasons?: string
  pedcReferralNotes?: string
}

export interface InboundInteractionLog extends BaseInteractionLog {
  inboundInteractionCategory: string[]
  otherCategoryInbound?: string
  outboundInteractionCategory?: string[]
  otherCategoryOutbound?: string
}

export interface OutboundInteractionLog extends BaseInteractionLog {
  outboundInteractionCategory: string[]
  otherCategoryOutbound?: string
  inboundInteractionCategory?: string[]
  otherCategoryInbound?: string
}

export type InteractionLog = InboundInteractionLog | OutboundInteractionLog
