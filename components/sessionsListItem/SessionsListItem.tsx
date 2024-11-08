import { useEffect, useState } from 'react'

import DataItem from '../dataItem/DataItem'
import Collapsible from '../collapsible/Collapsible'
import Lap from '../lap/Lap'
import ButtonOpen from '../buttonOpen/ButtonOpen'
import ButtonLink from '../buttonLink/ButtonLink'

import { formatMs } from '../../utilities/utilities'

import { LapType, SessionType } from '../../types/types'
import { controlsCopy, teamCopy } from '../../data/copy'
import style from './SessionsListItem.module.css'

interface SessionsListItemProps {
  data: SessionType;
  isCurrentSession: boolean;
  raceId: string;
  teamNumber: string;
}

const SessionsListItem = ({ 
  data,
  isCurrentSession,
  raceId,
  teamNumber,
}: SessionsListItemProps) => {
  const [ isExpanded, setIsExpanded ] = useState<boolean>(isCurrentSession)

  useEffect(() =>{
   setIsExpanded(isCurrentSession) 
  }, [isCurrentSession])

  const elapsedTime = formatMs(data.elapsedTimeMs)

  function handleExpand() {
    setIsExpanded(!isExpanded)
  }

  return (
    <li key={data.number} className={style.sessionItem}>
      <dl>
        <div className={style.sesstionItem__lineOne}>
        <DataItem 
          isCaptionHidden={false} 
          captionString={teamCopy.sessionNumber}
          captionStringShort={teamCopy.sessionNumberShort}
          hasShortCaption={true}
          dataString={data.number.toString()}
          isForSessionNumber={true}
        />

        <DataItem 
          isCaptionHidden={false} 
          captionString={teamCopy.lapsSession}
          captionStringShort="l"
          hasShortCaption={true}
          dataString={data.lapCount.toString()}
          isForSessionNumber={true}
        />

        <DataItem 
          isCaptionHidden={true} 
          captionString={teamCopy.pilotName}
          hasShortCaption={false}
          dataString={data.driverName}
        />

        {data.carNumber && <DataItem 
                            isCaptionHidden={true} 
                            captionString={teamCopy.kartNumber}
                            hasShortCaption={false}
                            dataString={data.carNumber}
                          />
        }

        <DataItem 
          isCaptionHidden={true} 
          captionString={teamCopy.timeSessionTotal}
          hasShortCaption={false}
          dataString={elapsedTime}
        />
        </div>

        <div className={style.sesstionItem__lineTwo}>
          <DataItem 
            isCaptionHidden={false} 
            captionString={teamCopy.timeSessionBest}
            captionStringShort="Best:"
            hasShortCaption={true}
            dataString={data.bestLap}
          />

          <DataItem 
            isCaptionHidden={false} 
            captionString={teamCopy.timeSessionAverage}
            captionStringShort="Avg:"
            hasShortCaption={true}
            dataString={data.averageLapMs.toString()}
          />
        </div>
      </dl>
      
      <ButtonOpen path={`/${raceId}/${teamNumber}/sessions/${data.number}/editsession`} buttonName={controlsCopy.buttonEditSession} />
      <ButtonLink 
        onClick={handleExpand} 
        buttonText={isExpanded ? controlsCopy.sessionLapsExpandedShort : controlsCopy.sessionLapsCollapsed} 
        ariaExpanded={isExpanded} 
      />  
      <Collapsible isExpanded={isExpanded}>
          <>
            <ul role="list">
              {data.laps.map((lap: LapType) => <Lap 
                key={lap.number}
                number={lap.number}
                time={lap.time}
                teamPosition="00"
                raceElapsedTimeMs={lap.raceElapsedTimeMs}
                quality={lap.quality}
                isBestInSession={lap.isBestInSession}
                hasPit={lap.lapEvent === 1}
                lapEvent={lap.lapEvent}
                id={lap.id}
                sessionNumber={data.number}
                />)}
            </ul>
            <button 
              className={`${style.sessionsListItem__button_last} button`} 
              type="button" 
              onClick={handleExpand} 
              aria-expanded={isExpanded}
            >
              {controlsCopy.sessionLapsExpandedLong}
            </button>
          </>
      </Collapsible>
      
    </li>
  )
}

export default SessionsListItem