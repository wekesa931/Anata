const mapAssigneeTeam = (antaraStaff: any[]) => {
    const teamType = [
      'DOCTOR',
      'NUTRITIONIST',
      'HEALTH_NAVIGATOR',
      'MEMBER_EXPERIENCE',
    ]
    return antaraStaff
      .filter(({ team }: any) => {
        return teamType.some((value) => team === value)
      })
      .sort((a, b) => a?.fullName?.localeCompare(b?.fullName))
  }



export default mapAssigneeTeam