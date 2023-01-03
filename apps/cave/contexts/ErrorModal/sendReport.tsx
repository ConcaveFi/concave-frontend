import { ReportBody } from 'pages/api/report'

const endpoint = '/api/report'

export const sendReport = async (body: ReportBody) => {
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((r) => r.json())
}
