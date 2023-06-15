import React from 'react'
import { Check } from 'react-feather'

type WizardProps = {
  children: React.ReactElement<typeof WizardStep>[]
  title?: string
  subtitle?: string
}

type Step = {
  label: string
  completed: boolean
  index: number
  children: React.ReactNode
  isVisited: boolean
}

type WizardContextType = {
  onNext: (stepState?: any, cb?: () => Promise<void>) => void
  onPrev: (stepState?: any, cb?: () => Promise<void>) => void
  isStepCompleted: boolean
  isStepVisited: boolean
  state: any
}

const WizardContext = React.createContext<WizardContextType>({
  onNext: () => null,
  onPrev: () => null,
  isStepCompleted: false,
  isStepVisited: false,
  state: {},
})

export const useWizardContext = () => {
  const context = React.useContext(WizardContext)
  if (!context) {
    throw new Error('WizardContext must be used within Wizard component')
  }
  return context
}

export default function Wizard({ children, title, subtitle }: WizardProps) {
  const [steps, setSteps] = React.useState<Step[]>(
    React.Children.toArray(children).map((child: any, index: number) => {
      if (child.type !== WizardStep) {
        throw new Error(
          'Wizard component only accepts WizardStep component as children'
        )
      } else {
        return {
          label: child.props.label,
          completed: false,
          isVisited: false,
          index,
          children: child.props.children,
        }
      }
    })
  )

  // set the active step to the first step
  const [activeStep, setActiveStep] = React.useState(steps[0])

  // allow users to pass states in between steps
  const [state, setStepState] = React.useState<any>({})

  const handleStepClick = (step: Step) => {
    // only allow navigation if the step is less than the current step or on a completed step
    if (step.index < activeStep.index || step.completed || step.isVisited) {
      setActiveStep(step)
    }
  }

  const onNext = (stepState?: any, cb?: () => Promise<void>) => {
    if (stepState) {
      setStepState({
        ...state,
        ...stepState,
      })
    }
    const nextStep =
      activeStep.index === steps.length - 1
        ? steps[activeStep.index]
        : steps[activeStep.index + 1]
    const updatedSteps = steps.map((step: Step) => {
      if (step.index === activeStep.index) {
        return {
          ...step,
          completed: true,
          isVisited: true,
        }
      }
      return step
    })

    const updateSteps = () => {
      setSteps(updatedSteps)
      setActiveStep(nextStep)
    }
    if (cb) {
      cb().then(() => {
        updateSteps()
      })
    } else {
      updateSteps()
    }
  }

  const onPrev = (stepState?: any, cb?: () => Promise<void>) => {
    if (stepState) {
      setStepState({
        ...state,
        ...stepState,
      })
    }
    // mark this step as visited already and update the state
    const updatedSteps = steps.map((step: Step) => {
      if (step.index === activeStep.index) {
        return {
          ...step,
          isVisited: true,
        }
      }
      return step
    })

    if (cb) {
      cb().then(() => {
        setSteps(updatedSteps)
        setActiveStep(steps[activeStep.index - 1])
      })
    } else {
      setSteps(updatedSteps)
      setActiveStep(steps[activeStep.index - 1])
    }
  }

  const contextValue = React.useMemo(() => {
    return {
      onNext,
      onPrev,
      isStepCompleted: activeStep.completed,
      state,
      isStepVisited: activeStep.isVisited,
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  return (
    <WizardContext.Provider value={contextValue}>
      <h1 className="w-full text-left text-dark-blue-100 font-rubik text-xl font-medium mb-2">
        {title}{' '}
      </h1>
      <p className="text-grey-main text-base text-left">{subtitle}</p>
      <div className="flex justify-between items-center gap-4 p-2 bg-light-blue rounded-md mt-6">
        {steps.map((step: Step, index: number) => {
          return (
            <button
              className={`
                text-center ${
                  activeStep.index === index ? 'bg-white' : 'bg-inherit'
                } rounded-md p-2 
                ${
                  activeStep.index >= index || activeStep.isVisited
                    ? 'cursor-pointer'
                    : 'cursor-default'
                }
              `}
              onClick={() => handleStepClick(step)}
              key={index}
            >
              <span
                className="text-dark-blue-100 font-rubik font-medium justify-start flex gap-2 text-center items-center"
                key={index}
              >
                {step.label}
                {step.completed && (
                  <Check size={16} className="text-green-100" />
                )}
              </span>
            </button>
          )
        })}
      </div>
      <div className="p-4">{activeStep.children}</div>
    </WizardContext.Provider>
  )
}

type WizardStepProps = {
  label: string
  children: React.ReactNode
}

export function WizardStep({ children }: WizardStepProps) {
  return <div>{children}</div>
}
