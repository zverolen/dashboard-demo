import { createSlice } from '@reduxjs/toolkit'

import type { PositionType, PositionsSliceState } from '../../types/types'
import { RootState } from '../../app/store'

const initialState: PositionsSliceState = {
  fullRace: null,
  currentTeam: '',
  currentLap: '',
  time: 0,
  myTeamName: ''
}

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: initialState,
  reducers: {
    setPositions: (state, action) => {
      // If shouldTimeUpdate is false and less than 30 seconds have passed
      // the old session time is preserved 
      // otherwise, the time is synced with the time received from server
      if (action.payload.shouldTimeUpdate) {
        state.fullRace = action.payload.fullRace
        console.log('Position session time sync')
      } else {
        state.fullRace = {
          ...action.payload.fullRace,
          positions: action.payload.fullRace.positions.map((position: PositionType, index: number) => {
            const newElapsedTimeMs = state.fullRace?.positions[index].session.number == position.session.number ?
              state.fullRace?.positions[index].session.elapsedTimeMs :
              position.session.elapsedTimeMs;

            return {
              ...position,
              session: {
                ...position.session,
                elapsedTimeMs: newElapsedTimeMs
              }
            }
          })
        }
      }  
    },
    countSessionSeconds: (state) => {
      state.fullRace?.positions.forEach(position => position.session.elapsedTimeMs += 1000)
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload
    },
    setCurrentLap: (state, action) => {
      state.currentLap = action.payload
    },
    setMyTeamName: (state, action) => {
      state.myTeamName = action.payload
    }
  },
})

export const { 
  setPositions,
  countSessionSeconds,
  setCurrentTeam, 
  setCurrentLap,
  setMyTeamName
} = positionsSlice.actions

export const selectPositions = (state: RootState) => state.positions.fullRace?.positions
export const selectBestLapTeam = (state: RootState) => state.positions.fullRace?.bestLap.racerNumber
export const selectBestLapTime = (state: RootState) => state.positions.fullRace?.bestLap.time
export const selectBestLapRacerName = (state: RootState) => state.positions.fullRace?.bestLap.racerName
export const selectBestLapKartNumber = (state: RootState) => state.positions.fullRace?.bestLap.carNumber
export const selectMyTeamName = (state: RootState) => state.positions.myTeamName

export const selectRaceName = (state: RootState) => state.positions.fullRace?.raceName


export default positionsSlice.reducer