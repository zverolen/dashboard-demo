import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { countSessionSeconds } from './sessionsSlice'
import { countSessionSeconds as countSessionSecondsInPositions } from '../positions/positionsSlice'

import SessionsListHeader from '../../components/sessionsListHeader/SessionsListHeader'
import SessionsListItem from '../../components/sessionsListItem/SessionsListItem'

import { connection } from '../../utilities/signalr'

import { SessionType, PositionType, OutletContextType } from '../../types/types'
import style from './SessionsList.module.css'

const SessionsList = ()=> {

  const dispatch = useAppDispatch()

  const { positions, raceId, teamNumber } = useOutletContext<OutletContextType>()
  const currentTeam = positions?.find((position: PositionType) => position.teamNumber === teamNumber)
  const sessions = useAppSelector(state => state.sessions.sessions)

  const [ connectionState, setConnectionState ] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
        if (connectionState !== 'Connected') {
          setConnectionState(connection.state)
        }
    }, 300)
    return () => clearInterval(interval)
  }, [connectionState])

  useEffect(() => {
    if (connectionState === 'Connected') {
      connection.send('', raceId, teamNumber)
    }
  }, [raceId, teamNumber, connectionState])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(countSessionSeconds())
    }, 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(countSessionSecondsInPositions())
    }, 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className={style.sessionsList}>
      
      <main className={style.sessionsList__content}>
        <div className={style.sessionsList__sessionsContainer}>
          <SessionsListHeader 
            goBackPath={`/${raceId}`}
            teamNumber={teamNumber} 
            teamName={currentTeam ? currentTeam.teamName : '...'} 
            position={currentTeam ? currentTeam.pos.toString() : '-'}
            carNumber={currentTeam ? currentTeam.carNumber : '-'}
            pilot={currentTeam?.driverName}
            loaded={sessions.length !== 0}
            />
          <ul>
              {sessions.map((session: SessionType, index) => {
                return  <SessionsListItem 
                  key={session.number}
                  data={session}
                  isCurrentSession={index === 0}
                  raceId={raceId}
                  teamNumber={teamNumber}
                />
                } 
              )}
            </ul>
        </div>   
      </main>
    </div>
  )
}

export default SessionsList