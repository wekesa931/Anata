import React from 'react'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import { useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import dayjs from 'dayjs'
import FormField from '../../../../utils/form-field/form-field.component'
import Toasts from '../../../../../helpers/toast'
import InteractionLogsValidationSchema from './interaction-logs-validation-schema'
import useInteractionFormFields from './interaction-logs.fields'
import {
  GET_INTERACTIONS,
  CREATE_INTERACTION,
} from '../../../../../gql/interactions'
import styles from './interaction-logs-form.component.css'
import analytics from '../../../../../helpers/segment'

const InteractionLogsForm = () => {
  const { search } = useLocation()
  const { data } = qs.parse(search)
  const [startTime, setStartTime] = dayjs()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { member, user } = JSON.parse(data)
  const fields = useInteractionFormFields()
  const [createInteraction] = useMutation(CREATE_INTERACTION, {
    refetchQueries: [
      { query: GET_INTERACTIONS, variables: { antaraId: member['Antara ID'] } },
    ],
    awaitRefetchQueries: true,
  })

  React.useEffect(() => {
    analytics.track('Interaction Log Form Opened', {
      member: member['Antara ID'],
    })
  }, [member])

  const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    createInteraction({
      variables: {
        input: {
          ...values,
          member: member['Antara ID'],
          historyUserIdField: user && user.email,
        },
      },
    })
      .catch((e) => {
        Toasts.showErrorNotification()
        analytics.track('Interaction Log Submit Failure', {
          member: member['Antara ID'],
          error: e,
        })
      })
      .then(() => {
        setSubmitting(false)
        analytics.track('Interaction Log Submitted', {
          member: member['Antara ID'],
        })
        analytics.track('Interaction Log Time To Submit (mins)', {
          timeTaken: dayjs().diff(startTime, 'minute'),
        })
        setStartTime(dayjs())
        Toasts.showSuccessConfirmationDialog(
          'Form saved successfully!',
          'Submit another one?',
          'Return to dashboard',
          () => {
            window.close()
          },
          () => {
            window.location.reload()
          }
        )
      })
  }
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formName}>Interaction Logs Form</h2>
      <Formik
        initialValues={fields.reduce(
          (acc, field) => ({ ...acc, [field.name]: field.value }),
          {}
        )}
        validationSchema={InteractionLogsValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            {fields.map(
              (field) =>
                (!field.condition || field.condition(values)) && (
                  <div className="margin-bottom-16" key={field.name}>
                    <label htmlFor={field.name}>
                      {field.label} <span className="text-danger">*</span>
                    </label>
                    <FormField
                      {...field}
                      disabled={field.disabled ? field.disabled : false}
                    />
                    <p className="text-small text-danger">
                      <ErrorMessage name={field.name} />
                    </p>
                  </div>
                )
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default InteractionLogsForm
