import { useState } from 'react'

import { useAppDispatch } from '../../app/hooks'

import { setCurrentTeam } from '../../features/positions/positionsSlice'

import PositionsDataCell from '../positionsDataCell/PositionsDataCell'
import PositionsButtonCell from '../positionsButtonCell/PositionsButtonCell'
import PositionsListItemAdditional from '../positionsListItemAdditional/positionsListItemAdditional'
import Collapsible from '../collapsible/Collapsible'
import ButtonOpen from '../buttonOpen/ButtonOpen'
import ButtonLink from '../buttonLink/ButtonLink'

import { formatMs } from '../../utilities/utilities'

import { PositionType } from '../../types/types'
import { teamData } from '../../data/teams'
import { controlsCopy, teamCopy } from '../../data/copy'
import style from './PositionsListItem.module.css'
import { Link } from 'react-router-dom'

interface PostionsListItemProps {
  data: PositionType;
  isHighlighted: boolean;
  hasBestLap?: boolean;
  isMyTeam: boolean;
  tempDificitClass: string;
  sessionLimitClass: string;
  raceId: string;
}

const PositionsListItem = ({ data, isHighlighted, isMyTeam, tempDificitClass, sessionLimitClass, raceId }: PostionsListItemProps) => {
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const preparedSessionTime = formatMs(data.session.elapsedTimeMs)
  const collapsibleButtonText = isExpanded ? controlsCopy.detailsButtonExpanded : controlsCopy.detailsButtonCollapsed
  const highlightedClass = isHighlighted ? 'highlighted' : ''
  
  let lastLapTimeColorClass: string = ''

  const overlayLink = <Link 
    to={`/${raceId}/${data.teamNumber}/sessions`} 
    className={style.overlayLink}
    onClick={setTeam}
    aria-label={`Open sessions for ${data.teamName}`}
  >
  </Link>
  
  if (data.lapTimeRank === 1) {
    lastLapTimeColorClass = 'first'
  } else if (data.lapTimeRank === 2) {
    lastLapTimeColorClass = 'second'
  } else if (data.lapTimeRank === 3) {
    lastLapTimeColorClass = 'third'
  }

  function handleExpand() {
    setIsExpanded(!isExpanded)
  }

  function setTeam() {
    dispatch(setCurrentTeam(data.teamNumber))
  }

  return (
    <div key={data.teamNumber} className={`${style.positionContainer} ${highlightedClass} ${isMyTeam ? 'myTeam' : ''}`}>
      
      {overlayLink}
      
      <table role="table">
        <caption className="visually-hidden">{`${data.teamName} ${data.session.number}`}</caption>
        <tbody role="rowgroup" className={style.position}>
          <PositionsDataCell rowName={teamCopy.position} rowData={data.pos} />
          <PositionsDataCell rowName={teamCopy.teamNumber} rowData={data.teamNumber} modifier="color_team"/>
          <PositionsDataCell 
            rowName={teamCopy.teamName} 
            rowData={data.teamName} 
            hasEllipsis={true}
          />
         
          <PositionsDataCell rowName={teamCopy.lapsTotal} rowData={data.laps} />
          <PositionsDataCell 
            rowName={teamCopy.timeLapLast} 
            rowData={data.lastLap} 
            textColorClass={lastLapTimeColorClass} 
          />
          <PositionsDataCell rowName={teamCopy.interval} rowData={data.gapToAhead} />
          <PositionsDataCell 
            rowName={teamCopy.intervalDynamics} 
            rowData={`+${data.tempDeficit.toFixed(1)}`} 
            textColorClass={tempDificitClass} 
          />
          <PositionsDataCell rowName={teamCopy.sessionNumber} rowData={data.session.number} modifier="color_text_secondary" />
          <PositionsDataCell 
            rowName={teamCopy.kartNumber} 
            rowData={data.carNumber ? data.carNumber : ''} 
            modifier="color_kart" 
          />
          <PositionsDataCell 
            rowName={teamCopy.pilotName} 
            rowData={data.driverName ? data.driverName : ''} 
            hasEllipsis={true} 
            modifier="color_text_secondary" 
          />
          <PositionsDataCell rowName={teamCopy.lapsSession} rowData={data.session.laps} modifier="color_text_secondary" />
          <PositionsDataCell rowName={teamCopy.timeSessionTotal} rowData={preparedSessionTime} modifier={sessionLimitClass} />
          <PositionsDataCell rowName={teamCopy.timeSessionAverage} rowData={data.session.averageLap} modifier="color_text_secondary" />
          <PositionsButtonCell>
            <ButtonOpen onClick={setTeam} path={`/${raceId}/${data.teamNumber}/sessions`} buttonName={controlsCopy.buttonOpenSessions} />
          </PositionsButtonCell>
          <PositionsButtonCell>
            <ButtonLink buttonText={collapsibleButtonText} onClick={handleExpand} />
          </PositionsButtonCell>
        </tbody>
      </table>
      <Collapsible isExpanded={isExpanded}>
        <PositionsListItemAdditional 
          sessionBest={data.session.bestLap}
          raceBest={teamData.timeRaceBest.toString()}
          incidents={teamData.incidents}
          finishedPilots={teamData.finishedPilots}
          onClick={handleExpand}
          />
      </Collapsible>
    </div>
  )
}

export default PositionsListItem