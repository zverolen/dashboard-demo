import { useAppSelector } from '../../app/hooks'

import { selectRaceName } from '../../features/positions/positionsSlice'

import PositionsListMiniHeader from '../positionsListMiniHeader/PositionsListMiniHeader'
import PositionsListItemMini from '../positionsListItemMini/PositionsListItemMini'

import { PositionsListType, PositionType } from '../../types/types'
import style from './PositionsListMini.module.css'

interface PositionsListMiniProps {
  positions: PositionsListType | undefined;
  myTeamName: string;
}

const PositionsListMini = ({ positions, myTeamName }: PositionsListMiniProps) => {
  const currentRace = useAppSelector(selectRaceName)
  const myTeam = myTeamName ? positions?.find((position: PositionType) => position.teamName === myTeamName) : undefined

  let content = <></>

  if (positions !== undefined) {
    content = <>
      <PositionsListMiniHeader raceName={currentRace} myTeam={myTeam} />
      <ul>
        {positions?.map((position: PositionType) => {
          const isMyTeam = position.teamName === myTeamName
          
          return <PositionsListItemMini 
                  key={position.pos}
                  position={position.pos}
                  session={position.session.number}
                  team={position.teamName}
                  teamNumber={position.teamNumber}
                  lastLapTime={position.lastLap}
                  sessionTimeCounter={position.session.elapsedTimeMs}
                  hasBestLap={false}
                  isMyTeam={isMyTeam}
                />
        } 
        )}
      </ul>
    </>
  }

  return (
    <div className={style.positionsListMini}>
      {content}
    </div>
  )
}

export default PositionsListMini