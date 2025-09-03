import axiosSecure from ".";

// Fetch all vehicles from DB with optional category filtering
export const getAllVehicles = async (category = null) => {
  try {
    let url = "/vehicles";
    if (category && category !== "all") {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const { data } = await axiosSecure(url);
    return data;
  } catch (error) {
    console.error("Error getting all vehicles:", error);
    throw error;
  }
};

// Fetch all Vehicle for host (FIXED ENDPOINT)
export const getHostVehicles = async (email) => {
  try {
    const { data } = await axiosSecure(`/vehicles/host/${email}`);
    return data;
  } catch (error) {
    console.error("Error getting host vehicles:", error);
    throw error;
  }
};

// Fetch Single Vehicle from DB
export const getVehicle = async (id) => {
  try {
    const { data } = await axiosSecure(`/vehicle/${id}`);
    return data;
  } catch (error) {
    console.error("Error getting single vehicle:", error);
    throw error;
  }
};

// Save Vehicle Data in db
export const addVehicle = async (vehicleData) => {
  try {
    const { data } = await axiosSecure.post(`/vehicles`, vehicleData);
    return data;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
  try {
    console.log("Deleting vehicle with ID:", id);
    const response = await axiosSecure.delete(`/vehicles/${id}`);
    console.log("Vehicle deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting vehicle:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a vehicle
export const updateVehicle = async (id, vehicleData) => {
  try {
    console.log("Updating vehicle with ID:", id, "Data:", vehicleData);
    const response = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
    console.log("Vehicle updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating vehicle:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get single vehicle for editing
export const getVehicleById = async (id) => {
  try {
    const response = await axiosSecure.get(`/vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting vehicle:",
      error.response?.data || error.message
    );
    throw error;
  }
};
