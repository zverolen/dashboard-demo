import { teamCopy } from '../../data/copy'

import style from './PositionsDataCell.module.css'

interface PositionsDataCellProps {
  rowName: string;
  rowData: string | number;
  // hasPlus?: boolean;
  modifier?: string;
  hasEllipsis?: boolean;
  textColorClass?: string;
  // isLink?: boolean;
  // linkAddress?: string;
  // onClick?: () => void;
}

const PositionsDataCell = ({ 
  rowName, 
  rowData, 
  hasEllipsis, 
  modifier, 
  textColorClass
}: PositionsDataCellProps) => {

  const truncatedClass = hasEllipsis ? 'ellipsis' : ''
  const additionalContent: string = rowName === teamCopy.sessionNumber ? teamCopy.sessionNumberShort : ''
  const textClass = textColorClass ? textColorClass : ""

  // let content: React.ReactElement
  // // if (isLink && linkAddress && onClick) {
  // //   content = <Link to={linkAddress} onClick={onClick}>
  // //               <span className={`${truncatedClass} ${textClass}`}>{`${additionalContent}${rowData}`}</span>
  // //             </Link>
  // // } else {
  //   content = <span className={`${truncatedClass} ${textClass}`}>{`${additionalContent}${rowData}`}</span>
  // // }

  return (
    <tr className={`${modifier}`} role="row">
      <th scope="row" role="rowheader" className="visually-hidden">{rowName}</th>
      <td className={style.positions__data} role="cell">
        <span className={`${truncatedClass} ${textClass}`}>{`${additionalContent}${rowData}`}</span>
      </td>
    </tr>
  )
}

export default PositionsDataCell