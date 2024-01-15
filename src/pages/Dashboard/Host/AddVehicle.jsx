import { Helmet } from "react-helmet-async"
import AddVehicleForm from "../../../components/Form/AddVehicleForm"
import { useState } from "react"
import { imageUpload } from "../../../api/utils"
import useAuth from "../../../hooks/useAuth"
import { addVehicle } from "../../../api/vehicles"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


const AddVehicle = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value
        const guest = form.guest.value
        const seats = form.seats.value
        const description = form.description.value
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }
        const image_url = await imageUpload(image)

        const vehicleData = {
            location,
            category,
            title,
            to,
            from,
            price,
            guest,
            seats,
            description,
            host,
            image: image_url?.data?.display_url
        }

        try {

            const data = await addVehicle(vehicleData)
            console.log(data);
            setUploadButtonText('Uploaded')
            toast.success('Vehicle Added Successfully')
            navigate('/dashboard/my-listings')
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        } finally {
            setLoading(false)
        }
        console.table(vehicleData);

    }

    // Handle Date Change from React-date-range calender
    const handleDates = ranges => {
        setDates(ranges.selection)
    }
    // Handle Image button Text
    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }


    return (
        <div>
            <Helmet>
                <title>VehiQuest || Add Vehicle</title>
            </Helmet>

            {/* Form Here */}
            <AddVehicleForm
                handleSubmit={handleSubmit}
                handleDates={handleDates}
                dates={dates}
                handleImageChange={handleImageChange}
                loading={loading}
                uploadButtonText={uploadButtonText}
            />
        </div>
    )
}

export default AddVehicle