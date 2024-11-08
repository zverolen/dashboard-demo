import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { TimeSliceState } from '../../types/types'

const initialState: TimeSliceState = {
  time: 0
}

export const timeSlice = createSlice({
  name: 'time',
  initialState: initialState,
  reducers: {
    refreshTime: (state, action) => {
      state.time = action.payload
    },
    countSeconds: (state) => {
      state.time += 1000
    }
  }
})

export const { refreshTime, countSeconds } = timeSlice.actions

export const selectTime = (state: RootState) => state.time.time

export default timeSlice.reducer