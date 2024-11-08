import { configureStore } from '@reduxjs/toolkit'
import { signal } from '../utilities/signalr'

import racesReducer from '../features/races/racesSlice'
import positionsReducer from '../features/positions/positionsSlice'
import sessionsReducer from '../features/sessions/sessionsSlice'
import timeReducer from '../features/time/timeSlice'
import raceProfileReducer from '../features/raceProfile/raceProfileSlice'
import raceStatsReducer from '../features/raceStats/raceStatsSlice'

export const store = configureStore({
  reducer: {
    races: racesReducer,
    positions: positionsReducer,
    sessions: sessionsReducer,
    time: timeReducer,
    raceStats: raceStatsReducer,
    raceProfile: raceProfileReducer
  },
  // @ts-expect-error Done like in documentation, the reason of error is unknown
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signal)
})  

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch