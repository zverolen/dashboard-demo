import { Link } from 'react-router-dom'

import DataItem from '../dataItem/DataItem'
import ButtonClose from '../buttonClose/ButtonClose'

import { teamCopy, sessionsListHeaderCopy } from '../../data/copy'
import style from './SessionsListHeader.module.css'

interface SessionsListHeaderProps {
  goBackPath: string;
  teamNumber: string | undefined;
  teamName: string | undefined;
  position: string | undefined;
  carNumber: string;
  pilot?: string;
  loaded: boolean;
}

const SessionsListHeader = ({ 
  goBackPath,
  teamNumber, 
  teamName, 
  position, 
  carNumber,
  pilot,
  loaded
}: SessionsListHeaderProps) => {

  let content = 
    <div>
      <h1>{sessionsListHeaderCopy.noDataHeading}</h1>
      <Link className="link_goBack" to={`/`}>{sessionsListHeaderCopy.goBack}</Link>
    </div>

  if (loaded) {
    content = 
      <>
        <div>
          <div className={style.sessionsList__headerLineOne}>
            <h2>
              <span className="visually-hidden">{teamCopy.teamNumber}</span>
              <span>{teamNumber}</span>
              <span className="ellipsis">{teamName}</span>
            </h2>
            
          </div>
          <div className={style.sessionsList__headerLineTwo}>
            <dl>
              <DataItem 
                isCaptionHidden={false} 
                dataString={position} 
                captionString={teamCopy.position}
                captionStringShort={teamCopy.positionShort}
                hasShortCaption={true}
              />
              {carNumber && <DataItem 
                              isCaptionHidden={false} 
                              dataString={carNumber} 
                              captionString={teamCopy.kartNumber}
                              hasShortCaption={false}
                              textColorClass="color_kart"
                            />
              }
              {pilot && <DataItem 
                              isCaptionHidden={true} 
                              dataString={pilot} 
                              captionString={teamCopy.pilotName}
                              hasShortCaption={false}
                            />
              }
              
            </dl>
          </div>
        </div>
        <ButtonClose  path={goBackPath} />
      </>
  }

  return (
    <div className={style.sessionsList__header}>
      {content}
    </div>
  )
}

export default SessionsListHeader