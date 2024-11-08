import { useState, useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import { selectPositions, selectMyTeamName } from '../../features/positions/positionsSlice'

import LayoutTwoPanels from '../layoutTwoPanels/LayoutTwoPanels'
import PositionsListMini from '../positionsListMini/PositionsListMini'

import { connection } from '../../utilities/signalr'

import style from './Sessions.module.css'
import { PositionsListType } from '../../types/types'

const Sessions = () => {
  const { raceId, teamNumber } = useParams()

  const positions: PositionsListType = useAppSelector(selectPositions)!
  const myTeamName = useAppSelector(selectMyTeamName)

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
      connection.send('WatchRace', raceId)
    }
  }, [raceId, connectionState])

  return (
    <main>
      <LayoutTwoPanels>
        <>
         <PositionsListMini positions={positions} myTeamName={myTeamName} />
         <div className={style.panelRight}>
          <Outlet context={{ positions, raceId, teamNumber }}/>
         </div>
        </>
      </LayoutTwoPanels>
    </main>
  )
}

export default Sessions