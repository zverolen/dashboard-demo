import { createSlice } from '@reduxjs/toolkit'

import { RacesSliceState } from '../../types/types'

const initialState: RacesSliceState = {
  races: [],
  raceDetails: null
}

export const racesSlice = createSlice({
  name: 'races',
  initialState: initialState,
  reducers: {
    setRaces: (state, action) => {
      state.races = action.payload
    },
    setRaceDetails: (state, action) => {
      state.raceDetails = action.payload
    }
  }
})

export const { setRaces, setRaceDetails } = racesSlice.actions

export default racesSlice.reducer