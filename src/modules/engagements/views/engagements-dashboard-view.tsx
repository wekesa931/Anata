import React, { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Loading from 'src/components/loaders/centered'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import { throwGraphErrors } from 'src/utils/error-handling'
import { useModuleAnalytics } from 'src/modules/analytics'
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

  const {
    trackLeftNavigationClicked,
    trackRightNavigationClicked,
    trackRecommendationFeedbackGiven,
  } = useModuleAnalytics()

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
      const { data } = await getData()

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

  const handleNext = useCallback(
    (engagement?: Engagement) => {
      setEngagements((prevEngagements) => {
        const cleanedList = cleanupEngagementList(prevEngagements)
        const engagementsLeft = cleanedList.length

        setCurrentMemberIndex((currentIndex) => {
          if (engagementsLeft === 0) return 0

          // ensure index stays within bounds after cleanup
          const safeIndex =
            currentIndex >= engagementsLeft ? engagementsLeft - 1 : currentIndex
          // modulus for wrap around behaviour to return current safe index if its < eng length or 0(1st idx) if its equal to eng length
          return (safeIndex + 1) % engagementsLeft
        })

        return cleanedList
      })
      trackRightNavigationClicked(engagement?.assignedTo.fullName)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engagements, cleanupEngagementList]
  )

  const handleBack = useCallback(
    (engagement?: Engagement) => {
      setEngagements((prevEngagements) => {
        const cleanedList = cleanupEngagementList(prevEngagements)
        const engagementsLeft = cleanedList.length

        setCurrentMemberIndex((currentIndex) => {
          if (engagementsLeft === 0) return 0

          // ensure index stays within bounds after cleanup
          const safeIndex =
            currentIndex >= engagementsLeft ? engagementsLeft - 1 : currentIndex
          return safeIndex === 0 ? engagementsLeft - 1 : safeIndex - 1
        })

        return cleanedList
      })
      trackLeftNavigationClicked(engagement?.assignedTo.fullName)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engagements, cleanupEngagementList]
  )
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
    // show engagements have been completed
    if (engagements.length === 1 && engagementsResData.length > 0) {
      const results = cleanupEngagementList(engagements)
      if (results.length === 0 && engagementsResData.length > 0) {
        setCompleteEngagementMsg(
          'Recommendations successfully completed. Well done.'
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

  const allEngagementsActive = useCallback(() => {
    return engagementsResData.every(
      (eng) =>
        eng?.status?.name?.toLowerCase() === 'active' ||
        eng?.status?.name?.toLowerCase() === 'postponed'
    )
  }, [engagementsResData])

  /**
   * get member card position, prev, current and next
   * @param index number
   * @returns
   */
  const getPositionStyle = (index: number) => {
    if (currentMemberIndex >= engagements.length) {
      /** hide for index cards out of range */
      return 'hidden'
    }
    const total = engagements.length
    if (total === 2) {
      // style for only 2 engagements
      if (index === currentMemberIndex) {
        return 'order-2 z-10' // center
      }
      // other card, last card, hide 1st card
      const otherIndex = currentMemberIndex === 0 ? 1 : 0
      if (index === otherIndex) {
        return 'order-3'
      }
    }

    if (index === currentMemberIndex) {
      // center the current member card
      return 'order-2 z-10'
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
      // hide prev card if we're on the first card and all engagements are active
      //  or when we only have 2 engagements in no.
      if (
        (currentMemberIndex === 0 && allEngagementsActive()) ||
        engagements.length === 2
      ) {
        return 'relative w-[470px] order-1 opacity-0 pointer-events-none'
      }
      return 'order-1'
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
      return 'order-3'
    }
    // hide other cards
    return 'hidden'
  }

  const handleUpdateStatus = async (
    val: string,
    engagement: Engagement,
    successful: boolean = false,
    failed?: boolean,
    feedback?: string
  ) => {
    const variables: UpdateEngagementPayload = {
      input: {
        engagementRecommendationUuid: engagement.uuid,
        status: val,
      },
    }

    if (successful) {
      variables.input.result = 'successful'
    } else if (failed) {
      variables.input.result = 'failed'
    }

    if (feedback?.trim()) {
      variables.input.feedback = feedback
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
        // update for stats tracking
        setEngagementsResData((prev) => {
          const updated = prev.map((eng) =>
            eng.uuid ===
            data?.updateEngagementRecommendation?.engagementRecommendation?.uuid
              ? data?.updateEngagementRecommendation?.engagementRecommendation
              : eng
          )
          return updated
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

  const submitFeedback = async (feedback: string, engagement: Engagement) => {
    const feedbackOptionSubmitted: any = feedbackOptions.find((option) =>
      option.name.toLowerCase().includes(feedback.toLowerCase())
    )

    // get outcome status based on feedback selected
    const updatedStatus = feedbackOptionSubmitted.engagementOutcomeStatus.name
    // track a successful/failed feedback
    const isSuccessful = feedback === 'Yes and member engaged'
    const isNotSuccessful = feedback === 'Yes but member did not engage'
    await handleUpdateStatus(
      updatedStatus,
      engagement,
      isSuccessful,
      isNotSuccessful,
      feedback
    )
    trackRecommendationFeedbackGiven(engagement)
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

  // engagement feedback stats component
  function EngagementStatsComponent() {
    // get total count of successful engagements (completed and remarks saved)
    const getCompletedEngagements = () => {
      return engagementsResData.filter(
        (eng) =>
          eng.status.name.toLowerCase() === 'completed' &&
          !!eng.result?.trim() &&
          eng.result.toLowerCase().includes('successful')
      ).length
    }

    return (
      <div className="w-[320px] bg-gray-10 z-100 border p-1 rounded-2xl relative shadow-template">
        <div className="flex flex-row items-center justify-center gap-3 px-4">
          <div className="flex w-[200px] mt-2 gap-2 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500">
            {engagementsResData.map((eng) => {
              const status = eng.status.name.toLowerCase()
              const isSuccessful =
                !!eng.result.trim() &&
                eng.result.toLowerCase().includes('successful')
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
                    status === 'postponed' ||
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
              <span className="text-2xl">{getCompletedEngagements()}</span>
              <span className="text-lg"> of {engagementsResData.length}</span>
            </p>
            <p className="text-sm font-normal">Daily Goal</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-full px-20 relative overflow-x-hidden">
      {loading && (
        <div className="flex items-center justify-center flex-col mt-[15%] mb-[15%]">
          <Loading message="Loading recomendations" />
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
            <EngagementStatsComponent />
          </div>

          <div className="relative flex items-center justify-center">
            {/* invisible 1st card slot if only 2 engagements exist */}
            {engagements.length === 2 && (
              <div className="relative w-[400px] order-1 opacity-0 pointer-events-none" />
            )}
            {engagements?.map((engagement: Engagement, index) => (
              <div
                key={index}
                className={`relative ${getPositionStyle(index)}`}
              >
                {/* back button */}
                {index === currentMemberIndex && (
                  <button
                    disabled={
                      engagement?.status?.name.toLowerCase() === 'opened' ||
                      engagements.length === 1 ||
                      mutateStatusError ||
                      (currentMemberIndex === 0 && allEngagementsActive())
                    }
                    onClick={() => handleBack(engagement)}
                    className={`absolute -left-10 top-1/2 z-20 transform -translate-y-1/2 rounded-full border
                       bg-white hover:!bg-[#E8EAED]  disabled:bg-[#E8EAED] transition duration-200 p-4 disabled:cursor-not-allowed
                      ${
                        (engagement?.status?.name.toLowerCase() === 'opened' ||
                          engagements.length === 1 ||
                          mutateStatusError) &&
                        'bg-[#E8EAED]'
                      }`}
                    hidden={
                      (currentMemberIndex === 0 && allEngagementsActive()) ||
                      engagements.length < 3 ||
                      engagements.length === 1
                    }
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
                    engagementsResData={engagementsResData}
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
                    onClick={() => handleNext(engagement)}
                    className={`absolute -right-10  top-1/2 z-20 transform -translate-y-1/2 rounded-full border
                       bg-white hover:!bg-[#E8EAED]  disabled:bg-[#E8EAED] transition duration-200 p-4 disabled:cursor-not-allowed
                       ${
                         (engagement?.status?.name.toLowerCase() === 'opened' ||
                           engagements.length === 1 ||
                           mutateStatusError) &&
                         'bg-[#E8EAED]'
                       }`}
                    hidden={engagements.length === 1}
                    aria-label="Next engagement"
                  >
                    <ArrowForward fontSize="small" className="text-gray-500" />
                  </button>
                )}
              </div>
            ))}
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
