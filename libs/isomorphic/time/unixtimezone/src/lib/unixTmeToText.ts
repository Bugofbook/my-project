import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'

/**
 * unixTime
 */
type unixTime = number
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

export function unixTimeToDateTimeText(unixTime: unixTime, formatText: formatText = 'yyyy-MM-dd HH:mm:ss') {
    try {
        return format(fromUnixTime(unixTime), formatText)
    } catch (error) {
        return ''
    }

}
export function unixTimeToDateText(unixTime: unixTime, formatText: formatText = 'yyyy-MM-dd') {
    try {
        return format(fromUnixTime(unixTime), formatText)
    } catch (error) {
        return ''
    }

}
export function unixTimeToTimeText(unixTime: unixTime, formatText: formatText = 'HH:mm:ss') {
    try {
        return format(fromUnixTime(unixTime), formatText)
    } catch (error) {
        return ''
    }

}