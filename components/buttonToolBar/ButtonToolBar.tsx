import { NavLink } from 'react-router-dom'

import { profileIcon, statsIcon, homeIcon, teamIcon } from '../../data/icons';

import styles from './ButtonToolBar.module.css'

interface ButtonToolBarProps {
  icon: string;
  text: string;
  href: string;
}

const ButtonToolBar = ({
  icon,
  text,
  href
}: ButtonToolBarProps) => {
  let iconSvg

  switch(icon) {
    case 'team':
      iconSvg = teamIcon
      break
    case 'stats':
      iconSvg = statsIcon
      break
    case 'profile':
      iconSvg = profileIcon
      break
    default:
      iconSvg = homeIcon
  }

  return (
    <NavLink className={styles.buttonToolBar} to={href} end>
      {iconSvg}
      <span>{text}</span>
    </NavLink>
  )
}

export default ButtonToolBar