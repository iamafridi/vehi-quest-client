import axiosSecure from ".";

// Fetch all vehicle from DB
export const getAllVehicles = async () => {
  try {
    const { data } = await axiosSecure("/vehicles");
    return data;
  } catch (error) {
    console.error("Error getting all vehicles:", error);
    throw error;
  }
};

// Fetch all Vehicle for host
export const getHostVehicles = async (email) => {
  try {
    const { data } = await axiosSecure(`/vehicles/${email}`);
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

// Add these functions to your api/vehicles.js file

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

// Get single vehicle for editing (if you don't have this already)
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

// // Delete a Vehicle
// export const deleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(`/vehicles/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error deleting vehicle:", error);
//     throw error;
//   }
// };

// // Update a vehicle
// export const updateVehicle = async (vehicleData, id) => {
//   try {
//     const { data } = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle:", error);
//     throw error;
//   }
// };

// import axiosSecure from ".";

// // Fetch all vehicle from DB
// export const getAllVehicles = async () => {
//   const { data } = await axiosSecure("/vehicles");
//   return data;
// };

// // Fetch all Vehicle for host
// export const getHostVehicles = async (email) => {
//   const { data } = await axiosSecure(`/vehicles/${email}`);
//   return data;
// };

// // Fetch Single Vehicle from DB
// export const getVehicle = async (id) => {
//   const { data } = await axiosSecure(`/vehicle/${id}`);
//   return data;
// };

// // Save Vehicle Data in db
// export const addVehicle = async (vehicleData) => {
//   const { data } = await axiosSecure.post(`/vehicles`, vehicleData);
//   return data;
// };
// // Delete a Vehicle
// export const deleteVehicle = async id => {
//   const { data } = await axiosSecure.delete(`/vehicles/${id}`)
//   return data
// }
// // update a vehicle
// export const updateVehicle = async (vehicleData, id) => {
//   const { data } = await axiosSecure.put(`/vehicles/${id}`, vehicleData)
//   return data
// }
