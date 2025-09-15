import { FaUserFriends } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import MenuItem from "../Sidebar/MenuItem";
const AdminMenu = () => {
    return (
        <>

            <MenuItem
                icon={FaUserFriends}
                label='Manage Users'
                address='manage-users'
            />
            <MenuItem
                icon={FaAddressBook}
                label='Admin Manage Bookings'
                address='admin-manage-booking'
            />
            <MenuItem
                icon={FaAddressBook}
                label='Admin Manage Vehicle'
                address='admin-manage-vehicle'
            />
            <MenuItem
                icon={FaAddressBook}
                label='Admin Approve Vehicle'
                address='admin-approve-vehicle'
            />
        </>
    )
}

export default AdminMenu