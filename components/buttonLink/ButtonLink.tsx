import style from './ButtonLink.module.css'

interface ButtonLinkProps {
  onClick?: () => void;
  buttonName?: string;
  buttonText: string;
  ariaExpanded?: boolean;
}

const ButtonLink = ({ onClick, buttonName, buttonText, ariaExpanded}: ButtonLinkProps) => {

  return (
    <button className={style.buttonLink} aria-label={buttonName} onClick={onClick} type="button" aria-expanded={ariaExpanded}>
      <span>
        {buttonText}
      </span>
    </button>
  )
}

export default ButtonLink