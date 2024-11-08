import style from './InputSelect.module.css'

interface InputSelectProps {
  id: string;
  name: string;
  defaultOptionName: string;
  options: Array<string> | undefined;
  myTeam?: string;
  onChangeOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({ id, name, defaultOptionName, options, myTeam, onChangeOption}: InputSelectProps) => {

  return (
    <div className={style.inputGroup} key={id}>
      <label htmlFor={id}>
        <span>{name}</span>
        <select className={style.select} id={id} onChange={onChangeOption}>
          <option key={defaultOptionName} value="">{defaultOptionName}</option>
          {options?.map((option: string) => {
            const isMyTeam = option === myTeam
            return <option key={option} value={option} selected={isMyTeam}>{option}</option>
          } 
          )}
        </select>
      </label>
    </div>
  )
}

export default InputSelect