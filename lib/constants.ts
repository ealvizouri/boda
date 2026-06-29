import dayjs from './dayjs'
import { capitalize } from './srtings'

export const WED_DATE = dayjs('10-17-2026')
export const FULL_MONTH_CAPITALIZED = capitalize(WED_DATE.format('MMMM'))
export const SHORT_MONTH_CAPITALIZED = capitalize(WED_DATE.format('MMM'))
export const DAY_CAPITILIZED = capitalize(WED_DATE.format('dddd'))
export const WED_DATE_FULL = WED_DATE.format(
  `[${DAY_CAPITILIZED}], DD [de] [${FULL_MONTH_CAPITALIZED}] [de] YYYY`,
)
export const WED_DATE_NORMAL = WED_DATE.format(
  `DD [de] [${FULL_MONTH_CAPITALIZED}] [de] YYYY`,
)
export const WED_DATE_NO_YEAR = WED_DATE.format(
  `DD [de] [${FULL_MONTH_CAPITALIZED}]`,
)
