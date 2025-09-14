/* eslint-disable react/prop-types */
import { DateRange } from 'react-date-range'
import { useState, useEffect } from 'react'

const Calendar = ({ value, onChange, bookedDates = [], minDate, maxDate }) => {
  const [range, setRange] = useState([value])

  useEffect(() => {
    setRange([value])
  }, [value])

  // Convert booked dates to Date objects
  const disabledDates = bookedDates.map(dateStr => new Date(dateStr))

  const handleChange = (item) => {
    const newRange = [item.selection]
    setRange(newRange)

    // Call parent onChange if provided
    if (onChange) {
      onChange(item.selection)
    }
  }

  // Function to disable booked dates - improved version
  const dayContentRenderer = (day) => {
    const isBooked = disabledDates.some(bookedDate =>
      bookedDate.toDateString() === day.toDateString()
    )

    if (isBooked) {
      return (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          textDecoration: 'line-through',
          cursor: 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {day.getDate()}
        </div>
      )
    }

    return day.getDate()
  }

  // Disable date function to prevent selection of booked dates
  const disabledDay = (day) => {
    return disabledDates.some(bookedDate =>
      bookedDate.toDateString() === day.toDateString()
    )
  }

  return (
    <div className="calendar-container">
      <DateRange
        rangeColors={['#F43F5E']}
        ranges={range}
        direction='vertical'
        showDateDisplay={false}
        onChange={handleChange}
        minDate={minDate || new Date()}
        maxDate={maxDate}
        disabledDates={disabledDates}
        disabledDay={disabledDay} // Add this to prevent selection
        dayContentRenderer={dayContentRenderer}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        editableDateInputs={true}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span className="text-gray-600">Available</span>
        </div>
      </div>

      {/* Booked dates info */}
      {bookedDates.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <h4 className="font-medium text-red-800 mb-2">Unavailable Dates:</h4>
          <div className="text-sm text-red-600">
            {bookedDates.slice(0, 5).map(date =>
              new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            ).join(', ')}
            {bookedDates.length > 5 && ` +${bookedDates.length - 5} more`}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar