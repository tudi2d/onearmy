import React from 'react'
import { Input } from '../Form/elements'

interface IProps {
  placeholder: string
  onChange: (value: string) => void
}

const style = {
  background: 'white',
  fontFamily: 'Varela Round',
  fontSize: '14px',
  border: '2px solid black',
  height: '44px',
  display: 'flex',
  marginBottom: 0,
}

const SearchInput: React.FC<IProps> = ({ placeholder, onChange, ...props }) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={style}
      {...props}
    />
  )
}

export default SearchInput