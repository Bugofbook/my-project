import parse from 'date-fns/parse'
import getUnixTime from 'date-fns/getUnixTime'

export function DateTimeTextToUnixTime(text: string, format = 'yyyy-MM-dd HH:mm:ss') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(date)
    } catch (error) {
        console.error(error)
        throw error
    }
}
export function DateTextToUnixTime(text: string, format = 'yyyy-MM-dd') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(date)
    } catch (error) {
        console.error(error)
        throw error
    }
}
export function TimeTextToUnixTime(text: string, format = 'HH:mm:ss') {
    try {
        const date = parse(text, format, new Date())
        return getUnixTime(date)
    } catch (error) {
        console.error(error)
        throw error
    }
}