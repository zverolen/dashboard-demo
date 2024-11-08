import style from './LayoutTwoPanels.module.css'

interface LayoutTwoPanelsProps {
  children: React.ReactElement;
}

const LayoutTwoPanels = ({ children }: LayoutTwoPanelsProps) => {
  return(
    <div className={style.layoutTwoPanels}>
      { children }
    </div>
  )
}

export default LayoutTwoPanels