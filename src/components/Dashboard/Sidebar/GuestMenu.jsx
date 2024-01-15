import MenuItem from "./MenuItem"
import { TbBrandBooking } from "react-icons/tb";

const GuestMenu = () => {
  return (
    <>
            
              <MenuItem
                icon={TbBrandBooking }
                label='My Bookings'
                address='my-bookings'
              />
        </>
  )
}

export default GuestMenu