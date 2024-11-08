import { Link } from 'react-router-dom'

import style from './ButtonAdd.module.css'

interface ButtonAddProps {
  path: string;
  onClick: () => void;
  buttonName: string;
}

const ButtonAdd = ({ path, onClick, buttonName}: ButtonAddProps) => {
  return (
    <Link className={style.buttonAdd} to={path} onClick={onClick} aria-label={buttonName}>
      <svg width="21.364" xmlns="http://www.w3.org/2000/svg" height="21.356" viewBox="217 90 21.364 21.356" fill="none" version="1.1">
        <path d="M229.023,110.017L229.023,91.350C229.023,90.614,228.426,90.017,227.690,90.017L227.690,90.017C226.954,90.017,226.357,90.614,226.357,91.350L226.357,110.017C226.357,110.753,226.954,111.350,227.690,111.350L227.690,111.350C228.426,111.350,229.023,110.753,229.023,110.017Z" />
        <path d="M237.030,102.010L218.364,102.010C217.628,102.010,217.030,101.413,217.030,100.677L217.030,100.677C217.030,99.941,217.628,99.343,218.364,99.343L237.030,99.343C237.766,99.343,238.364,99.941,238.364,100.677L238.364,100.677C238.364,101.413,237.766,102.010,237.030,102.010Z" />
      </svg>
    </Link>
  )
}

export default ButtonAdd