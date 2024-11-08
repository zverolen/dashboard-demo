import { RacesListType } from '../types/types'

export function formatMs(ms: number) {
  //Get hours from milliseconds
  const hours = ms / (1000*60*60)
  const absoluteHours = Math.floor(hours)
  const h = absoluteHours 

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60
  const absoluteMinutes = Math.floor(minutes)
  const m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60
  const absoluteSeconds = Math.floor(seconds)
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

  return absoluteHours === 0 ? m + ':' + s : h + ':' + m + ':' + s
}

export function formatMsToSec(ms: number) {
  return (ms / 1000.0).toFixed(3)
}

export function formatMinsToMs(min: number) {
  const msInMin = 60000
  return min * msInMin
}

//5759999999665039

export function formatMsToMins(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(2).padStart(5, '0')
  return `${minutes}.${seconds.slice(-2)}`
}

export function isToday(dateString: string) {
  const givenDate = new Date(dateString);
  const today = new Date();
  
  return givenDate.toDateString() === today.toDateString();
}

export function sortRaces(races: RacesListType) {
  return [...races].sort((a, b) => Number(new Date(b.start)) - Number(new Date(a.start)));
}

export function determineTempDeficitColor(value: number) {
  if (value >= 0.0 && value <= 0.1) {
    return 'first'
  } else if (value > 0.1 && value <= 0.2) {
    return 'second'
  } else if (value > 0.2 && value <= 0.4) {
    return 'third'
  } else if (value > 0.4 && value <= 0.7) {
    return 'fourth'
  } else {
    return 'fifth'
  }
}