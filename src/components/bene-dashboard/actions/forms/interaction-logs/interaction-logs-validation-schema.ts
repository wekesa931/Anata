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
  flagForReview: Yup.string().required('Flag for review is required'),
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
    is: 'Other',
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
    is: 'Other',
    then: Yup.string().required(
      'Required when outbound interaction category is other'
    ),
    otherwise: Yup.string(),
  }),
})

export default InteractionLogsValidationSchema
