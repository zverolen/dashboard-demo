import style from './DataItem.module.css'

interface DataItemProps {
  isCaptionHidden: boolean;
  dataString: string | undefined;
  captionString: string;
  captionStringShort?: string;
  hasShortCaption: boolean;
  hasEllipsis?: boolean;
  textColorClass?: string;
  backgroundColorClass?: string;
  isSeparateLine?: boolean;
  isForSessionNumber?: boolean;
}

const DataItem = ({ isCaptionHidden, 
                    dataString, 
                    captionString,
                    captionStringShort,
                    hasShortCaption,
                    hasEllipsis,
                    textColorClass,
                    backgroundColorClass,
                    isSeparateLine,
                    isForSessionNumber
                  }: DataItemProps) => {

  let dataStringClass = ''
  let dtElement: React.ReactElement = <dt className={isCaptionHidden ? 'visually-hidden' : ''}>{captionString}</dt>

  if (hasEllipsis) {
    dataStringClass += 'ellipsis'
  }
  if (textColorClass) {
    dataStringClass += ` ${textColorClass}`
  }
  if (backgroundColorClass) {
    dataStringClass += ` ${backgroundColorClass}`
  }

  if (hasShortCaption) {
    dtElement = <dt className={isCaptionHidden ? 'visually-hidden' : ''} aria-label={captionString}>{captionStringShort}</dt>
  }
  
  return (
    <div className={`${style.dataItem} ${isSeparateLine ? style.dataItem_line : ''} ${isForSessionNumber ? style.dataItem_session : ''}`}>
      {dtElement}
      <dd className={dataStringClass}>{dataString}</dd>
    </div>
  )
}

export default DataItem