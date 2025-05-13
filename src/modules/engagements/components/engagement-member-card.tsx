import React, { useEffect } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import { useModuleAnalytics } from 'src/modules/analytics'
import { Engagement, EngagementFeedbackOptions } from '../typings'

interface EngagementMemberCardI {
  engagement: Engagement
  currentMemberIndex: number
  index: number
  engagements: Engagement[]
  engagementsResData: Engagement[]
  updateStatus: (val: string, engagement: Engagement) => Promise<void>
  feedbackOptions: EngagementFeedbackOptions[]
  feedbackOptionsError: any
  mutateStatusError: any
  resetErrorandRetry: () => void
  updateFeedback: (val: string) => void
  engagementFeedback: string
  handleEndEngagement: (
    feedback: string,
    engagement: Engagement
  ) => Promise<void>
}

export default function EngagementMemberCard({
  engagement,
  currentMemberIndex,
  index,
  engagements,
  engagementsResData,
  updateStatus,
  feedbackOptions,
  feedbackOptionsError,
  mutateStatusError,
  updateFeedback,
  engagementFeedback,
  handleEndEngagement,
  resetErrorandRetry,
}: EngagementMemberCardI) {
  const { trackOpenDashboardClicked, trackOpenDashboardFromFeedbackClicked } =
    useModuleAnalytics()

  const handleFeedBack = (val: any) => {
    updateFeedback(val)
  }

  const openDashboard = () => {
    updateStatus('Opened', engagement)
    window.open(
      `/member/${engagement?.member?.antaraId}`,
      '_blank',
      'noopener,noreferrer'
    )
    trackOpenDashboardClicked(engagement)
  }

  const openDashboardFromFeedBack = () => {
    window.open(`/member/${engagement?.member?.antaraId}`, '_blank')
    trackOpenDashboardFromFeedbackClicked(engagement)
  }

  useEffect(() => {
    getCardStyle(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engagements, index, currentMemberIndex, engagementsResData])

  // engagement feedback component
  function EngagementFeedBackComponent() {
    return (
      <div
        className={`text-lg text-semibold text-center pb-2 ${
          !mutateStatusError && 'border-t'
        }`}
        style={{ height: mutateStatusError && '510px' }}
      >
        {mutateStatusError && mutateStatusError.memberIndex === index ? (
          <div className="flex items-center justify-center flex-col p-6">
            <div className="flex items-center justify-center flex-col mt-[15%] mb-[15%]">
              <div>
                <div className="">
                  <ReportProblemOutlinedIcon
                    sx={{ fontSize: 72 }}
                    className="text-red-100 bg-red-10 rounded-full p-2"
                  />
                </div>
                <div className="text-lg font-semibold my-4">
                  Something Went Wrong
                </div>
              </div>

              <ErrorRetry
                retry={() => resetErrorandRetry()}
                hideDefaultMessage
                customMessageDescription={`Tracking engagement STATUS for ${engagement?.member?.fullName} failed. Please retry or contact suppport.`}
                showErroIcon={false}
              />
            </div>
          </div>
        ) : (
          <>
            <p className="mt-4 text-lg font-medium">
              Did you contact the member?
            </p>
            <div className="flex flex-col space-y-2 mt-6">
              {feedbackOptionsError && (
                <>
                  <div>
                    <div className="">
                      <ReportProblemOutlinedIcon
                        sx={{ fontSize: 58 }}
                        className="text-red-100 bg-red-10 rounded-full p-2"
                      />
                    </div>
                    <div className="text-lg font-semibold my-4">
                      Something Went Wrong
                    </div>
                  </div>
                  <ErrorRetry
                    retry={() => resetErrorandRetry()}
                    hideDefaultMessage
                    customMessageDescription="Could not fetch feedback options. Please retry or contact suppport"
                    showErroIcon={false}
                  />
                </>
              )}
              {!feedbackOptionsError &&
                feedbackOptions.map((option, indx) => {
                  return (
                    <div className="relative" key={indx}>
                      {engagementFeedback === option.name && (
                        <CheckCircleIcon
                          fontSize="small"
                          className="text-primary-button h-12 absolute left-2"
                        />
                      )}
                      <button
                        className={`w-full py-2.5 px-2 text-center border hover:text-black hover:bg-gray-200 rounded-xl ${
                          engagementFeedback === option.name && 'bg-gray-200'
                        }`}
                        style={{ fontSize: '16px' }}
                        onClick={() => handleFeedBack(option.name)}
                      >
                        {option.name}
                      </button>
                    </div>
                  )
                })}
            </div>
            <PrimaryButton
              className="mt-4 rounded-xl bg-[#007AFF] disabled:cursor-pointer"
              fullWidth
              type="submit"
              disabled={!engagementFeedback.trim()}
              onClick={() =>
                handleEndEngagement(engagementFeedback, engagement)
              }
            >
              Submit Feedback
            </PrimaryButton>
          </>
        )}
      </div>
    )
  }

  // engagement complete component
  function EngagementComplete() {
    return (
      <div className=" w-[320px] md:w-[400px] lg:w-[430px] xl:w-[450px] opacity-100 relative">
        <div
          className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl border border-gray-200"
          style={{ height: '510px' }}
        >
          <div className="flex items-center justify-center w-16 h-16 text-green-100 rounded-full">
            <CheckCircleIcon className="text-green-100 w-12 h-12" />
          </div>
          <p className="mt-2 font-medium text-lg">Done</p>
          <div className="text-start mt-4 font-extralight text-sm leading-8">
            Recommendation feedback marked as <br />
            <span className="text-bold italic mx-10">
              {engagement.feedback.name}.
            </span>
            <br />
            Recommendation status is{' '}
            <span className="text-bold italic">{engagementStatus}.</span>
            <br />
            Result saved as{' '}
            <span className="text-bold italic lowercase">
              {engagement.result}.
            </span>
          </div>
        </div>
      </div>
    )
  }

  /**
   * get member card style
   * @param index number
   * @returns
   */
  const getCardStyle = (index: number) => {
    if (index === currentMemberIndex || engagements.length === 1) {
      return 'rounded-2xl bg-white shadow-lg w-[320px] md:w-[400px] lg:w-[430px] xl:w-[450px] transition scale-100'
    }

    /** style 1st card */
    const isFirstCard =
      index ===
      (currentMemberIndex === 0
        ? engagements.length - 1
        : currentMemberIndex - 1)

    /** style 3rd card */
    const isThirdCard =
      index ===
      (currentMemberIndex === engagements.length - 1
        ? 0
        : currentMemberIndex + 1)

    /** style 1st and 3rd card */
    if (isFirstCard || isThirdCard) {
      return 'rounded-2xl w-[320px] md:w-[400px] lg:w-[430px] xl:w-[450px] bg-gray-10 backdrop-blur-xl opacity-[0.20] transition scale-90  z-10'
    }
  }

  /** stores engagement status */
  const engagementStatus = engagement?.status?.name.toLowerCase()

  const isStatusIsCompleteOrCanceled =
    engagementStatus === 'canceled' || engagementStatus === 'completed'

  /** mark engagement as postponed for later */
  const engagementPostponed = engagementStatus === 'postponed'

  const showCardDetails = !isStatusIsCompleteOrCanceled && !mutateStatusError
  const showCardDetailsIfCardIndexHasNoError =
    mutateStatusError && mutateStatusError.memberIndex !== index
  const showMutateErrorCard =
    !isStatusIsCompleteOrCanceled &&
    mutateStatusError &&
    mutateStatusError.memberIndex === index

  return (
    <div
      className={`relative mx-8 opacity-100 h-[auto] overflow-y-auto relative mt-10 lg:mt-14 xl:mt-16 shadow-template-allow-scaling ${getCardStyle(
        index
      )}`}
    >
      {(showCardDetails || showCardDetailsIfCardIndexHasNoError) && (
        <div className="p-4 xl:p-6">
          {showCardDetails && (
            <>
              <div
                className={`flex flex-row ${
                  engagementStatus === 'opened' && 'mt-3'
                }
                ${engagementPostponed && 'mt-1'}
                `}
              >
                <h2 className="text-md xl:text-xl font-semibold text-gray-800 overflow-hidden">
                  {engagement?.member?.fullName}
                </h2>
                {engagementStatus === 'opened' && (
                  <button
                    className="absolute top-2.5 right-2 text-sm border rounded-lg px-2 text-gray-500 hover:bg-gray-100"
                    onClick={() => openDashboardFromFeedBack()}
                  >
                    Open Profile <ArrowForwardIcon sx={{ fontSize: 14 }} />
                  </button>
                )}
                {engagementPostponed && (
                  <div className="absolute top-2.5 right-2 text-xs p-0.5 px-1.5 border rounded-xl text-[#007AFF] bg-[#007AFF]/20">
                    Postponed
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-1 xl:mb-3">
                {engagement?.member?.age}y
              </p>
            </>
          )}

          {(engagementStatus === 'active' ||
            engagementStatus === 'postponed') && (
            <>
              {/* Context */}
              <div className="bg-gray-100 rounded-t-xl p-4 mb-1.5 xl:mb-4">
                <p className="text-sm text-gray-400 font-rubik mb-1">Context</p>
                <p className="text-gray-700 font-rubik font-light text-sm h-24 xl:h-28 overflow-y-auto">
                  {engagement.context}
                </p>
              </div>

              {/* Action */}
              <div className="bg-blue-20 rounded-b-xl p-4 mb-4 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
                <div className="text-sm text-gray-400 font-rubik mb-1">
                  Action
                </div>
                <p className="text-gray-700 text-sm font-thin leading-relaxed h-24 xl:h-28 overflow-y-auto">
                  {engagement.action}
                </p>
              </div>

              {index === currentMemberIndex || engagements.length === 1 ? (
                <PrimaryButton
                  className="rounded-xl bg-[#007AFF]"
                  fullWidth
                  type="submit"
                  onClick={() => openDashboard()}
                >
                  Open Dashboard
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  className="rounded-xl"
                  fullWidth
                  disableRipple
                  type="submit"
                >
                  Open Dashboard
                </PrimaryButton>
              )}
            </>
          )}
          {engagementStatus === 'opened' && EngagementFeedBackComponent()}
        </div>
      )}

      {showMutateErrorCard && EngagementFeedBackComponent()}

      {isStatusIsCompleteOrCanceled && EngagementComplete()}
    </div>
  )
}
