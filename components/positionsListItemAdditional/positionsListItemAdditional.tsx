import ButtonLink from '../buttonLink/ButtonLink'

import { IncidentType, FinishedPilot } from '../../types/types'
import { controlsCopy, teamCopy } from '../../data/copy'
import style from './positionsListItemAdditional.module.css'

interface PositionsListItemAdditionalProps {
  sessionBest: string;
  raceBest: string;
  incidents: IncidentType[];
  finishedPilots: FinishedPilot[];
  onClick: () => void;
}

const PositionsListItemAdditional = ({ sessionBest, raceBest, incidents, onClick }: PositionsListItemAdditionalProps) => {
  return (
    <div className={style.positionAdditional}>
      <table className={style.tableTimes} role="table">
        <caption className="visually-hidden">{teamCopy.bestTimesCaption}</caption>
        <tbody role="rowgroup">
          <tr role="row">
            <th className="color_text_secondary" role="rowheader" scope="row">{teamCopy.bestTimesSessionBest}</th>
            <td role="cell">{sessionBest}</td>
          </tr>
          <tr role="row">
            <th className="color_text_secondary" role="rowheader" scope="row">{teamCopy.bestTimesRaceBest}</th>
            <td role="cell">{raceBest}</td>
          </tr>
        </tbody>
      </table>
      {/* <table className={style.tablePilots} role="table">
        <caption className="visually-hidden">{teamCopy.finishedPilotsCaption}</caption>
        <tbody role="rowgroup">
          {finishedPilots.map((pilot: FinishedPilot) => 
            <tr role="row" key={pilot.id}>
             <th role="rowheader" scope="row" className="ellipsis">{pilot.name}</th>
             <td role="cell">{pilot.totalTime}</td>
           </tr>
          )}
        </tbody>
      </table> */}
      <table className={`${style.tableIncidents}`} role="table">
        <caption className="visually-hidden">{teamCopy.incidentsCaption}</caption>
        <tbody role="rowgroup">
          {incidents.map((incident: IncidentType) => 
            <tr role="row" key={incident.id}>
             <th className="color_orange" role="rowheader" scope="row">{incident.name}</th>
             <td className="color_orange" role="cell">{incident.time}</td>
           </tr>
          )}
        </tbody>
      </table>
      <ButtonLink onClick={onClick} buttonText={controlsCopy.detailsButtonExpanded} />
    </div>
  )
}

export default PositionsListItemAdditional