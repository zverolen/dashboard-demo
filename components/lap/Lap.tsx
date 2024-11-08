import { useOutletContext  } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'

import { setCurrentLap } from '../../features/positions/positionsSlice'

import ButtonAdd from '../buttonAdd/ButtonAdd'

import { formatMs } from '../../utilities/utilities'

import { LapType, OutletContextType } from '../../types/types'
import { teamCopy, controlsCopy } from '../../data/copy'
import style from './Lap.module.css'

interface LapProps extends LapType {
  lapEvent: number;
  teamPosition: string;
  raceElapsedTimeMs: number;
  hasPit: boolean;
  quality: number;
  sessionNumber: number;
}

const Lap = ({ 
  number, 
  time,
  raceElapsedTimeMs,
  lapEvent,
  isBestInSession, 
  id,
  quality,
  sessionNumber
}: LapProps) => {
  const lapClassName = isBestInSession ? style.first : ''
  const barWidth = `${quality}%`
  const dispatch = useAppDispatch()

  const { raceId, teamNumber } = useOutletContext<OutletContextType>()

  const preparedRaceElapsedTime = formatMs(raceElapsedTimeMs)
  const longLapClass = time.includes(':') ? 'fourth' : ''

  function handleAddEvent() {
    dispatch(setCurrentLap(id))
  }

  let lastCellContent!: React.ReactElement

  if (lapEvent === 0) {
    lastCellContent = <>
                        <th scope="row" role="rowheader" className="visually-hidden">Efficiency</th>
                        <td className={style.efficiencyPercent} role="cell" aria-label={`${quality} per cent`}>
                          <span style={{width: barWidth}} role="none" className={`${style.bar} ${lapClassName}`}></span>
                        </td>
                      </>
  } else if (lapEvent === 1) {
      lastCellContent = <>
                          <th scope="row" role="rowheader" className="visually-hidden">Race event</th>
                          <td role="cell" >{teamCopy.pit}</td>
                        </>
  } else if (lapEvent === 2) {
  lastCellContent = <>
                      <th scope="row" role="rowheader" className="visually-hidden">Race event</th>
                      <td role="cell" >{teamCopy.penalty}</td>
                    </>
  } else if (lapEvent === 3) {
    lastCellContent = <>
                        <th scope="row" role="rowheader" className="visually-hidden">Race event</th>
                        <td role="cell" >{teamCopy.positionBattle}</td>
                      </>
  } else if (lapEvent === 4) {
    lastCellContent = <>
                        <th scope="row" role="rowheader" className="visually-hidden">Race event</th>
                        <td role="cell" >{teamCopy.other}</td>
                      </>
  }

  return (
    <li key={number} className={`${lapClassName} ${style.lap}`}>
      <table role="table">
        <caption className="visually-hidden">{`Lap ${number} overview`}</caption>
        <tbody role="rowgroup">
          <tr role="row">
            <th scope="row" role="rowheader" className="visually-hidden">Lap number</th>
            <td className="color_text_secondary" role="cell">{number}</td>
          </tr>
          <tr role="row">
            <th scope="row" role="rowheader" className="visually-hidden">Lap time</th>
            <td className={longLapClass} role="cell">{time}</td>
          </tr>
          <tr role="row">
            <th scope="row" role="rowheader" className="visually-hidden">Crossing finish time</th>
            <td className="color_text_secondary" role="cell">{preparedRaceElapsedTime}</td>
          </tr>
          <tr role="row">
            {lastCellContent}
          </tr>
        </tbody>
      </table>
      <ButtonAdd 
        path={`/${raceId}/${teamNumber}/sessions/${sessionNumber}/${number}/addevent`} 
        onClick={handleAddEvent} 
        buttonName={controlsCopy.addButtonAriaLabel}
      />
    </li>
  )
}

export default Lap