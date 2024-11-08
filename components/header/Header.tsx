import { useAppSelector } from '../../app/hooks'

import { selectBestLapTime, selectBestLapRacerName, selectBestLapKartNumber, selectRaceName } from '../../features/positions/positionsSlice'
import { selectTime } from '../../features/time/timeSlice'

import DataItem from '../dataItem/DataItem'

import { formatMs, formatMsToMins } from '../../utilities/utilities'

import { PositionsListType, PositionType } from '../../types/types'
import { headerCopy, racesListCopy } from '../../data/copy'
import style from './Header.module.css'

interface HeaderProps {
  myTeamName?: string;
  positions?: PositionsListType;
  screen: 'racesList' | 'default';
  children: React.ReactElement;
  hasContent: boolean;
}

const Header = ({ myTeamName, positions, screen, children, hasContent }: HeaderProps) => {
  let preparedTime = '--:--:--'

  const raceName = useAppSelector(selectRaceName)

  const time =  useAppSelector(selectTime)
  const bestRaceLap = useAppSelector(selectBestLapTime)
  const bestRaceLapRacer = useAppSelector(selectBestLapRacerName)
  const bestRaceLapKart = useAppSelector(selectBestLapKartNumber)
  let numberOfSessions: number | undefined = 0
  let minSessionLength: number | undefined = 0

  let headerContent = children

  if (myTeamName !== '') {
    const myTeam = positions?.find((position: PositionType) => position.teamName === myTeamName)
    numberOfSessions = myTeam?.remainingSessionsStats.minNumberOfRemainingSessions
    minSessionLength = myTeam?.remainingSessionsStats.remainingSessionMinDurationMs
  }

  if (hasContent) {
    if (screen === 'default') {
        preparedTime = formatMs(time)
        headerContent = <>
          <div className={style.header__line}>
            <h1 className="ellipsis">{raceName}</h1>
            <div>
              <h2 aria-label={headerCopy.headingAria}>{headerCopy.minSession}.:</h2>
              <DataItem 
                isCaptionHidden={true} 
                captionString={headerCopy.numOfSessions} 
                hasShortCaption={false}
                dataString={numberOfSessions ? numberOfSessions.toString() : '--'}  
              />
              <div className={style.header__devider}>
                <span> / </span>
              </div>
              <DataItem 
                isCaptionHidden={true} 
                captionString={headerCopy.minSessLength}
                hasShortCaption={false}
                dataString={minSessionLength ? formatMsToMins(minSessionLength) : '--'} 
              /> 
              </div>
              <DataItem 
                isCaptionHidden={true} 
                captionString={headerCopy.raceTime}
                hasShortCaption={false}
                dataString={preparedTime} 
              />
              </div>
              <div className={style.header__line}>
                <DataItem 
                  isCaptionHidden={false} 
                  captionString={headerCopy.bestLap}
                  hasShortCaption={false}
                  dataString={bestRaceLap ? bestRaceLap : '--:--'} 
                  textColorClass="color_text_magenta_dark"
                  backgroundColorClass="color_background_yellow_light"
                  />
                <DataItem 
                  isCaptionHidden={false} 
                  captionString={headerCopy.team}
                  hasShortCaption={false}
                  dataString={bestRaceLapRacer} 
                />
                <DataItem 
                  isCaptionHidden={false} 
                  captionString={headerCopy.kart}
                  hasShortCaption={false}
                  dataString={bestRaceLapKart} 
                />
              </div>
            </>
    } else if (screen === 'racesList') {
      headerContent = <h1>{racesListCopy.heading}:</h1>
    }
  }

  return (
    <header className={style.header}>
      {headerContent}
    </header>
  )
}

export default Header