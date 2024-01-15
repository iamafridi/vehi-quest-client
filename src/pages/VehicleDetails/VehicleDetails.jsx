import { useLoaderData } from "react-router-dom";
import Container from "../../components/Shared/Container";
import Loader from "../../components/Shared/Loader";
import { Helmet } from "react-helmet-async";
import Header from "../../components/VehicalDetails/Header";
import VehicleInfo from "../../components/VehicalDetails/VehicleInfo";
import VehicalReservation from "../../components/VehicalDetails/VehicalReservation";

const VehicleDetails = () => {
    const vehicle = useLoaderData()
   

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