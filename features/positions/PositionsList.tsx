import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { countSessionSeconds, selectMyTeamName } from './positionsSlice'
import { selectMaxSessionDuration } from '../raceProfile/raceProfileSlice'

import Header from '../../components/header/Header'
import PositionsListItem from '../../components/positionsListItem/PositionsListItem'

import { connection } from '../../utilities/signalr'
import { formatMinsToMs, determineTempDeficitColor } from '../../utilities/utilities'

import { headerCopy } from '../../data/copy'
import { PositionsListType } from '../../types/types'
import style from './PositionsList.module.css'

const PositionsList = () => {
  const { raceId } = useParams()
  const [ connectionState, setConnectionState ] = useState<string>('')
  const dispatch = useAppDispatch()
  const maxSessionDuration = useAppSelector(selectMaxSessionDuration)
  
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
      connection.send('WatchRace', raceId)
      connection.send('GetCarStats')
    }
  }, [raceId, connectionState])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(countSessionSeconds())
    }, 1000)
    return () => clearInterval(interval)
  }, [dispatch])
  
  const fullRace = useAppSelector(state => state.positions.fullRace)
  const myTeamName = useAppSelector(selectMyTeamName)
  let positions: PositionsListType = []
  let teamToHighlight: string

  if (fullRace !== null) {
    positions = fullRace.positions
    teamToHighlight = fullRace.racerNumberToHighlight
  }
  
  return (
    <>
      <Header screen="default" hasContent={fullRace !== null} myTeamName={myTeamName} positions={positions}>
        <>
          <h1>{headerCopy.noDataHeading}</h1>
          <Link className="link_goBack" to={`/`}>{headerCopy.goBack}</Link>
        </>
      </Header>
      <main className={style.positionsList}>
        {positions.map((position) => {
          const isHighlighted = position.teamNumber === teamToHighlight
          const isMyTeam = position.teamName === myTeamName
          const tempDificitClass = determineTempDeficitColor(position.tempDeficit)
          const timeToSessionEnd = maxSessionDuration - position.session.elapsedTimeMs
          
          let sessionLimitClass: string = ''
          
          if (maxSessionDuration > 0) {
            if (timeToSessionEnd  <= formatMinsToMs(5) && timeToSessionEnd > 0 ) {
              sessionLimitClass = 'fourth'
            } else if (timeToSessionEnd <= 0) {
              sessionLimitClass = 'color_background_red color_text_white'
            }
          }
          
          return <PositionsListItem 
            key={position.teamNumber} 
            data={position}   
            isHighlighted={isHighlighted} 
            hasBestLap={false}
            isMyTeam={isMyTeam}
            tempDificitClass={tempDificitClass}
            sessionLimitClass={sessionLimitClass}
            raceId={raceId ? raceId : ''}
            />
          }  
        )}  
      </main>
    </>
  )
}

export default PositionsList