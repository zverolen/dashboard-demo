import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import InputRadio from '../inputRadio/InputRadio'
import ButtonDefault from '../buttonDefault/ButtonDefault'

import { connection } from '../../utilities/signalr'

import { EventInputList, EventInput } from '../../types/types'
import { controlsCopy, formsCopy } from '../../data/copy'
import style from './FormAddEvent.module.css'


const eventInputs: EventInputList = [
  {id: '0', value: formsCopy.inputEventNoEvent, checked: false},
  {id: '1', value: formsCopy.inputEventPit, checked: true},
  {id: '2', value: formsCopy.inputEventPenalty, checked: false},
  {id: '3', value: formsCopy.inputEventPositionBattle, checked: false},
  {id: '4', value: formsCopy.inputEventOther, checked: false},
]

const FormAddEvent = () => {
  const { raceId, teamNumber, lapNumber } = useParams()
  const [ inputsRadio, setInputsRadio ] = useState<EventInputList>(eventInputs)

  const currentLap = useAppSelector(state => state.positions.currentLap)

  const [ selectedEvent, setSelectedEvent ] = useState<string>('1')

  const navigate = useNavigate()

  function handleFocusChangeRadio(event: React.FocusEvent<HTMLInputElement>) {
    const updatedInputs = inputsRadio.map((input: EventInput) => {
      if (input.id == event.currentTarget.id) {
        setSelectedEvent(input.id)
        return {...input, checked: true}
      } else {
        return {...input, checked: false}
      }
    })

    setInputsRadio(updatedInputs)
  }

  function handleClickChangeRadio(event: React.MouseEvent<HTMLInputElement>) {
    const updatedInputs = inputsRadio.map((input) => {
      if (input.id == event.currentTarget.id) {
        return {...input, checked: true}
      } else {
        return {...input, checked: false}
      }
    })

    setInputsRadio(updatedInputs)
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    connection.send('SetLapEvent', currentLap, Number(selectedEvent))
    navigate(`/${raceId}/${teamNumber}/sessions`)
    
  }

  return (
    <form className={style.formAddEvent}>
      <legend>{`${formsCopy.addLapHeading} ${lapNumber}`}</legend>
      {inputsRadio.map((input: EventInput) => 
        <InputRadio onFocus={handleFocusChangeRadio} key={input.id} isChecked={input.checked} value={input.value} inputId={input.id} onClick={handleClickChangeRadio} />
        )
      }
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

export default FormAddEvent