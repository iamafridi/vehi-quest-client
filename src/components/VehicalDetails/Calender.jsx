/* eslint-disable react/prop-types */
import { DateRange } from 'react-date-range'
import { useState } from 'react'

const Calender = ({ value }) => {
  const [range, setRange] = useState([value]) // initialize with prop value

  return (
    <DateRange
      rangeColors={['#F43F5E']}
      ranges={range}
      direction='vertical'
      showDateDisplay={false}
      onChange={item => setRange([item.selection])} // ✅ this fixes the error
    />
  )
}

export default Calender
