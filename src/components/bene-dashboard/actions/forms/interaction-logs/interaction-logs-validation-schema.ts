/* eslint-disable react/forbid-prop-types */
import dayjs from 'dayjs'
import * as Yup from 'yup'

const InteractionLogsValidationSchema = Yup.object().shape({
  member: Yup.string().required('Member is required'),
  interactionStartedAt: Yup.date()
    .required('Interaction date is required')
    .test(
      'isNotFutureDate',
      'Interaction date should not be a future date',
      (value) => {
        if (value) {
          return (
            dayjs(value).isBefore(new Date()) ||
            dayjs(value).isSame(new Date(), 'd')
          )
        }
        return false
      }
    ),
  healthNavigator: Yup.string().required('HN is required'),
  interactorType: Yup.string().required('Type is required'),
  interactionSummaryNotes: Yup.string().required('Summary notes is required'),
  outcome: Yup.string().required('Select the next steps'),
  interactorName: Yup.string().when('interactorType', {
    is: (type) => type !== 'Beneficiary',
    then: Yup.string().required(
      'Interactor name is required if interactor type is not Beneficiary'
    ),
  }),
  relationshipType: Yup.string().when('interactorType', {
    is: (interactorType) =>
      interactorType === 'Payor' ||
      interactorType === 'Caregiver' ||
      interactorType === 'Relative',
    then: Yup.string().required(
      'Relationship type is required if interactor type is Payor, Caregiver or Relative'
    ),
    otherwise: Yup.string(),
  }),
  modeOfCommunication: Yup.string().required(
    'Mode of communication is required'
  ),
  interactionDirection: Yup.string().required('Interaction type is required'),
  inboundInteractionCategory: Yup.array().when('interactionDirection', {
    is: 'Inbound interaction',
    then: Yup.array()
      .required(
        'Inbound interaction category is required when interaction direction is inbound.'
      )
      .min(1),
    otherwise: Yup.array(),
  }),
  otherCategoryInbound: Yup.string().when('inboundInteractionCategory', {
    is: (category) => category && category.includes('Other'),
    then: Yup.string().required(
      'Required when inbound interaction category is other'
    ),
    otherwise: Yup.string(),
  }),
  outboundInteractionCategory: Yup.array()
    .of(Yup.string())
    .when('interactionDirection', {
      is: 'Outbound interaction',
      then: Yup.array()
        .required(
          'Outbound interaction category is required when interaction direction is outbound.'
        )
        .min(1),
      otherwise: Yup.array(),
    }),
  otherCategoryOutbound: Yup.string().when('outboundInteractionCategory', {
    is: (category) => category && category.includes('Other'),
    then: Yup.string().required(
      'Required when outbound interaction category is other'
    ),
    otherwise: Yup.string(),
  }),
  flagForReview: Yup.string().when('outcome', {
    is: 'Flag for Review',
    then: Yup.string().required('Flag for review is required'),
  }),
  outcomeMetadata: Yup.object({
    reasonForConsultation: Yup.string().when('outcome', {
      is: 'Virtual Consultation Required',
      then: Yup.string().required(
        'Describe the reason(s) why you are requesting a Virtual Consultation'
      ),
    }),
  }),
  mhcReferralNotes: Yup.string().when('outcome', {
    is: 'MHC',
    then: Yup.string().required('MHC notes is required'),
  }),
  mhcReferralReasons: Yup.string().when('outcome', {
    is: 'MHC',
    then: Yup.string().required('Describe the reason(s) for MHC referral'),
  }),
})

export default InteractionLogsValidationSchema
