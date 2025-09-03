import { useEffect, useState, useMemo, useCallback } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";
import Loader from "../Shared/Loader";
import { getAllVehicles } from "../../api/vehicles";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]); // always keep as []
    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const category = params.get("category");

    // Constants
    const INITIAL_DISPLAY_COUNT = 4;

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                console.log("Fetching vehicles for category:", category);

                const response = await getAllVehicles(category);
                console.log("Full API response:", response);

                // ✅ FIX: Access the data property from the response
                // Your backend returns: { message: "...", data: [...], count: ... }
                const vehiclesData = response.data || [];
                console.log("Vehicles data:", vehiclesData);

                // ✅ Ensure the response is an array
                const validData = Array.isArray(vehiclesData) ? vehiclesData : [];
                console.log("Valid data length:", validData.length);

                // ✅ REMOVED CLIENT-SIDE FILTERING since backend now handles it
                // The backend already filters by category if provided
                setVehicles(validData);
                setShowAll(false);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                setVehicles([]); // fallback to []
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [category]);

    // ✅ Safe slicing
    const displayedVehicles = useMemo(() => {
        if (!Array.isArray(vehicles)) return [];
        return showAll ? vehicles : vehicles.slice(0, INITIAL_DISPLAY_COUNT);
    }, [vehicles, showAll]);

    const handleToggleView = useCallback(() => {
        setShowAll(prev => !prev);

        if (showAll) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        }
    }, [showAll]);

    const shouldShowToggleButton = Array.isArray(vehicles) && vehicles.length > INITIAL_DISPLAY_COUNT;
    const remainingItemsCount = Array.isArray(vehicles) ? vehicles.length - INITIAL_DISPLAY_COUNT : 0;

    // Debug logging
    console.log("Current state:", {
        vehicles: vehicles.length,
        category,
        loading,
        displayedVehicles: displayedVehicles.length
    });

    if (loading) return <Loader />;

    return (
        <Container>
            {/* Debug - testing */}
            {/* {process.env.NODE_ENV === 'development' && (
                <div className="mb-4 p-4 just bg-yellow-100 rounded">
                    <p>Debug: Found {vehicles.length} vehicles</p>
                    <p>Category: {category || 'All'}</p>
                    <p>Displaying: {displayedVehicles.length}</p>
                </div>
            )} */}

            {Array.isArray(vehicles) && vehicles.length > 0 ? (
                <div className="pt-12 flex flex-col items-center gap-10">
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
                        {displayedVehicles.map((vehicle, index) => (
                            <Card
                                key={vehicle._id}
                                vehicle={vehicle}
                                priority={index < 4}
                            />
                        ))}
                    </div>

                    {/* Toggle Button */}
                    {shouldShowToggleButton && (
                        <div className="flex flex-col items-center gap-3">
                            {!showAll && (
                                <div className="text-sm text-gray-500 text-center">
                                    Showing {displayedVehicles.length} of {vehicles.length} vehicles
                                </div>
                            )}

                            <button
                                onClick={handleToggleView}
                                className="group relative px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out border-2 border-transparent hover:border-gray-300"
                                aria-label={showAll ? "Show fewer vehicles" : `Show ${remainingItemsCount} more vehicle${remainingItemsCount !== 1 ? "s" : ""}`}
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
                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                            </button>
                        </div>
                    )}

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
                        title={category ? `No ${category} Vehicles Available` : "No Vehicles Available"}
                        subtitle={"Please check back later or select a different category"}
                    />
                </div>
            )}
        </Container>
    );
};

export default Vehicles;