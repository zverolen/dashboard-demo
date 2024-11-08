import style from './InputText.module.css'

interface InputTextProps {
  id: string;
  name: string;
  value: string;
  type: string;
  minNumber?: number;
  maxNumber?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ id, name, value, type, onChange, minNumber, maxNumber }: InputTextProps) => {
  return (
    // <div className="inputGroup">
    <div className={style.inputGroup}>
      <label className={style.label} htmlFor={id}>
        <span>{name}</span>
        <input
          className={style.input}
          id={id} 
          value={value} 
          type={type}
          onChange={onChange}
          min={minNumber}
          max={maxNumber}
        />
      </label>
    </div>
  )
}

export default InputText