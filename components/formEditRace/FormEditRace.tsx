import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'

import { selectMyTeamName, selectPositions } from '../../features/positions/positionsSlice'

import Header from '../header/Header'
import InputRadio from '../inputRadio/InputRadio'
import InputText from '../inputText/InputText'
import ButtonDefault from '../buttonDefault/ButtonDefault'


import { connection } from '../../utilities/signalr'
import { formatMinsToMs } from '../../utilities/utilities'

import { RaceInputRadiosList, RaceInputRadio } from '../../types/types'
import { controlsCopy, formsCopy, headerCopy } from '../../data/copy'
import style from './FormEditRace.module.css'

const radioInputs: RaceInputRadiosList = [
  {id: 'raceTime', value: formsCopy.inputRaceTime, checked: true},
  {id: 'numOfLaps', value: formsCopy.inputNumberOfLaps, checked: false}
]

const hardcodedValues = {
  MinPitTimeMs: 120000,
  MinLapTimeMs: 39000,
  RaceTimeLimitType: 0,
  MaxRaceLaps: 20,
  MaxSessionDurationMs: formatMinsToMs(30),
  MinNumberOfSessions: 10,
  MaxRaceTimeMs: formatMinsToMs(240)
}

const FormEditRace = () => {
  const { raceId } = useParams()
  const navigate = useNavigate()

  const maxLapsInRace = useAppSelector(state => state.raceProfile.maxRaceLaps).toString()
  const minNumOfSessions = useAppSelector(state => state.raceProfile.minNumberOfSessions).toString()
  const maxSessionDuration = (useAppSelector(state => state.raceProfile.maxSessionDurationMs) / 60000).toString()
  // const maxRaceTime = useAppSelector(state => state.raceProfile.maxRaceTimeMs).toString()
  // After the time was pull from data in Ms it is converted to Mins as it is shown in input
  const maxRaceTime = (useAppSelector(state => state.raceProfile.maxRaceTimeMs) / 60000).toString()

  const [ maxRaceLapsValue, setMaxRaceLapsValue ] = useState<string>(maxLapsInRace)
  const [ maxSessionDurationValue, setMaxSessionDurationValue ] = useState<string>(maxSessionDuration)
  const [ minNumOfSessionsValue, setMinNumOfSessionsValue ] = useState<string>(minNumOfSessions)
  const [ raceTimeValue, setRaceTimeValue ] = useState<string>(maxRaceTime)

  const [ inputsRadio, setInputsRadio ] = useState<RaceInputRadiosList>(radioInputs)
  const [ connectionState, setConnectionState ] = useState<string>("") 

  const selectedRadio = inputsRadio.find((input: RaceInputRadio) => input.checked === true)

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
      connection.send('WatchRace', raceId)
    }
  }, [raceId, connectionState])

  useEffect(() => {
    setMaxRaceLapsValue(maxLapsInRace)
    setMaxSessionDurationValue(maxSessionDuration)
    setMinNumOfSessionsValue(minNumOfSessions)
    setRaceTimeValue(maxRaceTime)
  }, [maxLapsInRace, maxSessionDuration, minNumOfSessions, maxRaceTime])

  function handleFocusChangeRadio(event: React.FocusEvent<HTMLInputElement>) {
    const updatedInputs = inputsRadio.map((input) => {
      if (input.id == event.currentTarget.id) {
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

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.currentTarget.id) {
      case 'maxRaceLaps':
        setMaxRaceLapsValue(event.currentTarget.value)
        break
      case 'maxSessionDuration':
        setMaxSessionDurationValue(event.currentTarget.value)
        break
      case 'maxRaceTime':
        setRaceTimeValue(event.currentTarget.value)
        break
      default:
        setMinNumOfSessionsValue(event.currentTarget.value)
    }
  }

  function onSave(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const preparedRaceType = inputsRadio[0].checked === true ? 0 : 1
    const preparedMaxSessionDuration = formatMinsToMs(Number(maxSessionDurationValue))
    // Before putting to base - convert Mins that were entered to Ms
    const preparedMaxRaceTime = formatMinsToMs(Number(raceTimeValue))
    // console.log(`prepared max race time ${preparedMaxRaceTime}`)

    const data = {...hardcodedValues}
    
    if (data.RaceTimeLimitType !== preparedRaceType) {
      data.RaceTimeLimitType = preparedRaceType
    }
    if (data.MaxRaceLaps !== Number(maxRaceLapsValue)) {
      data.MaxRaceLaps = Number(maxRaceLapsValue)
    }
    if (data.MaxSessionDurationMs !== preparedMaxSessionDuration) {
      data.MaxSessionDurationMs = preparedMaxSessionDuration
    }
    if (data.MinNumberOfSessions !== Number(minNumOfSessionsValue)) {
      data.MinNumberOfSessions = Number(minNumOfSessionsValue)
    }
    if (data.MaxRaceTimeMs !== preparedMaxRaceTime) {
      data.MaxRaceTimeMs = preparedMaxRaceTime
    }

    connection.send('SetRaceProfile', raceId, data)
    navigate(`/${raceId}`)
  }

  return (
    <>
      <Header screen="default" hasContent={hasContent} myTeamName={myTeamName} positions={positions}>
        <>
          <h1>{headerCopy.noDataHeading}</h1>
          <Link className="link_goBack" to={`/`}>{headerCopy.goBack}</Link>
        </>
      </Header>
      <main className={style.editRaceContentContainer}>
        <h2>{formsCopy.editRaceHeading}</h2>
        <form className={style.formEditRace}>
          <fieldset className={style.formEditRadio}>
            <legend>{formsCopy.raceTypeSubheading}</legend>
            {inputsRadio.map((input: RaceInputRadio) => 
              <InputRadio 
                onFocus={handleFocusChangeRadio} 
                key={input.id} 
                isChecked={input.checked} 
                value={input.value} 
                inputId={input.id} 
                onClick={handleClickChangeRadio} 
              />
            )}
          </fieldset>
          <fieldset>
            <legend>{formsCopy.editRaceSettingsSubheading}</legend>
            { selectedRadio?.id === 'numOfLaps' ? (
                <InputText 
                  id="maxRaceLaps" 
                  name={formsCopy.inputMaxLapsNumberInRace} 
                  value={maxRaceLapsValue} 
                  onChange={handleInputChange}
                  type="number"
                  minNumber={1}
                  maxNumber={500}
                />
              ) : null
            }
            { selectedRadio?.id === 'raceTime' ? (
                <InputText 
                  id="maxSessionDuration" 
                  name={formsCopy.inputMaxSessionDuration} 
                  value={maxSessionDurationValue} 
                  onChange={handleInputChange}
                  type="number"
                  minNumber={5}
                  maxNumber={90}
                />
              ) : null
            }

            {selectedRadio?.id === 'raceTime' ? (
                <InputText 
                  id="maxRaceTime" 
                  name={formsCopy.inputMaxRaceTime} 
                  value={raceTimeValue}   
                  onChange={handleInputChange}
                  type="number"
                  minNumber={1}
                  maxNumber={1440}
                />
              ) : null
            }
          <InputText 
                id="minNumOfSessions" 
                name={formsCopy.inputMinNumOfSessions}
                value={minNumOfSessionsValue}   
                onChange={handleInputChange}
                type="number"
                minNumber={1}
                maxNumber={99}
              />
          
          </fieldset>
          <div className="buttonsConainer">
            
            <ButtonDefault variant="primary" isTypeButton={false} onClick={onSave} isLink={false}>
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

export default FormEditRace