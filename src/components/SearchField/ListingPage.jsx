import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const ListingsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();
    const categoryParam = params.get("category") || ""; // read selected category from URL

    const fetchVehicles = async (searchParams) => {
        setLoading(true);
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await fetch(`http://localhost:5000/vehicles/search?${query}`);
            const data = await res.json();
            setResults(data.data || []);
        } catch (err) {
            console.error("Error fetching vehicles:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Run search whenever category changes
    useEffect(() => {
        // Only search if category or other params exist
        if (categoryParam) {
            fetchVehicles({ category: categoryParam });
        } else {
            setResults([]); // initially empty
        }
    }, [categoryParam]);

    return (
        <div className="p-6">
            {/* SearchBar can still filter by location and range */}
            <SearchBar
                onResults={(data) => setResults(data)}
                defaultCategory={categoryParam} // optional: pre-fill category
            />

            {loading ? (
                <p className="mt-4 text-center">Searching vehicles...</p>
            ) : results.length === 0 ? (
                <p className="mt-4 text-center">No vehicles found.</p>
            ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((item) => (
                        <div key={item._id} className="border p-4 rounded">
                            <h2 className="font-bold">{item.title}</h2>
                            <p>Location: {item.location}</p>
                            <p>Category: {item.category}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListingsPage;
