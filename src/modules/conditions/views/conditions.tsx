import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material'
import { Form } from 'formik'
import React, { useEffect, useState } from 'react'
import PrimaryForm from 'src/components/forms/primary-form'
import useConditionsData from 'src/modules/conditions/hooks/conditions.data'
import { Filters } from 'src/modules/conditions/types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  ConditionsDetails,
  ConditionsSummary,
  FiltersSection,
  SaveDialogModal,
} from 'src/modules/conditions/components'
import VitalsDisplay from 'src/modules/vitals/views/displays'
import { isDirty } from 'src/utils/form-validation-methods'
import { useNotifications } from 'src/context/notifications'
import { useMember } from 'src/context/member'
import { logError } from 'src/utils/logging/logger'
import { Loader } from 'react-feather'
import { TrackCondition } from 'src/modules/conditions/views/forms'
import EmptyData from 'src/components/feedbacks/empty-data'
import CenteredLoader from 'src/components/loaders/centered'
import { useLocation } from 'react-router-dom'
import { getInitialValues } from '../utils/transforms'
import CancelDialog from '../components/cancel-dialog'
import { shouldShowReasonForStatusChange } from '../utils'

type ConditionFlagProps = {
  [key: string]: boolean
}

export function ConditionsView() {
  const { state } = useLocation()
  const [conditions, setConditions] = useState<any>([])
  const { filterConditions, handleUpdateConditions, loadingLookups } =
    useConditionsData()
  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.ALL)
  const [expanded, setExpanded] = useState<string | false>(false)
  const [editMode, setDisplayMode] = useState<ConditionFlagProps>({})
  const [refetch, setRefetch] = useState(false)
  const [cancelModal, setCancelModal] = useState()
  const [currentCondition, setCurrentCondition] = useState<any>(null)
  const [conditionsLoading, setLoading] = useState(false)
  const [showStatusChange, setShowStatusChange] = useState<string | undefined>()

  const { notify } = useNotifications()
  const { member } = useMember()
  const [submitData, setSubmitData] = useState(false)

  useEffect(() => {
    setExpanded(state?.conditionId ?? false)

    if (state?.conditionId) {
      const element = document.getElementById(state.conditionId)

      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.conditionId])

  const loadAndFilterConditions = async (filters: Filters) => {
    try {
      setLoading(true)
      const filteredConditions = await filterConditions(filters)
      setConditions(filteredConditions)
    } catch (e: any) {
      logError(e?.message ?? 'An error occurred while fetching conditions')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (initialValues: any, show?: boolean) => (values: any) => {
    if (isDirty(initialValues, values)) {
      if (member) {
        setSubmitData(true)
        /* add reason for clinical change to payload if
         clinical status field was not updated
        */
        if (
          !show &&
          initialValues.reasonForClinicalStatusChange &&
          !values.reasonForClinicalStatusChange
        ) {
          values.reasonForClinicalStatusChange =
            initialValues.reasonForClinicalStatusChange
        }

        handleUpdateConditions(values)
          .then((result: any) => {
            if (result?.error) {
              notify(`Error updating conditions : ${result.error.message}`)
            } else {
              notify('Conditions updated successfully')
              setDisplayMode((prev) => ({
                ...prev,
                [values.id]: false,
              }))
              setShowStatusChange(undefined)
            }
            setSubmitData(false)
          })
          .catch((err: any) => {
            notify(err?.message ?? 'Error updating conditions')
          })
          .finally(() => {
            setSubmitData(false)
            setShowStatusChange(undefined)
          })
        setCancelModal(undefined)
      }
    } else {
      notify('Nothing to update')
    }
  }

  useEffect(() => {
    loadAndFilterConditions(activeFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, refetch])

  const handleDiscardEdits = (conditionId: any) => {
    loadAndFilterConditions(activeFilter)
    setDisplayMode((prev) => ({
      ...prev,
      [conditionId]: !prev[conditionId],
    }))
    setCancelModal(undefined)
  }

  const loading = conditionsLoading || loadingLookups

  const updateExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const cancelEdit = (values: any, condition: any) => {
    const initialValues = getInitialValues(condition)
    isDirty(initialValues, values)
      ? (() => {
          setCancelModal(values?.id)
          setCurrentCondition(condition)
        })()
      : handleDiscardEdits(condition.id)
  }

  const showReasonForStatusChange = (initialValues: any, values: any) => {
    const show = shouldShowReasonForStatusChange(initialValues, values)

    show
      ? setShowStatusChange(values?.id)
      : handleEdit(initialValues, show)(values)
  }

  return (
    <div className="font-rubik">
      <FiltersSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        refetch={() => setRefetch(!refetch)}
      />
      <div className="flex flex-col mt-1">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center mt-5">
            <CenteredLoader message="Loading conditions" />
          </div>
        ) : (
          <>
            {conditions.length > 0 ? (
              <>
                {conditions?.map((condition: any) => (
                  <>
                    <PrimaryForm
                      key={condition.id + refetch}
                      initialValues={getInitialValues(condition)}
                      handleSubmit={handleEdit(getInitialValues(condition))}
                      id={condition.id}
                    >
                      {(formik) => {
                        return (
                          <Form>
                            <Accordion
                              key={condition.id}
                              className="block border rounded-r-lg border-solid border-[#B2B2B2] my-1 mb-0 p-1 shadow-none"
                              sx={{
                                '&:before': {
                                  display: 'none',
                                },
                              }}
                              expanded={expanded === condition.id}
                              onChange={updateExpanded(condition.id)}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <ConditionsSummary
                                  displayMode={!editMode[condition.id]}
                                  condition={condition}
                                />
                              </AccordionSummary>
                              <AccordionDetails>
                                <>
                                  <div className="flex">
                                    {!editMode[condition.id] ? (
                                      <>
                                        <Button
                                          className="border cursor-pointer mr-4 text-sm"
                                          sx={{
                                            backgroundColor: '#FAFAFA',
                                            color: '#5D6B82',
                                          }}
                                          onClick={() =>
                                            setDisplayMode((prev) => ({
                                              ...prev,
                                              [condition.id]:
                                                !prev[condition.id],
                                            }))
                                          }
                                        >
                                          <ModeEditIcon className="mr-2" />
                                          Edit
                                        </Button>
                                        <TrackCondition
                                          initialCondition={getInitialValues(
                                            condition
                                          )}
                                          keyTargetOptions={
                                            condition.possibleTargets
                                          }
                                          possibleStages={
                                            condition.possibleStages
                                          }
                                          refetchData={() =>
                                            setRefetch(!refetch)
                                          }
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          className="border cursor-pointer mr-4 text-sm"
                                          sx={{
                                            backgroundColor: '#FAFAFA',
                                            color: '#5D6B82',
                                          }}
                                          onClick={() => {
                                            cancelEdit(formik.values, condition)
                                          }}
                                        >
                                          <CloseIcon className="mr-2" />
                                          Cancel
                                        </Button>
                                        <Button
                                          className="border cursor-pointer mr-4 !bg-[#FF9500] hover:!bg-[#FF9500]"
                                          onClick={() =>
                                            showReasonForStatusChange(
                                              condition,
                                              formik.values
                                            )
                                          }
                                        >
                                          <>
                                            {submitData ? (
                                              <>
                                                <Loader className="text-white" />
                                                <Typography className="file-action-button-text text-white font-medium">
                                                  Saving ...
                                                </Typography>
                                              </>
                                            ) : (
                                              <>
                                                <SaveIcon className="mr-2 text-white" />
                                                <Typography className="file-action-button-text text-white font-medium">
                                                  Save
                                                </Typography>
                                              </>
                                            )}
                                          </>
                                        </Button>
                                      </>
                                    )}
                                  </div>

                                  <div className="border-b mt-3 mb-3" />

                                  <ConditionsDetails
                                    condition={condition}
                                    editMode={!editMode[condition.id]}
                                  />

                                  <div className="text-center text-[#007AFF] font-medium">
                                    Health Metrics
                                  </div>
                                  <div className="border-b mt-3 mb-3 border-[#007AFF]" />
                                  <VitalsDisplay />
                                </>
                              </AccordionDetails>
                            </Accordion>
                            {condition.id === showStatusChange && (
                              <SaveDialogModal
                                open={!!showStatusChange}
                                closeModal={() =>
                                  setShowStatusChange(undefined)
                                }
                                formValues={formik.values}
                                saveEdits={handleEdit(
                                  getInitialValues(condition)
                                )}
                              />
                            )}

                            {condition.id === cancelModal && (
                              <CancelDialog
                                condition={currentCondition}
                                cancelModal={!!cancelModal}
                                handleDiscardEdits={handleDiscardEdits}
                                handleEdit={handleEdit(
                                  getInitialValues(condition)
                                )}
                                formValues={formik.values}
                                setShowStatusChange={setShowStatusChange}
                              />
                            )}
                          </Form>
                        )
                      }}
                    </PrimaryForm>
                  </>
                ))}
              </>
            ) : (
              <EmptyData title="Conditions" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ConditionsView
