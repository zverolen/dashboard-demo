import { Link } from 'react-router-dom'

import style from './ButtonOpen.module.css'

interface ButtonOpenProps {
  onClick?: () => void;
  path: string;
  buttonName: string;
}

const ButtonOpen = ({ onClick, path, buttonName }: ButtonOpenProps) => {
  return (
    <Link onClick={onClick} className={`${style.buttonOpen} buttonOpen`} to={path} aria-label={buttonName}>
      <svg className={style.dotsIcon} width="4" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="-125 356 4 18" version="1.1">
        <ellipse cx="-123" cy="358" rx="2" ry="2" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)"></ellipse>
        <ellipse cx="-123" cy="365" rx="2" ry="2" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)"></ellipse> 
        <ellipse cx="-123" cy="372" rx="2" ry="2" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)"></ellipse>
      </svg>
    </Link>
  )
}

export default ButtonOpen