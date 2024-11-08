import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { SignalAction, SignalDispatch, AnyAction } from 'redux-signalr'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type Action<ReturnValue = void> = SignalAction<
  ReturnValue,
  RootState,
  AnyAction
>

export type Dispatch<Action extends AnyAction = AnyAction> = SignalDispatch<
  RootState,
  Action
>