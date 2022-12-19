import { utcToZonedTime, format as TzFormat  } from "date-fns-tz";
import fromUnixTime from 'date-fns/fromUnixTime'

/**
 * unixTime
 */
type unixTime = number
/**
 * 指定時區的文字
 */
type timezoneText = string
/**
 * 格式化的文字
 */
type formatText = string

/**
 * 顯示非本地時區的目期時間文字，可能不能在RN上使用
 * @param {number}  unixTime unixTime
 * @param {string} timezoneText 目標時區文字
 * @param {string=} formatText 格式化的文字
 * @returns 
 */
export function unixTimeToDateTimeZoneText(unixTime: unixTime, timezoneText: timezoneText, formatText: formatText = 'yyyy-MM-dd HH:mm:ss') {
    try {
        const zoneDate = utcToZonedTime(fromUnixTime(unixTime), timezoneText)
        return TzFormat(zoneDate, formatText, { timeZone: timezoneText })
    } catch (error) {
        return ''
    }
}

/**
 * 顯示非本地時區的日期文字，可能不能在RN上使用
 * @param {number}  unixTime unixTime
 * @param {string} timezoneText 目標時區文字
 * @param {string=} formatText 格式化的文字
 * @returns 
 */
export function unixTimeToDateZoneText(unixTime: unixTime, timezoneText: timezoneText, formatText: formatText = 'yyyy-MM-dd') {
    try {
        const zoneDate = utcToZonedTime(fromUnixTime(unixTime), timezoneText)
        return TzFormat(zoneDate, formatText, { timeZone: timezoneText })
    } catch (error) {
        return ''
    }
}

/**
 * 顯示非本地時區的時間文字，可能不能在RN上使用
 * @param {number}  unixTime unixTime
 * @param {string} timezoneText 目標時區文字
 * @param {string=} formatText 格式化的文字
 * @returns 
 */
export function unixTimeToTimeZoneText(unixTime: unixTime, timezoneText: timezoneText, formatText: formatText = 'HH:mm:ss') {
    try {
        const zoneDate = utcToZonedTime(fromUnixTime(unixTime), timezoneText)
        return TzFormat(zoneDate, formatText, { timeZone: timezoneText })
    } catch (error) {
        return ''
    }
}
