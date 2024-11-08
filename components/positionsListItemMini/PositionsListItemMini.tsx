import DataItem from '../dataItem/DataItem'

import { formatMs } from '../../utilities/utilities'

import { teamCopy, positionMiniCopy } from '../../data/copy'
import style from './positionsListItemMini.module.css'
import { Link, useParams } from 'react-router-dom'

interface PositionsListItemMiniProps {
  position: number;
  session: number;
  team: string;
  teamNumber: string;
  lastLapTime: string;
  sessionTimeCounter: number;
  hasBestLap: boolean;
  isMyTeam: boolean;
}

const PositionsListItemMini = ({ 
  position, 
  session, 
  team, 
  teamNumber,
  lastLapTime, 
  sessionTimeCounter,
  hasBestLap,
  isMyTeam
}: PositionsListItemMiniProps) => {
  const { raceId } = useParams()

  const overlayLink = <Link 
    to={`/${raceId}/${teamNumber}/sessions`} 
    aria-label={`Open sessions for ${team}`}
    className={style.overlayLink}
  >
  </Link>

  return (
    <div className={`${style.positionsListItemMini} ${isMyTeam ? 'myTeam' : ''}`}>
      {overlayLink}
      <dl>
        <DataItem 
          isCaptionHidden={true} 
          captionString={teamCopy.position}
          hasShortCaption={false}
          dataString={position.toString()} 
        />
        <DataItem 
          isCaptionHidden={true} 
          captionString={teamCopy.teamNumber}
          hasShortCaption={false}
          dataString={team} 
          hasEllipsis={true}
        />
        <DataItem 
          isCaptionHidden={false} 
          captionString={teamCopy.sessionNumber}
          captionStringShort={teamCopy.sessionNumberShort}
          hasShortCaption={true}
          dataString={session.toString()}
          isForSessionNumber={true}
        />
        <DataItem 
          isCaptionHidden={true} 
          captionString={teamCopy.timeLapLast}
          hasShortCaption={false}
          dataString={lastLapTime}
          textColorClass={hasBestLap ? 'color_text_magenta_light' : undefined}
        />
        <DataItem 
          isCaptionHidden={true} 
          captionString={positionMiniCopy.sessionTime}
          hasShortCaption={false}
          dataString={formatMs(sessionTimeCounter)} 
        />
      </dl>
    </div>
  )
}

export default PositionsListItemMini