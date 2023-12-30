import { useParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Shared/Loader";
import { Helmet } from "react-helmet-async";
// import Loader from "../../Loader.jsx"
const VehicleDetails = () => {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch('/rooms.json')
        .then(res => res.json())
        .then(data =>{
            const singleVehicle = data.find(vehicle => vehicle._id === id)
            setVehicle(singleVehicle)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loader/>
    return (
        <Container>
            <Helmet>
                <title>{vehicle.title}</title>
            </Helmet>
{vehicle.title}
        </Container>
    );
};

export default VehicleDetails;