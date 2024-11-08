import { HubConnectionBuilder, HttpTransportType, withCallbacks, signalMiddleware } from 'redux-signalr'

import { Dispatch } from '../app/hooks'
import { RootState } from '../app/store'

import { setRaces } from '../features/races/racesSlice'
import { setPositions } from '../features/positions/positionsSlice'
import { setSessions } from '../features/sessions/sessionsSlice'
import { refreshTime } from '../features/time/timeSlice'

import { RacesListType, SessionsListType, FullRaceType, RaceProfileSliceState, FullRaceStatsType } from '../types/types'
import { setRaceProfile } from '../features/raceProfile/raceProfileSlice'
import { setRaceStats } from '../features/raceStats/raceStatsSlice'
//https://api.eqlty.io/RacesHub

export const connection = new HubConnectionBuilder()
//Changed
  .withUrl('https://dev.api.io', {
    transport: HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .build()

  // Timer that makes sure that the time is not updated more than once per second
  // (the counter in the Redux state gets a refresh from the received data
  // to keep local counter in sync with the actual race)
  let shouldRaceTimeRefresh = true
  // let shouldSessionTimeRefresh = true
  setInterval(() => {
    shouldRaceTimeRefresh = true
    // shouldSessionTimeRefresh = true
  }, 30000)

  const callbacks = withCallbacks<Dispatch, RootState>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .add('ReceiveRaceUpdate', (data: FullRaceType) => (dispatch, _getState, _invoke) => {
      // console.log(data)
      dispatch(setPositions({shouldTimeUpdate: shouldRaceTimeRefresh, fullRace: data}))
      // if (shouldRaceTimeRefresh){
      //   dispatch(setPositions({shouldTimeUpdate: true, fullRace: data}))
      // } else {
      //   dispatch(setPositions({shouldTimeUpdate: false, fullRace: data}))
      // }
      
      // Provides new starting point for the counter in the state
      if (shouldRaceTimeRefresh) {
        dispatch(refreshTime(data.elapsedTimeMs))
        shouldRaceTimeRefresh = false
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .add('ReceiveRaces', (data: RacesListType) => (dispatch, _getState, _invoke) => {
      dispatch(setRaces(data))
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .add('ReceiveRaceProfile', (data: RaceProfileSliceState) => (dispatch, _getState, _invoke) => {
      dispatch(setRaceProfile(data))
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .add('ReceiveCarStats', (_raceId: string, data: FullRaceStatsType) => (dispatch, _getState, _invoke) => {
      dispatch(setRaceStats(data))
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .add('ReceiveSessions', (_raceId: string, _team: string, data: SessionsListType) => (dispatch, _getState, _invoke) => {
      
      // if (shouldSessionTimeRefresh) {
        dispatch(setSessions({shouldTimeUpdate: true, sessions: data}))
      //   shouldSessionTimeRefresh = false
      // } else {
      //   dispatch(setSessions({shouldTimeUpdate: false, sessions: data}))
      // }
       
    })

  export const signal = signalMiddleware({
    callbacks,
    connection,
    shouldConnectionStartImmediately: false
  })