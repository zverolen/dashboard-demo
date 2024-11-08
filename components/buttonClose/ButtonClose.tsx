import { Link } from 'react-router-dom'

import { crossSmall } from '../../data/icons'
import { controlsCopy } from '../../data/copy'
import style from './ButtonClose.module.css'

interface ButtonCloseProps {
  path: string;
}

const ButtonClose = ({ path }: ButtonCloseProps) => {
  return (
    <Link to={path} className={style.buttonClose} aria-label={controlsCopy.closeButtonAriaLabel}>
      {crossSmall}
    </Link>
  )
}

export default ButtonClose