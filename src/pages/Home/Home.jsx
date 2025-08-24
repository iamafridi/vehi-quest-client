import { Helmet } from "react-helmet-async"
import Categories from "../../components/Categories/Categories"
import Vehicles from "../../components/Vehicles/Vehices"
import Banner from "./Banner"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | VehiQuest | Rent Cars & Ride Safe</title>
      </Helmet>

      {/* Banner Carousel */}
      <Banner />

      {/* Category Section */}
      <Categories />

      {/* Vehicle Section */}
      <Vehicles />
    </div>
  )
}

export default Home