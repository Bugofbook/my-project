import { zonedTimeToUtc } from 'date-fns-tz'
import parse from 'date-fns/parse'
import getUnixTime from 'date-fns/getUnixTime'
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
export function DateTimeZoneTextToUnixTime(text: string, timezoneText: timezoneText, format:formatText = 'yyyy-MM-dd HH:mm:ss') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(zonedTimeToUtc(date, timezoneText))
    } catch (error) {
        console.error(error)
        throw error
    }
}
export function DateZoneTextToUnixTime(text: string, timezoneText: timezoneText, format:formatText = 'yyyy-MM-dd') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(zonedTimeToUtc(date, timezoneText))
    } catch (error) {
        console.error(error)
        throw error
    }
}
export function TimeZoneTextToUnixTime(text: string, timezoneText: timezoneText, format:formatText = 'HH:mm:ss') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(zonedTimeToUtc(date, timezoneText))
    } catch (error) {
        console.error(error)
        throw error
    }
}