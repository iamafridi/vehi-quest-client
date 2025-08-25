import { useEffect, useState, useMemo, useCallback } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";
import Loader from "../Shared/Loader";
import { getAllVehicles } from "../../api/vehicles";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const category = params.get("category");

    // Constants for better maintainability
    const INITIAL_DISPLAY_COUNT = 4;
    const LOAD_MORE_COUNT = 6;

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const data = await getAllVehicles();
                const filteredData = category
                    ? data.filter(vehicle => vehicle.category === category)
                    : data;

                setVehicles(filteredData);
                setShowAll(false); // Reset when category changes
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setVehicles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [category]);

    // Memoize displayed vehicles to prevent unnecessary re-renders
    const displayedVehicles = useMemo(() => {
        return showAll ? vehicles : vehicles.slice(0, INITIAL_DISPLAY_COUNT);
    }, [vehicles, showAll]);

    // Optimized toggle function with useCallback
    const handleToggleView = useCallback(() => {
        setShowAll(prev => !prev);

        // Smooth scroll to top when viewing less
        if (showAll) {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [showAll]);

    // Calculate if button should show
    const shouldShowToggleButton = vehicles.length > INITIAL_DISPLAY_COUNT;

    // Calculate remaining items count
    const remainingItemsCount = vehicles.length - INITIAL_DISPLAY_COUNT;

    if (loading) return <Loader />;

    return (
        <Container>
            {vehicles && vehicles.length > 0 ? (
                <div className="pt-12 flex flex-col items-center gap-10">
                    {/* Grid with optimized rendering */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                        {displayedVehicles.map((vehicle, index) => (
                            <Card
                                key={vehicle._id}
                                vehicle={vehicle}
                                priority={index < 4} // Prioritize loading for first 4 items
                            />
                        ))}
                    </div>

                    {/* Enhanced Toggle Button */}
                    {shouldShowToggleButton && (
                        <div className="flex flex-col items-center gap-3">
                            {/* Progress indicator */}
                            {!showAll && (
                                <div className="text-sm text-gray-500 text-center">
                                    Showing {displayedVehicles.length} of {vehicles.length} vehicles
                                </div>
                            )}

                            <button
                                onClick={handleToggleView}
                                className="
                                    group
                                    relative
                                    px-8 
                                    py-3 
                                    bg-gradient-to-r 
                                    from-gray-900 
                                    to-black 
                                    text-white 
                                    rounded-full 
                                    font-medium 
                                    shadow-lg
                                    hover:shadow-xl
                                    hover:scale-105
                                    active:scale-95
                                    transition-all
                                    duration-200
                                    ease-in-out
                                    border-2
                                    border-transparent
                                    hover:border-gray-300
                                "
                                aria-label={showAll ? "Show fewer vehicles" : `Show ${remainingItemsCount} more vehicle${remainingItemsCount !== 1 ? 's' : ''}`}
                            >
                                <span className="flex items-center gap-2">
                                    {showAll ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:-translate-y-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                            View Less
                                        </>
                                    ) : (
                                        <>
                                            View All ({remainingItemsCount} more)
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:translate-y-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </span>

                                {/* Hover effect overlay */}
                                <div className="
                                    absolute 
                                    inset-0 
                                    rounded-full 
                                    bg-white 
                                    opacity-0 
                                    group-hover:opacity-10 
                                    transition-opacity 
                                    duration-200
                                "></div>
                            </button>
                        </div>
                    )}

                    {/* Results summary */}
                    {showAll && (
                        <div className="text-center text-gray-600 text-sm">
                            Showing all {vehicles.length} vehicles
                            {category && ` in ${category}`}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
                    <Heading
                        center={true}
                        title={"Sorry! No Vehicle Available In This Category"}
                        subtitle={"Please Select Other Categories"}
                    />
                </div>
            )}
        </Container>
    );
};

export default Vehicles;