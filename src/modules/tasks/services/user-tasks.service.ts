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

  const filterTasks = async (filterArg: string) => {
    return airtableFetch(
      `hntasks/list?${filterArg}&${sortArg}&${filterFields(fields)}`
    )
  }

  const getUserDueTasks = async (userId: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), FIND("Not Applicable", {Status}) = 0, IS_SAME({Due Date}, TODAY()))`

    return filterTasks(filterArg)
  }

  const getUserOverdueTasks = async (userId: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), FIND("Not Applicable", {Status}) = 0, FIND("Cancelled", {Status}) = 0, OR(FIND("Complete", {Status}) = 0, AND(FIND("Complete", {Status}) != 0, IS_SAME(LAST_MODIFIED_TIME(), TODAY(), 'day'))), OR(IS_BEFORE({Due Date}, TODAY()), IS_SAME({Due Date}, TODAY())))`
    return filterTasks(filterArg)
  }

  const getTasksBefore = async (userId: string, end: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), FIND("Not Applicable", {Status}) = 0, FIND("Cancelled", {Status}) = 0, OR(FIND("Complete", {Status}) = 0, AND(FIND("Complete", {Status}) != 0, IS_SAME(LAST_MODIFIED_TIME(), TODAY(), 'day'))), IS_BEFORE({Due Date}, "${end}"))`
    return filterTasks(filterArg)
  }

  const getUserDueAndOverdueTasks = async (userId: string) => {
    const filterArg = `filterByFormula=AND(FIND("${userId}", {Assignee Record ID}), FIND("Not Applicable", {Status}) = 0, FIND("Cancelled", {Status}) = 0, OR(FIND("Complete", {Status}) = 0, AND(FIND("Complete", {Status}) != 0, IS_SAME(LAST_MODIFIED_TIME(), TODAY(), 'day'))), OR(IS_BEFORE({Due Date}, TODAY()), IS_SAME({Due Date}, TODAY())))`
    return filterTasks(filterArg)
  }

  return {
    getUserDueTasks,
    getUserOverdueTasks,
    getTasksBefore,
    getUserDueAndOverdueTasks,
  }
}
