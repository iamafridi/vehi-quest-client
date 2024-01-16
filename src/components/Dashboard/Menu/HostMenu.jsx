import MenuItem from "../Sidebar/MenuItem";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";

const HostMenu = () => {
    return (
        <>
            <MenuItem
                icon={IoAddCircleOutline }
                label='Add Vehicle'
                address='add-vehicle'
              />
              <MenuItem
                icon={FaCartArrowDown }
                label='My Listings'
                address='my-listings'
              />
              <MenuItem
                icon={FaAddressBook }
                label='Manage Bookings'
                address='manage-bookings'
              />

        </>
    );
};

export default HostMenu;