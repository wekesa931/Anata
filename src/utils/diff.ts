enum RecordAction {
  DELETE = 'deleted',
  UPDATE = 'updated',
  CREATE = 'created',
}

interface RecordWIthId {
  id?: string
}

export type DiffRecord<T extends RecordWIthId, V extends RecordWIthId> = {
  [RecordAction.DELETE]: T[]
  [RecordAction.UPDATE]: V[]
  [RecordAction.CREATE]: V[]
}

export function diffRecordsById<T extends RecordWIthId, V extends RecordWIthId>(
  prev: T[],
  next: V[]
): DiffRecord<T, V> {
  let oldRecords = prev
  let newRecords = next

  if (!oldRecords) {
    oldRecords = []
  }

  if (!newRecords) {
    newRecords = []
  }

  const oldIds = new Set(oldRecords.map((record) => record.id))
  const newIds = new Set(newRecords.map((record) => record.id))

  const toBeDeleted = oldRecords.filter((record) => !newIds.has(record.id))
  const toBeAdded = newRecords.filter((record) => !oldIds.has(record.id))
  const toBeUpdated = newRecords.filter((record) => oldIds.has(record.id))

  return {
    [RecordAction.DELETE]: toBeDeleted,
    [RecordAction.UPDATE]: toBeUpdated,
    [RecordAction.CREATE]: toBeAdded,
  }
}
