import { useEffect, useState } from 'react'
import { useMember } from 'src/context/member'
import { useMemberPreferencesAPI } from 'src/modules/comms/calls/services/member-preferences.api'
import type { MemberPreferences } from 'src/modules/comms/calls/types'
import { logError } from 'src/utils/logging/logger'

const parseToMemberPreferences = (data: any): MemberPreferences => {
  return {
    timeOfCalling: data?.['What is your preferred time for communication'],
    channels: [
      data?.['What is your preferred channel of communication?'],
      data?.['What is your secondary channel of communication?'],
    ],
    preferredDays: data?.['What is your preferred day for communication'],
    frequency: data?.['What would be the ideal frequency of communication?'],
  }
}

const STORAGE_KEY = 'MEMBER_COMMUNICATION_PREFERENCES'

export const useMemberPreferences = () => {
  const { getMemberPreferences, loadLastCallLog, loadingLastCall } =
    useMemberPreferencesAPI()
  const { member } = useMember()
  const [memberPreferences, setMemberPreferences] =
    useState<MemberPreferences | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastCall, setLastCall] = useState<any>(null)

  const loadPreferencesFromApi = async (antaraId: string) => {
    setLoading(true)
    setError(null)
    let prefs: MemberPreferences | null = null
    try {
      const response = await getMemberPreferences(antaraId)
      if (response) {
        prefs = parseToMemberPreferences(response)
        // store them in local storage
        const currentPrefs = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || '{}'
        )
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...currentPrefs,
            [antaraId]: prefs,
          })
        )
      }
    } catch (e: any) {
      setError(
        e.message ?? 'An error occurred while fetching member preferences'
      )
      logError(e)
    } finally {
      setLoading(false)
      setMemberPreferences(prefs)
    }
  }

  useEffect(() => {
    if (member?.antaraId) {
      // check if we have the preferences in local storage else fetch from airtable
      const preferences = localStorage.getItem(STORAGE_KEY)
      if (preferences) {
        const memberPreferences = JSON.parse(preferences)

        if (memberPreferences[member.antaraId]) {
          setMemberPreferences(memberPreferences[member.antaraId])
        } else {
          loadPreferencesFromApi(member.antaraId)
        }
      } else {
        loadPreferencesFromApi(member.antaraId)
      }

      loadLastCallLog(member.antaraId)
        .then((res) => {
          setLastCall(res)
        })
        .catch(logError)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return {
    memberPreferences,
    loading: loading || loadingLastCall,
    error,
    lastCall,
  }
}
