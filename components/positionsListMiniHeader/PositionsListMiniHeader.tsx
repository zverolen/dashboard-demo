import { useAppSelector } from '../../app/hooks'

import { selectBestLapTime } from '../../features/positions/positionsSlice'
import { selectTime } from '../../features/time/timeSlice'

import DataItem from '../dataItem/DataItem'

import { formatMs, formatMsToMins } from '../../utilities/utilities'

import { PositionType } from '../../types/types'
import { headerCopy } from '../../data/copy'
import style from './PositionsListMiniHeader.module.css'

interface PositionsListMiniHeaderProps {
  raceName: string | undefined;
  myTeam: PositionType | undefined;
}

const PositionsListMiniHeader = ({ raceName, myTeam }: PositionsListMiniHeaderProps) => {
  const time = useAppSelector(selectTime)
  const preparedTime = formatMs(time)
  const bestRaceLap = useAppSelector(selectBestLapTime)
  let numberOfSessions: number | undefined = 0
  let minSessionLength: number | undefined = 0

  if (myTeam) {
    numberOfSessions = myTeam?.remainingSessionsStats.minNumberOfRemainingSessions
    minSessionLength = myTeam?.remainingSessionsStats.remainingSessionMinDurationMs
  }

  return (
    <header className={style.positionsListMiniHeader}>
      <h1 className="ellipsis">{raceName}</h1>
      <div className={style.positionsListMiniHeader_raceDetails}>
        <h2 aria-label={headerCopy.headingAria}>{headerCopy.minSession}.:</h2>
        <dl>
          <div className={style.minSession}>
            <DataItem 
              isCaptionHidden={true} 
              captionString={headerCopy.numOfSessions} 
              dataString={numberOfSessions ? numberOfSessions.toString() : '--'}  
              hasShortCaption={false}
            />
            <div className={style.header__devider} aria-hidden="true">
                  <span> / </span>
            </div>
            <DataItem 
              isCaptionHidden={true} 
              captionString={headerCopy.minSessLength} 
              dataString={minSessionLength ? formatMsToMins(minSessionLength) : '--'}
              hasShortCaption={false}
            />
          </div>
          <DataItem 
            isCaptionHidden={true} 
            captionString={headerCopy.raceTime} 
            dataString={preparedTime} 
            isSeparateLine={true}
            hasShortCaption={false}
          />
          <DataItem 
            isCaptionHidden={false} 
            captionString={headerCopy.bestLap}
            dataString={bestRaceLap ? bestRaceLap : '--:--'}
            textColorClass="color_text_magenta_dark"
            backgroundColorClass="color_background_yellow_light"
            isSeparateLine={true}
            hasShortCaption={false}
            />
        </dl>
      </div>
    </header>
  )
}

export default PositionsListMiniHeader