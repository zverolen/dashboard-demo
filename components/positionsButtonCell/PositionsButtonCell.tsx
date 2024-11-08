import style from './PositionsButtonCell.module.css'

interface PositionsButtonCellProps {
  children: React.ReactElement;
}

const PositionsButtonCell = ({ children }: PositionsButtonCellProps) => {

  return (
    <tr role="row">
      <th scope="row" role="rowheader" className="visually-hidden">Controls</th>
      <td className={style.position__buttons} role="cell">
        {children}
      </td>
    </tr>
  )
}

export default PositionsButtonCell