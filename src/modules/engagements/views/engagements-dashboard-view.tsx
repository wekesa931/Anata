import React, { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Loading from 'src/components/loaders/centered'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import { throwGraphErrors } from 'src/utils/error-handling'
import EngagementMemberCard from '../components/engagement-member-card'
import {
  ENGAGEMENT_RECOMMENDATIONS_QUERY,
  UPDATE_RECOMMENDATION_STATUS,
} from '../services'
import {
  Engagement,
  EngagementFeedbackOptions,
  UpdateEngagementPayload,
} from '../typings'
import {
  UserIconWithCheck,
  UserIconWithoutCheck,
} from '../components/icons/usercheckicons'
import { ENGAGEMENT_RECOMMENDATIONS_FEEDBACK_QUERY } from '../services/gql/queries'

export default function EngagementsDashboardView() {
  const [engagements, setEngagements] = useState<Engagement[]>([])
  const [engagementsResData, setEngagementsResData] = useState<Engagement[]>([])
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0)
  const [engagementFeedback, setEngagementFeedback] = useState('')
  const [feedbackOptions, setFeedbackOptions] = useState<
    EngagementFeedbackOptions[]
  >([])
  const [feedbackOptionsError, setFeedbackOptionsError] = useState('')
  const [mutateStatusError, setMutateStatusError] = useState<any>()
  const [completeEngagementMsg, setCompleteEngagementMsg] = useState('')

  const [getData, { loading, error }] = useLazyQuery(
    ENGAGEMENT_RECOMMENDATIONS_QUERY,
    {
      context: {
        clientName: 'v2',
      },
    }
  )

  const [getFeedbackOptions] = useLazyQuery(
    ENGAGEMENT_RECOMMENDATIONS_FEEDBACK_QUERY,
    {
      context: {
        clientName: 'v2',
      },
    }
  )

  const [mutate] = useMutation(UPDATE_RECOMMENDATION_STATUS, {
    context: {
      clientName: 'v2',
    },
  })

  const fetchFeedbackOptions = async () => {
    try {
      const { data } = await getFeedbackOptions()

      const results =
        data?.engagementRecommendationsFeedback?.edges?.map(
          (item: any) => item.node
        ) || []

      setFeedbackOptions(results)
    } catch (error: any) {
      setFeedbackOptionsError(error)
      return throwGraphErrors(error)
    }
  }

  const fetchEngagmentList = async () => {
    try {
      const { data } = await getData({
        variables: {
          first: 1,
          last: 20,
        },
      })

      const results =
        data?.engagementRecommendations?.edges?.map((item: any) => item.node) ||
        []

      setEngagementsResData(results)
      const updateList = cleanupEngagementList(results)
      setEngagements(updateList)
    } catch (error) {
      return throwGraphErrors(error)
    }
  }

  const cleanupEngagementList = (results: any) => {
    return results.filter((item: any) => {
      const status = item.status?.name.toLowerCase()
      return status !== 'completed' && status !== 'canceled'
    })
  }

  const handleNext = useCallback(() => {
    setEngagements(cleanupEngagementList(engagements))
    setCurrentMemberIndex((prevIndex) =>
      prevIndex === engagements.length - 1 ? 0 : prevIndex + 1
    )
  }, [engagements])

  const handleBack = useCallback(() => {
    setEngagements(cleanupEngagementList(engagements))
    setCurrentMemberIndex((prevIndex) =>
      prevIndex === 0 ? engagements.length - 1 : prevIndex - 1
    )
  }, [engagements])

  useEffect(() => {
    // index of the first engagement with status "opened"
    const openedIndex = engagements.findIndex(
      (engag) => engag.status?.name.toLowerCase() === 'opened'
    )

    // if opened engagement exists set it's index as current index
    if (openedIndex !== -1) {
      setCurrentMemberIndex(openedIndex)
    }
  }, [engagements])

  useEffect(() => {
    if (engagements.length < 2 && engagementsResData.length > 0) {
      const results = cleanupEngagementList(engagements)
      if (results.length === 0 && engagementsResData.length > 0) {
        setCompleteEngagementMsg(
          'Engagements successfully completed. Well done.'
        )
      }
    }
  }, [engagements, engagementsResData])

  useEffect(() => {
    /** keyboard event listener for right and left arrow keys */
    const handleKeyPress = (e: any) => {
      if (e.key === 'ArrowRight') {
        handleNext()
      }
      if (e.key === 'ArrowLeft') {
        handleBack()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    // cleanup keydown event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleNext, handleBack])

  /**
   * get member card position, prev, current and next
   * @param index number
   * @returns
   */
  const getPositionStyle = (index: number) => {
    if (index === currentMemberIndex) {
      // center the current member card
      return 'relative order-2 ml-10 mr-10'
    }
    /* previous member card
    if the current index is the 1st element/card, the previous index should be the last one, for wrap around behavior
    if the current index is not the 1st, subtract 1 from current index to get index of the previous card
    */
    if (
      index ===
      (currentMemberIndex === 0
        ? engagements.length - 1
        : currentMemberIndex - 1)
    ) {
      return 'relative order-3 ml-10 mr-10'
    }
    /* next member card
    if the current index is the last one card, the next index should be the 1st index, for wrap around behavior
    if the current index is not the last card, add 1 to current index to get index of next card
    */
    if (
      index ===
      (currentMemberIndex === engagements.length - 1
        ? 0
        : currentMemberIndex + 1)
    ) {
      return 'relative order-1 ml-10 mr-10'
    }
    // hide other cards
    return 'absolute hidden'
  }

  const handleUpdateStatus = async (
    val: string,
    engagement: Engagement,
    successful: boolean = false
  ) => {
    const variables: UpdateEngagementPayload = {
      input: {
        engagementRecommendationUuid: engagement.uuid,
        status: val,
      },
    }

    if (successful) {
      variables.input.remarks = 'successful'
    }

    try {
      const { data } = await mutate({
        variables: {
          ...variables,
        },
      })

      if (data) {
        setEngagements((prev) => {
          // replace the updated engagement with the new response
          const updatedEngagements = prev.map((engag) =>
            engag.uuid ===
            data?.updateEngagementRecommendation?.engagementRecommendation?.uuid
              ? data?.updateEngagementRecommendation?.engagementRecommendation
              : engag
          )
          return updatedEngagements
        })
      }
    } catch (error: any) {
      setMutateStatusError(() => ({
        memberIndex: currentMemberIndex,
        error: JSON.stringify(error),
      }))
      return throwGraphErrors(error)
    }
  }

  const handleUpdateFeedback = (val: string) => {
    setEngagementFeedback((prev) => (prev === val ? '' : val))
  }

  const submitFeedback = async (feedback: string, engagement: any) => {
    const feedbackOptionSubmitted: any = feedbackOptions.find(
      (option) => option.name === feedback
    )
    // get outcome status based on feedback selected
    const updatedStatus = feedbackOptionSubmitted.engagementOutcomeStatus.name
    // track a successful feedback
    const isSuccessful = feedback === 'Yes and member engaged'
    await handleUpdateStatus(updatedStatus, engagement, isSuccessful)
    setEngagementFeedback('')
    // Update engagementsResData based on the status update
    setEngagementsResData((prevData) => {
      return prevData.map((eng: Engagement) => {
        if (eng.uuid === engagement.uuid) {
          return {
            ...eng,
            status: {
              ...eng.status,
              name: updatedStatus, // status
            },
          }
        }
        return eng
      })
    })
  }

  const handleResetFeedbackError = () => {
    setFeedbackOptionsError('')
    setMutateStatusError(null)
  }

  useEffect(() => {
    fetchFeedbackOptions()
    fetchEngagmentList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // get total count of engagement finished (completed/canceled)
  const completedEngagements = () => {
    const res = engagementsResData.filter(
      (eng: Engagement) =>
        eng.status.name.toLowerCase() === 'completed' && !!eng.remarks.trim()
    )
    return res.length
  }

  // engagement feedback stats component
  function EngagementStatsComponent() {
    return (
      <div className="w-[320px] bg-gray-10 z-100 border p-1 rounded-2xl relative shadow-template">
        <div className="flex flex-row items-center justify-center gap-3 px-4">
          <div className="flex w-[200px] mt-2 gap-2 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500">
            {engagementsResData.map((eng) => {
              const status = eng.status.name.toLowerCase()
              const isSuccessful = !!eng.remarks.trim()
              return (
                <div
                  key={eng.id}
                  className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border ${
                    status === 'completed' && isSuccessful
                      ? 'bg-green-10'
                      : 'bg-gray-200'
                  }`}
                >
                  {status === 'completed' && isSuccessful && (
                    <UserIconWithCheck />
                  )}
                  {(status === 'active' ||
                    status === 'opened' ||
                    status === 'canceled' ||
                    (status === 'completed' && !isSuccessful)) && (
                    <UserIconWithoutCheck />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">
              <span className="text-2xl">{completedEngagements()}</span>
              <span className="text-lg"> of {engagementsResData.length}</span>
            </p>
            <p className="text-sm font-normal">Daily Goal</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-2 relative overflow-hidden">
      {loading && (
        <div className="flex items-center justify-center flex-col mt-[15%] mb-[15%]">
          <Loading message="Loading engagements" />
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center justify-center flex-col mt-[15%] mb-[15%]">
          <ErrorRetry retry={() => fetchEngagmentList()} />
        </div>
      )}

      {!loading && !error && engagements.length > 0 && (
        <>
          {/* engagement stats component */}
          <div className="text-sm text-gray-500 mb-6 absolute top-0">
            {EngagementStatsComponent()}
          </div>
          <div className="flex items-center justify-center relative space-x-6">
            {engagements?.map((engagement: Engagement, index) => (
              <div key={index} className={`${getPositionStyle(index)}`}>
                {/* back button */}
                {index === currentMemberIndex && (
                  <button
                    disabled={
                      engagement?.status?.name.toLowerCase() === 'opened' ||
                      engagements.length === 1 ||
                      mutateStatusError
                    }
                    onClick={handleBack}
                    className={`absolute -left-20 top-1/2 rounded-full bg-gray-100 hover:!bg-[#E8EAED] transition duration-200 p-4 order-1 disabled:cursor-not-allowed
                      ${
                        (engagements.length < 3 || engagements.length === 1) &&
                        'hidden'
                      }
                      ${
                        (engagement?.status?.name.toLowerCase() === 'opened' ||
                          engagements.length === 1 ||
                          mutateStatusError) &&
                        'bg-[#E8EAED]'
                      }`}
                    aria-label="Previous engagement"
                  >
                    <ArrowBack fontSize="small" className="text-gray-500" />
                  </button>
                )}

                {/* member card */}
                {!completeEngagementMsg.trim() && (
                  <EngagementMemberCard
                    engagement={engagement}
                    engagements={engagements}
                    currentMemberIndex={currentMemberIndex}
                    index={index}
                    updateStatus={handleUpdateStatus}
                    feedbackOptions={feedbackOptions}
                    feedbackOptionsError={feedbackOptionsError}
                    mutateStatusError={mutateStatusError}
                    resetErrorandRetry={handleResetFeedbackError}
                    updateFeedback={handleUpdateFeedback}
                    engagementFeedback={engagementFeedback}
                    handleEndEngagement={submitFeedback}
                  />
                )}

                {/* forward button */}
                {index === currentMemberIndex && (
                  <button
                    disabled={
                      engagement?.status?.name.toLowerCase() === 'opened' ||
                      engagements.length === 1 ||
                      mutateStatusError
                    }
                    onClick={handleNext}
                    className={`absolute -right-20 top-1/2 rounded-full bg-gray-100 hover:!bg-[#E8EAED] transition duration-200 p-4 order-3 disabled:cursor-not-allowed
                       ${engagements.length === 1 && 'hidden'}
                       ${
                         (engagement?.status?.name.toLowerCase() === 'opened' ||
                           engagements.length === 1 ||
                           mutateStatusError) &&
                         'bg-[#E8EAED]'
                       }`}
                    aria-label="Next engagement"
                  >
                    <ArrowForward fontSize="small" className="text-gray-500" />
                  </button>
                )}
              </div>
            ))}

            {/* invisible 3rd card slot if only 2 engagements exist */}
            {engagements.length === 2 && (
              <div className="relative w-[400px] order-1 opacity-60 pointer-events-none" />
            )}
          </div>
        </>
      )}
      {!loading &&
        !error &&
        cleanupEngagementList(engagements).length === 0 &&
        !!completeEngagementMsg.trim() && (
          <div className="flex flex-col justify-center items-center font-rubik my-2">
            <p className="text-base font-medium">{completeEngagementMsg}</p>
          </div>
        )}
      {!loading &&
        !error &&
        engagements.length === 0 &&
        !completeEngagementMsg.trim() && (
          <div className="flex flex-col justify-center items-center font-rubik my-2">
            <p className="text-base font-medium">
              No Recommendations data available
            </p>
          </div>
        )}
    </div>
  )
}
