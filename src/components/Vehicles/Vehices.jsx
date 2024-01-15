import { useEffect, useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";
import Loader from '../Shared/Loader'
import { getAllVehicles } from "../../api/vehicles";

const Vehicles = () => {
    const [vehicles, setvehicles] = useState([])
    const [params, setParams] = useSearchParams();
    const [loading, setloading] = useState(false)
    const category = params.get('category')
    // console.log(category);

    useEffect(() => {
        setloading(true)
        getAllVehicles()
            .then(data => {
                if (category) {
                    const filtered = data.filter(vehicle => vehicle.category === category)
                    setvehicles(filtered)
                }
                else setvehicles(data);
                setloading(false)
            })
    }, [category])

    if (loading) return <Loader />
    return (
        <Container>
            {
                vehicles && vehicles.length > 0 ? (<div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {
                        vehicles.map(vehicle => (<Card key={vehicle._id} vehicle={vehicle}></Card>))
                    }
                </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
                        <Heading center={true}
                            title={'Sorry! No Vehicle Available In This Category'}
                            subtitle={'Please Select Other Categories'} />
                    </div>
                )
            }
        </Container>
    );
};

export default Vehicles;