import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate, useParams, Link } from 'react-router-dom'

import Header from '../header/Header'
import InputSelect from '../inputSelect/InputSelect'
import ButtonDefault from '../buttonDefault/ButtonDefault'

import { selectMyTeamName, selectPositions, setMyTeamName } from '../../features/positions/positionsSlice'

import { PositionType } from '../../types/types'
import { formsCopy, controlsCopy, headerCopy } from '../../data/copy'
import style from './FormMyTeam.module.css'

const FormMyTeam = () => {
  const { raceId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const myTeamName = useAppSelector(selectMyTeamName)
  const positions = useAppSelector(selectPositions)
  const teamNames = positions?.map((position: PositionType) => position.teamName)
  const hasContent = positions?.length !== undefined && positions.length > 0

  const [ selectedTeam, setSelectedTeam ] = useState<string>('')

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.currentTarget.value) {
      setSelectedTeam(event.currentTarget.value)
    }
  }

  function onSaveTeam() {
    dispatch(setMyTeamName(selectedTeam))
    navigate(`/${raceId}`)
  }

  return (
    <>
      <Header hasContent={hasContent} screen="default" myTeamName={myTeamName} positions={positions}>
        <>
          <h1>{headerCopy.noDataHeading}</h1>
          <Link className="link_goBack" to={`/`}>{headerCopy.goBack}</Link>
        </>
      </Header>
      <main className={style.myTeamContentContainer}>
      <h2>{formsCopy.editRaceHeading}</h2>
        <form>
          <fieldset>            
            <InputSelect 
              id="myTeam"
              name={formsCopy.inputYourTeam} 
              defaultOptionName={formsCopy.inputYourTeamSelect} 
              options={teamNames}
              onChangeOption={handleSelect}
              myTeam={myTeamName}
              />
          </fieldset>
          <div className="buttonsConainer">

            <ButtonDefault variant="primary" isTypeButton={false} onClick={onSaveTeam} isLink={false}>
              <span>{controlsCopy.saveButton}</span>
            </ButtonDefault>

            <ButtonDefault variant="secondary" isLink={true} href={`/${raceId}`}>
              <span>{controlsCopy.cancelButton}</span>
            </ButtonDefault>

          </div>
        </form>
      </main>
    </>
  )
}

export default FormMyTeam