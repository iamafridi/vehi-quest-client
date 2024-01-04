import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Shared/Loader";
import { Helmet } from "react-helmet-async";
import Header from "../../components/VehicalDetails/Header";
import VehicleInfo from "../../components/VehicalDetails/VehicleInfo";
import VehicalReservation from "../../components/VehicalDetails/VehicalReservation";
// import Loader from "../../Loader.jsx"
const VehicleDetails = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/rooms.json')
            .then(res => res.json())
            .then(data => {
                const singleVehicle = data.find(vehicle => vehicle._id === id)
                setVehicle(singleVehicle)
                setLoading(false)
            })
    }, [id])

    if (loading) return <Loader />
    return (
        <Container>
            <Helmet>
                <title>{vehicle.title}</title>
            </Helmet>
            <div className="max-w-screen-lg mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <Header vehicle={vehicle} />
                </div>
                {/* Vehicle info */}
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <VehicleInfo vehicle={vehicle} />
                    {/* Vehicle reservation */}
                    <div className="md:col-span-3 order-first md:order-last mb-10">
<VehicalReservation vehicle={vehicle} />
                    </div>
                </div>

            </div>
        </Container>
    );
};

export default VehicleDetails;