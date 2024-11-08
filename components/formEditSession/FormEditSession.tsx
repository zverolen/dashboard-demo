import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import InputText from '../inputText/InputText'
import ButtonDefault from '../buttonDefault/ButtonDefault'

import { connection } from '../../utilities/signalr'

import { controlsCopy, formsCopy } from '../../data/copy'
import style from './FormEditSession.module.css'

const FormEditSession = () => {
  const { raceId, teamNumber, sessionNumber } = useParams()

  const [ kartValue, setKartValue ] = useState<string>('')
  const [ pilotValue, setPilotValue ] = useState<string>('')

  const navigate = useNavigate()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      switch (event.currentTarget.id) {
        case 'newPilot':
          setPilotValue(event.currentTarget.value)
          break
        default:
          setKartValue(event.currentTarget.value)
      }
    }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    connection.send('SetSessionCarAndDriver', raceId, teamNumber, Number(sessionNumber), kartValue, pilotValue)
    navigate(`/${raceId}/${teamNumber}/sessions`)
  }

  return (
    <form className={style.formEditSession}>
      <legend>{`${formsCopy.editSessionHeading} ${sessionNumber}`}</legend>

      <InputText 
          id="newPilot" 
          name={formsCopy.inputNewPilot}
          value={pilotValue} 
          onChange={handleInputChange}
          type="text"
      />
      <InputText 
          id="newKart" 
          name={formsCopy.inputNewKart}
          value={kartValue} 
          onChange={handleInputChange}
          type="number"
      />


      <div className="buttonsConainer">
        <ButtonDefault variant="primary" isTypeButton={false} onClick={handleSubmit} isLink={false}>
          <span>{controlsCopy.saveButton}</span>
        </ButtonDefault>

        <ButtonDefault variant="secondary" isLink={true} href={`/${raceId}/${teamNumber}/sessions`}>
          <span>{controlsCopy.cancelButton}</span>
        </ButtonDefault>
      </div>
    </form>      
  )
}

export default FormEditSession