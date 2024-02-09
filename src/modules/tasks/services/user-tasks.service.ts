import airtableFetch from 'src/services/airtable/fetch'
import { filterFields } from 'src/utils/airtable/field-utils'

export const useUserTasksAPI = () => {
  const fields = [
    'Type',
    'Due Date',
    'Task Notes',
    'Status',
    'Task Priority',
    'Assignee',
    'status_last_modified_at',
    'Assignee Name',
    'recordid',
    'Member Name Lookup',
    'Antara ID',
  ]
  const sortArg = `sort=[{"field":"Due Date","direction":"asc"}]`

  const statusFilter = `FIND("Not Applicable", {Status}) = 0, FIND("Cancelled", {Status}) = 0, FIND("Terminated", {member_status}) = 0, {is_test_member (from Member)} = 0, OR(FIND("Complete", {Status}) = 0, AND(FIND("Complete", {Status}) != 0, IS_SAME(LAST_MODIFIED_TIME(), TODAY(), 'day'))),`

  const filterTasks = async (filterArg: string) => {
    return airtableFetch(
      `hntasks/list?${filterArg}&${sortArg}&${filterFields(fields)}`
    )
  }


  const getTasksBefore = async (userId: string, end: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), ${statusFilter} IS_BEFORE({Due Date}, "${end}"))`
    return filterTasks(filterArg)
  }

  const getUserDueAndOverdueTasks = async (userId: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), ${statusFilter} OR(IS_BEFORE({Due Date}, TODAY()), IS_SAME({Due Date}, TODAY())))`
    return filterTasks(filterArg)
  }

  return {
    getTasksBefore,
    getUserDueAndOverdueTasks,
  }
}
