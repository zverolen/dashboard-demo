import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

import { RaceStatsSliceState } from '../../types/types'

const initialState: RaceStatsSliceState =  {
  fullRaceStats: [],
  carsOnPit: []
}

export const raceStatsSlice = createSlice({
  name: 'raceStats',
  initialState: initialState,
  reducers: {
    setRaceStats: (state, action) => {
      state.fullRaceStats = action.payload
    },
    setCarsOnPit: (state, action) =>{
      state.carsOnPit = action.payload
    }
  }
})

export const { setRaceStats, setCarsOnPit } = raceStatsSlice.actions

export const selectRaceStats = (state: RootState) => state.raceStats.fullRaceStats
export const selectCarsOnPit = (state: RootState) => state.raceStats.carsOnPit

export default raceStatsSlice.reducer