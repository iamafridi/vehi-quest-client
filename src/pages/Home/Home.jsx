
import { Helmet } from "react-helmet-async"
import Categories from "../../components/Categories/Categories"
import Vehicles from "../../components/Vehicles/Vehices"

const Home = () => {
 
  return (
    <div>
   <Helmet>
                <title>Home | VehiQuest | Rent Cars & Ride Safe</title>
            </Helmet>
      {/* Category Section  */}
      <Categories />
      {/* Vehical Section  */}
      <Vehicles/>
    </div>
  )
}

export default Home
