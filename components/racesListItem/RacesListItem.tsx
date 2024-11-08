import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'

import { setRaceDetails } from '../../features/races/racesSlice'

import { isToday } from '../../utilities/utilities'

import { RaceType } from '../../types/types'
import style from './RacesListItem.module.css'

interface RacesListItemProps {
  data: RaceType
}

const RacesListItem = ({ data }: RacesListItemProps) => {

  const dispatch = useAppDispatch()

  const isActive = isToday(data.start)

  function handleClick() {
    dispatch(setRaceDetails({id: data.id, raceName: data.name}))
  }

  return (
    <li className={`${isActive ? style.racesListItem_active : ''} ${style.racesListItem}`} key={data.id}>
      <Link onClick={handleClick} to={`/${data.id}`}>{data.name}</Link>
    </li>
  )
}

export default RacesListItem