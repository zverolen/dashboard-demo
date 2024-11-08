interface CollapsibleProps {
  children: React.ReactElement;
  isExpanded: boolean;
}

const Collapsible = ({ children, isExpanded }: CollapsibleProps) => {
  return (
    <div>
      {isExpanded && children}
    </div>
  )
}

export default Collapsible