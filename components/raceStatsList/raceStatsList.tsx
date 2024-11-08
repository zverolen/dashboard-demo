import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import { selectRaceStats } from '../../features/raceStats/raceStatsSlice'
import { selectMyTeamName, selectPositions } from '../../features/positions/positionsSlice'

import Header from '../header/Header'

import { connection } from '../../utilities/signalr'
import { formatMsToSec, determineTempDeficitColor } from '../../utilities/utilities'

import { headerCopy, statsCopy } from '../../data/copy'
import { RaceStatsListItemType } from '../../types/types'
import style from './raceStatsList.module.css'

const RaceStatsList = () => {
  const { raceId } = useParams()
  const [ connectionState, setConnectionState ] = useState<string>('')
  const stats = useAppSelector(selectRaceStats)

  const positions = useAppSelector(selectPositions)
  const myTeamName = useAppSelector(selectMyTeamName)

  const hasContent = positions?.length !== undefined && positions.length > 0

  useEffect(() => {
    const interval = setInterval(() => {
        if (connectionState !== 'Connected') {
          setConnectionState(connection.state)
        }
    }, 300)
    return () => clearInterval(interval)
  }, [connectionState])

  useEffect(() => {
    if (connectionState === 'Connected') {
      connection.send('GetCarStats', raceId)
    }
  }, [raceId, connectionState])

  let content: React.ReactElement = <p>No stats</p>

  if (stats.length > 0) {
    content = <table className={style.raceStatsTable}>
                <caption>Car stats</caption>
                <thead>
                  <tr>
                    <th scope="col">{statsCopy.carColumnName}</th>
                    <th scope="col">{statsCopy.bestTimeName}</th>
                    <th scope="col" className="visually-hidden">{statsCopy.bestTimeDiffName}</th>
                    <th scope="col">{statsCopy.avgTimeName}</th>
                    <th scope="col" className="visually-hidden">{statsCopy.avgTimeDiffName}</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((statsItem: RaceStatsListItemType) => {
                    const tempDificitBestLap = determineTempDeficitColor(statsItem.bestLapTimeDiff)
                    const tempDificitAvgBestLap = determineTempDeficitColor(statsItem.avgBestLapTimeDiff)
                    return <tr key={statsItem.number}>
                            <td className="color_kart">{statsItem.number}</td>
                            <td>{formatMsToSec(statsItem.bestLapTimeMs)}</td>
                            <td className={tempDificitBestLap}>{`+${statsItem.bestLapTimeDiff.toFixed(1)}`}</td>
                            <td>{formatMsToSec(statsItem.avgBestLapTimeMs)}</td>
                            <td className={tempDificitAvgBestLap}>{`+${statsItem.avgBestLapTimeDiff.toFixed(1)}`}</td>
                          </tr>
                      })}
                </tbody>
              </table>
  }

  return (
    <>
      <Header screen="default" hasContent={hasContent} myTeamName={myTeamName} positions={positions}>
        <>
          <h1>{headerCopy.noDataHeading}</h1>
          <Link className="link_goBack" to={`/`}>{headerCopy.goBack}</Link>
        </>
      </Header>
      <main className={style.raceStatsContentContainer}>
        {content}
      </main>
    </>
  )
}

export default RaceStatsList