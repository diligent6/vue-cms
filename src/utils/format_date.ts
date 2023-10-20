import dayjs from 'dayjs'
export function formatDate(rawDate: Date, formatString: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(rawDate).format(formatString)
}
