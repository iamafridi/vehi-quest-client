import { Helmet } from "react-helmet-async"
import Categories from "../../components/Categories/Categories"
import Vehicles from "../../components/Vehicles/Vehices"
import Banner from "./Banner"
import HomePart2 from "./HomePart2/HomePart2"
import ListingsPage from "../../components/SearchField/ListingPage"

const Home = () => {
  return (
    <div className="-mt-20 bg-gradient-to-b from-black/5">
      <Helmet>
        <title>Home | VehiQuest | Rent Cars & Ride Safe</title>
      </Helmet>

      {/* Banner Carousel */}
      <Banner />


      {/* Category Section */}
      <Categories />

      {/* Search bar */}
      {/* <ListingsPage /> */}

      {/* Vehicle Section */}
      <Vehicles />

      <HomePart2 />

    </div>
  )
}

export default Home