import { Link } from 'react-router-dom'

import DataItem from '../dataItem/DataItem'
import ButtonClose from '../buttonClose/ButtonClose'

import { teamCopy, sessionsListHeaderCopy } from '../../data/copy'
import style from './FormHeader.module.css'

interface FormHeaderProps {
  raceId: string | undefined;
  teamNumber: string | undefined;
  teamName: string | undefined;
  position: string | undefined;
  kart: string | undefined;
  pilot: string | undefined;
  loaded: boolean;
}

const FormHeader = ({ raceId, teamName, teamNumber, position, kart, pilot, loaded }: FormHeaderProps) => {

  let content = <>
    <h1>{sessionsListHeaderCopy.noDataHeading}</h1>
    <Link className="link_goBack" to={`/${raceId}`}>{sessionsListHeaderCopy.goBack}</Link>
  </>

  if (loaded) {
    content = <>
      <div className={style.formHeader__lineOne}>
        <h2>
          <span className="visually-hidden">{teamCopy.teamNumber}</span>
          <span>{teamNumber}</span>
          <span className="ellipsis">{teamName}</span>
        </h2>
        <ButtonClose path={`/${raceId}/${teamNumber}/sessions`} />
        
      </div>
      <div className={style.formHeader__lineTwo}>
        <dl>
          <DataItem 
            isCaptionHidden={false} 
            captionString={teamCopy.position}
            captionStringShort={teamCopy.positionShort}
            hasShortCaption={true}
            dataString={position} 
          />
          {kart && <DataItem 
                    isCaptionHidden={false} 
                    captionString={teamCopy.kartNumber}
                    hasShortCaption={false}
                    dataString={kart} 
                  />}
          {pilot && <DataItem 
                      isCaptionHidden={false} 
                      captionString={teamCopy.pilotName}
                      hasShortCaption={false} 
                      dataString={pilot} 
                      hasEllipsis={true} 
                    />}
        </dl>
      </div>  
    </>
  }

  return (
    <div className={style.formHeader}>
      {content}
    </div>
  )
}

export default FormHeader