import MenuItem from "./MenuItem";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

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
        </>
    );
};

export default HostMenu;