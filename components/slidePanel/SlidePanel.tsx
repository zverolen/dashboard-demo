import style from './SlidePanel.module.css'

interface SlidePanelProps {
  children: React.ReactElement;
}

const SlidePanel = ({ children }: SlidePanelProps) => {
  
  return (
    <div className={style.sidePanel}>
      { children }
    </div>
  )
}

export default SlidePanel