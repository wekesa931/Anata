import React, { useState } from 'react'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import { useMutation } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import dayjs from 'dayjs'
import FormField from '../../../../utils/form-field/form-field.component'
import Toasts from '../../../../../helpers/toast'
import InteractionLogsValidationSchema from './interaction-logs-validation-schema'
import useInteractionFormFields from './interaction-logs.fields'
import { CREATE_INTERACTION } from '../../../../../gql/interactions'
import styles from './interaction-logs-form.component.css'
import analytics from '../../../../../helpers/segment'
import Bugsnag from '@bugsnag/js'

const InteractionLogsForm = () => {
  const { search } = useLocation()
  const { data } = qs.parse(search)
  const [startTime, setStartTime] = useState(dayjs())
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { member, user } = JSON.parse(data)
  const fields = useInteractionFormFields()
  const [createInteraction] = useMutation(CREATE_INTERACTION)

  React.useEffect(() => {
    analytics.track('Interaction Log Form Opened', {
      member: member['Antara ID'],
    })
  }, [member])

  const extractUsername = (email: string) => {
    return email.replace(/@.*$/, '')
  }

  const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    createInteraction({
      variables: {
        input: {
          ...values,
          member: member['Antara ID'],
          historyUserIdField: user && user.email,
          healthNavigator:
            values.healthNavigator && extractUsername(values.healthNavigator),
        },
      },
    })
      .catch((e) => {
        Toasts.showErrorNotification()
        Bugsnag.notify(e)
      })
      .then((response) => {
        setSubmitting(false)
        if (
          response &&
          response.data &&
          response.data.createInteraction.status === 200
        ) {
          analytics.track('Interaction Log Submitted', {
            ...values,
            member: member['Antara ID'],
            historyUserIdField: user && user.email,
            healthNavigator:
              values.healthNavigator && extractUsername(values.healthNavigator),
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
        } else {
          Toasts.showErrorNotification()
          Bugsnag.notify(
            (response &&
              response.errors &&
              new Error(response.errors.join(','))) ||
              new Error('Interaction Log Submit Failure')
          )
        }
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
                    <label htmlFor={field.name} id={`${field.name}Label`}>
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
