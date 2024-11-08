import { Link } from 'react-router-dom'
import style from './ButtonDefault.module.css'

interface ButtonDefaultProps {
  variant: 'primary' | 'secondary';
  isTypeButton?: boolean;
  isLink: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactElement;
}

const ButtonDefault = ({ variant, isTypeButton, onClick, isLink, href, children }: ButtonDefaultProps) => {

  let buttonClass = style.button_primary
  let content =
    <button className={`${style.button} ${buttonClass}`} type={isTypeButton ? 'button' : 'submit'} onClick={onClick}>
      {children}
    </button>

if (variant === 'secondary') {
  buttonClass = style.button_secondary
}

  if (isLink && href) {
    content = 
    <Link className={`${style.button} ${buttonClass}`} to={href}>
      {children}
    </Link>
  }

  return (
    <>
      {content}
    </>
  )
}

export default ButtonDefault