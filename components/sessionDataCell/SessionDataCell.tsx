import style from './SessionDataCell.module.css'

interface SessionDataCellProps {
  rowName: string;
  rowData: string | number;
  hasHidden: boolean;
  shortName?: string;
  hasEllipsis?: boolean;
  isForSessionNumber?: boolean;
}

const SessionDataCell = ({rowName, rowData, hasHidden, shortName, hasEllipsis, isForSessionNumber}: SessionDataCellProps) => {
  const hiddenClass = hasHidden ? 'visually-hidden' : ''

  let cellName!: React.ReactElement
  const truncatedClass = hasEllipsis ? `${style.ellipsis} ellipsis` : ''

  if (shortName) {
    cellName = <th scope="row" role="rowheader" aria-label={rowName} className="color_text_secondary">{shortName}</th>
  } else {
    cellName = <th scope="row" role="rowheader" className={hiddenClass}>{rowName}</th>
  }

  return (
    <tr className={`${style.sessionDataCell} ${isForSessionNumber ? style.sessionDataCell_session : ''}`} role="row">
      {cellName}
      <td className={truncatedClass} role="cell">{rowData}</td>
    </tr>
  )
}

export default SessionDataCell