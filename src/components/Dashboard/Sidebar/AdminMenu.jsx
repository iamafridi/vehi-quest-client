import { FaUserFriends } from "react-icons/fa";
import MenuItem from "./MenuItem";
const AdminMenu = () => {
    return (
        <>

            <MenuItem
                icon={FaUserFriends}
                label='Manage Users'
                address='manage-users'
            />
        </>
    )
}

export default AdminMenu