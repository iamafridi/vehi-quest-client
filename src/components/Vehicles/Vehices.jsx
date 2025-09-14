import { useEffect, useState, useMemo, useCallback } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import Loader from "../Shared/Loader";
import { useSearchParams } from "react-router-dom";
import { getAllVehicles } from "../../api/vehicles";
import SearchBar from "../SearchField/SearchBar";
import useAuth from "../../hooks/useAuth"; // Add this import

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, price-low, price-high, availability

    const [params] = useSearchParams();
    const { user } = useAuth(); // Get current user
    const category = params.get("category");
    const INITIAL_DISPLAY_COUNT = 4;

    // Check if user is admin - adjust this based on your user object structure
    const isAdmin = useMemo(() => {
        // Option 1: Check by role field
        if (user?.role === 'admin') return true;

        // Option 2: Check by email domain (if admins have specific email pattern)
        // if (user?.email && user.email.endsWith('@yourdomain.com')) return true;

        // Option 3: Check by specific admin email list
        // const adminEmails = ['admin@example.com', 'manager@example.com'];
        // if (user?.email && adminEmails.includes(user.email)) return true;

        return false;
    }, [user]);

    // Function to sort vehicles
    const sortVehicles = useCallback((vehiclesArray, sortType) => {
        if (!Array.isArray(vehiclesArray)) return [];

        return [...vehiclesArray].sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    // Sort by creation date (newest first)
                    const dateA = new Date(a.createdAt || a.updatedAt || 0);
                    const dateB = new Date(b.createdAt || b.updatedAt || 0);
                    return dateB - dateA;

                case 'oldest':
                    // Sort by creation date (oldest first)
                    const oldDateA = new Date(a.createdAt || a.updatedAt || 0);
                    const oldDateB = new Date(b.createdAt || b.updatedAt || 0);
                    return oldDateA - oldDateB;

                case 'price-low':
                    // Sort by price (low to high)
                    return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);

                case 'price-high':
                    // Sort by price (high to low)
                    return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);

                case 'availability':
                    // Sort by availability (available first, then by number of booked dates)
                    const aBookedCount = (a.bookedDates || []).length;
                    const bBookedCount = (b.bookedDates || []).length;
                    const aSoldOut = a.soldOut || false;
                    const bSoldOut = b.soldOut || false;

                    // Sold out items go last
                    if (aSoldOut && !bSoldOut) return 1;
                    if (!aSoldOut && bSoldOut) return -1;

                    // Among available items, sort by fewer booked dates first
                    return aBookedCount - bBookedCount;

                default:
                    return 0;
            }
        });
    }, []);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const response = await getAllVehicles(category);
                const allVehicles = response.data || [];

                // Apply default sorting (newest first)
                const sortedVehicles = sortVehicles(allVehicles, 'newest');

                setVehicles(sortedVehicles);
                setFilteredVehicles(sortedVehicles);
                setShowAll(false);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                setVehicles([]);
                setFilteredVehicles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [category, sortVehicles]);

    const handleSearch = useCallback(({ location, category: searchCategory, min, max }) => {
        const filtered = vehicles.filter(vehicle => {
            const matchLocation = location ? vehicle.location.toLowerCase().includes(location.toLowerCase()) : true;
            const matchCategory = searchCategory ? vehicle.category === searchCategory : true;
            const matchMin = min ? Number(vehicle.price) >= Number(min) : true;
            const matchMax = max ? Number(vehicle.price) <= Number(max) : true;
            return matchLocation && matchCategory && matchMin && matchMax;
        });

        // Apply current sorting to filtered results
        const sortedFiltered = sortVehicles(filtered, sortBy);
        setFilteredVehicles(sortedFiltered);
        setShowAll(false);
    }, [vehicles, sortBy, sortVehicles]);

    // Handle sort change
    const handleSortChange = useCallback((newSortBy) => {
        setSortBy(newSortBy);
        const sortedVehicles = sortVehicles(filteredVehicles, newSortBy);
        setFilteredVehicles(sortedVehicles);
        setShowAll(false);
    }, [filteredVehicles, sortVehicles]);

    const displayedVehicles = useMemo(() => {
        if (!Array.isArray(filteredVehicles)) return [];
        return showAll ? filteredVehicles : filteredVehicles.slice(0, INITIAL_DISPLAY_COUNT);
    }, [filteredVehicles, showAll]);

    const handleToggleView = useCallback(() => {
        setShowAll(prev => !prev);
        if (showAll) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        }
    }, [showAll]);

    const shouldShowToggleButton =
        Array.isArray(filteredVehicles) && filteredVehicles.length > INITIAL_DISPLAY_COUNT;
    const remainingItemsCount =
        Array.isArray(filteredVehicles) ? filteredVehicles.length - INITIAL_DISPLAY_COUNT : 0;

    // Calculate statistics (only for admin)
    const stats = useMemo(() => {
        if (!Array.isArray(filteredVehicles) || !isAdmin) return { total: 0, available: 0, soldOut: 0, partiallyBooked: 0 };

        return filteredVehicles.reduce((acc, vehicle) => {
            acc.total++;
            if (vehicle.soldOut) {
                acc.soldOut++;
            } else if ((vehicle.bookedDates || []).length > 0) {
                acc.partiallyBooked++;
            } else {
                acc.available++;
            }
            return acc;
        }, { total: 0, available: 0, soldOut: 0, partiallyBooked: 0 });
    }, [filteredVehicles, isAdmin]);

    if (loading) return <Loader />;

    return (
        <Container>
            <SearchBar onSearch={handleSearch} />

            {Array.isArray(filteredVehicles) && filteredVehicles.length > 0 ? (
                <div className="pt-12 flex flex-col items-center gap-6">
                    {/* Stats and Sort Controls */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        {/* Statistics - Only visible to admins */}
                        {isAdmin && (
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    Total: {stats.total}
                                </span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                    Available: {stats.available}
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                                    Partially Booked: {stats.partiallyBooked}
                                </span>
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                    Sold Out: {stats.soldOut}
                                </span>
                            </div>
                        )}

                        {/* Sort Controls */}
                        <div className="flex items-center gap-3">
                            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                                Sort by:
                            </label>
                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="availability">Most Available</option>
                            </select>
                        </div>
                    </div>

                    {/* Admin Badge (optional - to show admin is logged in) */}
                    {isAdmin && (
                        <div className="w-full mb-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                                Admin View
                            </span>
                        </div>
                    )}

                    {/* Vehicles Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                        {displayedVehicles.map((vehicle, index) => (
                            <Card key={vehicle._id} vehicle={vehicle} priority={index < 4} />
                        ))}
                    </div>

                    {/* Toggle View Button */}
                    {shouldShowToggleButton && (
                        <div className="flex flex-col items-center gap-3">
                            {!showAll && (
                                <div className="text-sm text-gray-500 text-center">
                                    Showing {displayedVehicles.length} of {filteredVehicles.length} vehicles
                                </div>
                            )}

                            <button
                                onClick={handleToggleView}
                                className="group relative px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out border-2 border-transparent hover:border-gray-300"
                                aria-label={showAll ? "Show fewer vehicles" : `Show ${remainingItemsCount} more vehicles`}
                            >
                                <span className="flex items-center gap-2">
                                    {showAll ? (
                                        <>
                                            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            View Less
                                        </>
                                    ) : (
                                        <>
                                            View All ({remainingItemsCount} more)
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    )}

                    {showAll && (
                        <div className="text-center text-gray-600 text-sm">
                            Showing all {filteredVehicles.length} vehicles
                            {category && ` in ${category}`}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No vehicles found</h2>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Vehicles;