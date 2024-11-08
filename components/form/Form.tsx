import { Outlet, useOutletContext } from 'react-router-dom'

import SessionsListHeader from '../sessionsListHeader/SessionsListHeader'

import { PositionType, OutletContextType } from '../../types/types'

const Form = () => {
  const { positions, raceId, teamNumber } = useOutletContext<OutletContextType>()

  const currentTeam = positions?.find((position: PositionType) => position.teamNumber === teamNumber)
  
  return (
    <div>
      <SessionsListHeader 
        goBackPath={`/${raceId}/${teamNumber}/sessions`}
        teamNumber={teamNumber} 
        teamName={currentTeam ? currentTeam.teamName : '...'} 
        position={currentTeam ? currentTeam.pos.toString() : '-'}
        carNumber={currentTeam ? currentTeam.carNumber : '-'}
        pilot={currentTeam?.driverName}
        loaded={positions !== undefined}
        />
      <Outlet />
    </div>
  )
}

export default Form