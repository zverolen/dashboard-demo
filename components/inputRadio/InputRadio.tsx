import style from './InputRadio.module.css'

interface InputRadionProps {
  isChecked: boolean;
  value: string;
  inputId: string;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const InputRadio = ({ isChecked, value, inputId, onFocus, onClick }: InputRadionProps) => {
  return (
    <div key={inputId} className={`${style.inputRadio}`}>
      <input id={inputId} type="radio" checked={isChecked} onFocus={onFocus} onClick={onClick}/>
      <label htmlFor={inputId}>{value}</label>
    </div>
  )
}

export default InputRadio