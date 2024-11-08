import { useParams } from 'react-router-dom'

import ButtonToolBar from '../buttonToolBar/ButtonToolBar'

import style from './ToolBar.module.css'
import { controlsCopy } from '../../data/copy'

interface ToolBarProps {
  isRoot: boolean;
}

const ToolBar = ({ isRoot }: ToolBarProps) => {

  const { raceId } = useParams()

  return (
    <div className={style.toolBar}>
      {!isRoot ? 
        <>
          <ButtonToolBar icon="home" text={controlsCopy.homeButton} href={`/${raceId}`} />
          <ButtonToolBar icon="stats" text={controlsCopy.statsButton} href={`/${raceId}/racestats`} />
          <ButtonToolBar icon="profile" text={controlsCopy.raceProfileButton} href={`/${raceId}/editrace`} />
          <ButtonToolBar icon="team" text={controlsCopy.teamButton} href={`/${raceId}/myteam`} />
        </>
        : null
      }
    </div>
  )
}

export default ToolBar