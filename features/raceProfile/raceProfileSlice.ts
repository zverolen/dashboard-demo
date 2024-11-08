import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

import { formatMinsToMs } from '../../utilities/utilities'

import { RaceProfileSliceState } from '../../types/types'

const hardcodedValues = {
  MinPitTimeMs: 120000,
  MinLapTimeMs: 39000,
  RaceTimeLimitType: 0,
  MaxRaceLaps: 20,
  MaxSessionDurationMs: formatMinsToMs(30),
  MinNumberOfSessions: 10,
  MaxRaceTimeMs: formatMinsToMs(240)
}

const initialState: RaceProfileSliceState =  {
  id: '',
  name: '',
  raceTimeLimitType: hardcodedValues.RaceTimeLimitType,
  maxRaceLaps: hardcodedValues.MaxRaceLaps,
  maxRaceTimeMs: hardcodedValues.MaxRaceTimeMs,
  minPitTimeMs: hardcodedValues.MinPitTimeMs,
  minLapTimeMs: hardcodedValues.MinLapTimeMs,
  maxSessionDurationMs: hardcodedValues.MaxSessionDurationMs,
  minNumberOfSessions: hardcodedValues.MinNumberOfSessions
}

export const raceProfileSlice = createSlice({
  name: 'raceProfile',
  initialState: initialState,
  reducers: {
    setRaceProfile: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.raceTimeLimitType = action.payload.raceTimeLimitType
      state.maxRaceLaps = action.payload.maxRaceLaps
      state.maxRaceTimeMs = action.payload.maxRaceTimeMs
      state.minPitTimeMs = action.payload.minPitTimeMs
      state.minLapTimeMs = action.payload.minLapTimeMs
      state.maxSessionDurationMs = action.payload.maxSessionDurationMs
      state.minNumberOfSessions = action.payload.minNumberOfSessions
    }
  }
})

export const { setRaceProfile } = raceProfileSlice.actions

export const selectMaxSessionDuration = (state: RootState) => state.raceProfile.maxSessionDurationMs

export default raceProfileSlice.reducer