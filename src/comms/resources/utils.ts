export const BASE_URL = process.env.SMS_BASE_URL
const token: string = process.env.SMS_API_ACCESS_TOKEN ?? ''

export const CommsFetch = (path: string, method = 'GET', body?: string) => {
  return fetch(`${BASE_URL}/${path}`, {
    method,
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken':
        '5GU0EFZYZisTSN4anDdjzHcTgkU0V7p3XuU61q0VZySV7yc0N9k1dKAb3UlsMZHk',
      Authorization: token,
    },
  }).then((response) => response.json())
}
