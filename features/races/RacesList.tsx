import { useAppSelector } from '../../app/hooks'

import RacesListItem from '../../components/racesListItem/RacesListItem'
import Header from '../../components/header/Header'

import { sortRaces } from '../../utilities/utilities'

import { RaceType } from '../../types/types'
import { headerCopy } from '../../data/copy'
import style from './RacesList.module.css'

const RacesList = () => {
  const races = useAppSelector(state => state.races.races)
  const sortedRaces = sortRaces(races)

  let content = <></>

  if (sortedRaces.length > 0) {
    content = 
      <ul className={style.racesList}>
        {sortedRaces.map((race: RaceType) => 
          <RacesListItem key={race.id} data={race} />
        )}
      </ul>
  }
  return (
    <>
      <Header screen="racesList" hasContent={sortedRaces.length > 0}>
        <h1 className="caption">{headerCopy.noDataHeading}</h1>
      </Header>
      
      <main>
        {content}
      </main>
    </>
  )
}

export default RacesList