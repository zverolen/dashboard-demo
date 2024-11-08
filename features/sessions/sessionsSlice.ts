import { createSlice } from '@reduxjs/toolkit'

import { SessionsSliceState } from '../../types/types'

const initialState: SessionsSliceState = {
  sessions: []
}

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: initialState,
  reducers: {
    setSessions: (state, action) => {
      // If shouldTimeUpdate is false and less than 30 seconds have passed
      // the old session time is preserved 
      // otherwise, the time is synced with the time received from server
      if (action.payload.shouldTimeUpdate) {
        state.sessions = action.payload.sessions
        console.log('Session time sync')
      } else {
        state.sessions = state.sessions.map((session, index) => {
          return {
            ...action.payload.sessions[index],
            elapsedTimeMs: session.elapsedTimeMs
          }
        })
      }     
    },
    countSessionSeconds: (state) => {
      // state.sessions.forEach(session => session.elapsedTimeMs += 1000)
      state.sessions[0].elapsedTimeMs += 1000
    }
  }
})

export const { setSessions, countSessionSeconds } = sessionsSlice.actions

export default sessionsSlice.reducer