import axiosSecure from ".";

// Fetch all vehicles from DB with optional category filtering (only active vehicles)
export const getAllVehicles = async (category = null) => {
  try {
    let url = "/vehicles";
    if (category && category !== "all") {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const { data } = await axiosSecure.get(url);
    return data;
  } catch (error) {
    console.error("Error getting all vehicles:", error);
    throw error;
  }
};

// Fetch vehicles for a specific host (by email query param)
export const getHostVehicles = async (email) => {
  try {
    const { data } = await axiosSecure.get("/vehicles");
    return (data.data || []).filter((v) => v.host?.email === email);
  } catch (error) {
    console.error("Error getting host vehicles:", error);
    throw error;
  }
};

// Fetch Single Vehicle from DB
export const getVehicleById = async (id) => {
  try {
    const { data } = await axiosSecure.get(`/vehicle/${id}`);
    return data;
  } catch (error) {
    console.error("Error getting vehicle:", error);
    throw error;
  }
};

// Save Vehicle Data in db (status will be pending by default)
export const addVehicle = async (vehicleData) => {
  try {
    // Ensure vehicle is created with pending status
    const vehicleWithStatus = {
      ...vehicleData,
      status: "pending", // This ensures new vehicles need admin approval
    };

    const { data } = await axiosSecure.post("/vehicles", vehicleWithStatus);
    return data;
  } catch (error) {
    console.error("Error adding vehicle:", error);
    throw error;
  }
};

// Delete a vehicle (regular delete for hosts)
export const deleteVehicle = async (id) => {
  try {
    const { data } = await axiosSecure.delete(`/vehicles/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

// Update a vehicle (regular update for hosts)
export const updateVehicle = async (id, vehicleData) => {
  try {
    const { data } = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
    return data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

// Get all vehicles for admin (with optional status filter)
export const getAdminVehicles = async (status = "active") => {
  try {
    const { data } = await axiosSecure.get(`/vehicles/admin?status=${status}`);
    return data;
  } catch (error) {
    console.error("Error getting admin vehicles:", error);
    throw error;
  }
};

// Get all pending vehicles (for admin approval)
// export const getPendingVehicles = async () => {
//   try {
//     const { data } = await axiosSecure.get("/vehicles/pending");
//     return data;
//   } catch (error) {
//     console.error("Error getting pending vehicles:", error);
//     throw error;
//   }
// };

export const getPendingVehicles = async () => {
  try {
    const { data } = await axiosSecure.get("/vehicles/admin?status=pending");
    return data;
  } catch (error) {
    console.error("Error getting pending vehicles:", error);
    throw error;
  }
};

// // Approve a vehicle (admin) - FIXED ENDPOINT
// export const approveVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/admin/approve/${id}`, {
//       status: "active",
//     });
//     return data;
//   } catch (error) {
//     console.error("Error approving vehicle:", error);
//     throw error;
//   }
// };

// // Update vehicle by admin
// export const updateVehicleByAdmin = async (id, vehicleData) => {
//   try {
//     const { data } = await axiosSecure.put(
//       `/vehicles/admin/${id}`,
//       vehicleData
//     );
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle by admin:", error);
//     throw error;
//   }
// };

// // Soft delete vehicle (admin)
// export const softDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/vehicles/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting vehicle:", error);
//     throw error;
//   }
// };

// Approve a vehicle (admin) - FIXED
export const approveVehicle = async (id) => {
  try {
    const { data } = await axiosSecure.put(`/vehicles/admin/${id}`, {
      status: "active",
    });
    return data;
  } catch (error) {
    console.error("Error approving vehicle:", error);
    throw error;
  }
};

// Update vehicle by admin (this should already work)
export const updateVehicleByAdmin = async (id, vehicleData) => {
  try {
    const { data } = await axiosSecure.put(
      `/vehicles/admin/${id}`,
      vehicleData
    );
    return data;
  } catch (error) {
    console.error("Error updating vehicle by admin:", error);
    throw error;
  }
};

// Soft delete vehicle (admin) (this should already work)
export const softDeleteVehicle = async (id) => {
  try {
    const { data } = await axiosSecure.patch(
      `/vehicles/admin/soft-delete/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error soft deleting vehicle:", error);
    throw error;
  }
};

// Restore deleted vehicle (admin)
export const restoreVehicle = async (id) => {
  try {
    const { data } = await axiosSecure.patch(`/vehicles/admin/restore/${id}`);
    return data;
  } catch (error) {
    console.error("Error restoring vehicle:", error);
    throw error;
  }
};

// Permanently delete vehicle (admin)
export const permanentDeleteVehicle = async (id) => {
  try {
    const { data } = await axiosSecure.delete(
      `/vehicles/admin/permanent/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error permanently deleting vehicle:", error);
    throw error;
  }
};

// Booking Admin Utilities
export const getDeletedBookings = async () => {
  try {
    const { data } = await axiosSecure.get("/bookings/admin/deleted");
    return data;
  } catch (error) {
    console.error("Error getting deleted bookings:", error);
    throw error;
  }
};

export const softDeleteBooking = async (id) => {
  try {
    const { data } = await axiosSecure.patch(
      `/bookings/admin/soft-delete/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error soft deleting booking:", error);
    throw error;
  }
};

export const restoreBooking = async (id) => {
  try {
    const { data } = await axiosSecure.patch(`/bookings/admin/restore/${id}`);
    return data;
  } catch (error) {
    console.error("Error restoring booking:", error);
    throw error;
  }
};

export const permanentDeleteBooking = async (id) => {
  try {
    const { data } = await axiosSecure.delete(
      `/bookings/admin/permanent/${id}`
    );
    return data;
  } catch (error) {
    console.error("Error permanently deleting booking:", error);
    throw error;
  }
};

// import axiosSecure from ".";

// // Fetch all vehicles from DB with optional category filtering (only active vehicles)
// export const getAllVehicles = async (category = null) => {
//   try {
//     let url = "/vehicles";
//     if (category && category !== "all") {
//       url += `?category=${encodeURIComponent(category)}`;
//     }
//     const { data } = await axiosSecure.get(url);
//     return data;
//   } catch (error) {
//     console.error("Error getting all vehicles:", error);
//     throw error;
//   }
// };

// // Fetch vehicles for a specific host (by email query param)
// export const getHostVehicles = async (email) => {
//   try {
//     const { data } = await axiosSecure.get("/vehicles");
//     return (data.data || []).filter((v) => v.host?.email === email);
//   } catch (error) {
//     console.error("Error getting host vehicles:", error);
//     throw error;
//   }
// };

// // Fetch Single Vehicle from DB
// export const getVehicleById = async (id) => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicle/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting vehicle:", error);
//     throw error;
//   }
// };

// // Save Vehicle Data in db (status will be pending)
// export const addVehicle = async (vehicleData) => {
//   try {
//     const { data } = await axiosSecure.post("/vehicles", vehicleData);
//     return data;
//   } catch (error) {
//     console.error("Error adding vehicle:", error);
//     throw error;
//   }
// };

// // Delete a vehicle
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
// export const updateVehicle = async (id, vehicleData) => {
//   try {
//     const { data } = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle:", error);
//     throw error;
//   }
// };

// // Get all vehicles for admin (with optional status filter)
// export const getAdminVehicles = async (status = "active") => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicles/admin?status=${status}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting admin vehicles:", error);
//     throw error;
//   }
// };

// // Get all pending vehicles (for admin approval)
// export const getPendingVehicles = async () => {
//   try {
//     const { data } = await axiosSecure.get("/vehicles/pending");
//     return data;
//   } catch (error) {
//     console.error("Error getting pending vehicles:", error);
//     throw error;
//   }
// };

// // Approve a vehicle (admin)
// export const approveVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/admin/approve/${id}`, {
//       status: "active",
//     });
//     return data;
//   } catch (error) {
//     console.error("Error approving vehicle:", error);
//     throw error;
//   }
// };

// // Update vehicle by admin
// export const updateVehicleByAdmin = async (id, vehicleData) => {
//   try {
//     const { data } = await axiosSecure.put(
//       `/vehicles/admin/${id}`,
//       vehicleData
//     );
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle by admin:", error);
//     throw error;
//   }
// };

// // Soft delete vehicle (admin)
// export const softDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/vehicles/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting vehicle:", error);
//     throw error;
//   }
// };

// // Restore deleted vehicle (admin)
// export const restoreVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/admin/restore/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error restoring vehicle:", error);
//     throw error;
//   }
// };

// // Permanently delete vehicle (admin)
// export const permanentDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(
//       `/vehicles/admin/permanent/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error permanently deleting vehicle:", error);
//     throw error;
//   }
// };

// // Booking Admin Utilities
// export const getDeletedBookings = async () => {
//   try {
//     const { data } = await axiosSecure.get("/bookings/admin/deleted");
//     return data;
//   } catch (error) {
//     console.error("Error getting deleted bookings:", error);
//     throw error;
//   }
// };

// export const softDeleteBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/bookings/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting booking:", error);
//     throw error;
//   }
// };

// export const restoreBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/bookings/admin/restore/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error restoring booking:", error);
//     throw error;
//   }
// };

// export const permanentDeleteBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(
//       `/bookings/admin/permanent/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error permanently deleting booking:", error);
//     throw error;
//   }
// };

// import axiosSecure from ".";

// // Fetch all vehicles from DB with optional category filtering
// export const getAllVehicles = async (category = null) => {
//   try {
//     let url = "/vehicles";
//     if (category && category !== "all") {
//       url += `?category=${encodeURIComponent(category)}`;
//     }
//     const { data } = await axiosSecure(url);
//     return data;
//   } catch (error) {
//     console.error("Error getting all vehicles:", error);
//     throw error;
//   }
// };

// // Fetch all Vehicle for host (FIXED ENDPOINT)
// // export const getHostVehicles = async (email) => {
// //   try {
// //     const { data } = await axiosSecure(`/vehicles/host/${email}`);
// //     return data;
// //   } catch (error) {
// //     console.error("Error getting host vehicles:", error);
// //     throw error;
// //   }
// // };
// // Fetch vehicles for a specific host (by email query param)
// export const getHostVehicles = async (email) => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicles`);
//     // Filter only the ones belonging to this host
//     return (data.data || []).filter((v) => v.host?.email === email);
//   } catch (error) {
//     console.error("Error getting host vehicles:", error);
//     throw error;
//   }
// };

// // Fetch Single Vehicle from DB
// export const getVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure(`/vehicle/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting single vehicle:", error);
//     throw error;
//   }
// };

// // Save Vehicle Data in db
// export const addVehicle = async (vehicleData) => {
//   try {
//     const { data } = await axiosSecure.post(`/vehicles`, vehicleData);
//     return data;
//   } catch (error) {
//     console.error("Error adding vehicle:", error);
//     throw error;
//   }
// };

// // Delete a vehicle
// export const deleteVehicle = async (id) => {
//   try {
//     console.log("Deleting vehicle with ID:", id);
//     const response = await axiosSecure.delete(`/vehicles/${id}`);
//     console.log("Vehicle deleted:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error deleting vehicle:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // Update a vehicle
// export const updateVehicle = async (id, vehicleData) => {
//   try {
//     console.log("Updating vehicle with ID:", id, "Data:", vehicleData);
//     const response = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
//     console.log("Vehicle updated:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error updating vehicle:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };
// // Get all vehicles for admin (with status filter)
// export const getAdminVehicles = async (status = "active") => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicles/admin?status=${status}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting admin vehicles:", error);
//     throw error;
//   }
// };

// // Update vehicle by admin
// export const updateVehicleByAdmin = async (id, vehicleData) => {
//   try {
//     const { data } = await axiosSecure.put(
//       `/vehicles/admin/${id}`,
//       vehicleData
//     );
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle by admin:", error);
//     throw error;
//   }
// };

// // Soft delete vehicle (admin)
// export const softDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/vehicles/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting vehicle:", error);
//     throw error;
//   }
// };

// // Restore deleted vehicle (admin)
// export const restoreVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/admin/restore/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error restoring vehicle:", error);
//     throw error;
//   }
// };

// // Permanently delete vehicle (admin)
// export const permanentDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(
//       `/vehicles/admin/permanent/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error permanently deleting vehicle:", error);
//     throw error;
//   }
// };

// // Get deleted/cancelled bookings (admin)
// export const getDeletedBookings = async () => {
//   try {
//     const { data } = await axiosSecure.get("/bookings/admin/deleted");
//     return data;
//   } catch (error) {
//     console.error("Error getting deleted bookings:", error);
//     throw error;
//   }
// };

// // Soft delete booking (admin)
// export const softDeleteBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/bookings/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting booking:", error);
//     throw error;
//   }
// };

// // Restore booking (admin)
// export const restoreBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/bookings/admin/restore/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error restoring booking:", error);
//     throw error;
//   }
// };

// // Permanently delete booking (admin)
// export const permanentDeleteBooking = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(
//       `/bookings/admin/permanent/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error permanently deleting booking:", error);
//     throw error;
//   }
// };

// // Fetch all vehicles from DB with optional category filtering
// export const getAllVehicles = async (category = null) => {
//   try {
//     let url = "/vehicles";
//     if (category && category !== "all") {
//       url += `?category=${encodeURIComponent(category)}`;
//     }
//     const { data } = await axiosSecure(url);
//     return data;
//   } catch (error) {
//     console.error("Error getting all vehicles:", error);
//     throw error;
//   }
// };

// // Fetch all Vehicle for host (FIXED ENDPOINT)
// // export const getHostVehicles = async (email) => {
// //   try {
// //     const { data } = await axiosSecure(`/vehicles/host/${email}`);
// //     return data;
// //   } catch (error) {
// //     console.error("Error getting host vehicles:", error);
// //     throw error;
// //   }
// // };
// // Fetch vehicles for a specific host (by email query param)
// export const getHostVehicles = async (email) => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicles`);
//     // Filter only the ones belonging to this host
//     return (data.data || []).filter((v) => v.host?.email === email);
//   } catch (error) {
//     console.error("Error getting host vehicles:", error);
//     throw error;
//   }
// };

// // Fetch Single Vehicle from DB
// export const getVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure(`/vehicle/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting single vehicle:", error);
//     throw error;
//   }
// };

// // Save Vehicle Data in db
// export const addVehicle = async (vehicleData) => {
//   try {
//     const { data } = await axiosSecure.post(`/vehicles`, vehicleData);
//     return data;
//   } catch (error) {
//     console.error("Error adding vehicle:", error);
//     throw error;
//   }
// };

// // Delete a vehicle
// export const deleteVehicle = async (id) => {
//   try {
//     console.log("Deleting vehicle with ID:", id);
//     const response = await axiosSecure.delete(`/vehicles/${id}`);
//     console.log("Vehicle deleted:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error deleting vehicle:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // Update a vehicle
// export const updateVehicle = async (id, vehicleData) => {
//   try {
//     console.log("Updating vehicle with ID:", id, "Data:", vehicleData);
//     const response = await axiosSecure.put(`/vehicles/${id}`, vehicleData);
//     console.log("Vehicle updated:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error updating vehicle:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// // Get All Vehicles for admin (with status filtering)
// export const getAdminVehicles = async (statusFilter) => {
//   try {
//     const { data } = await axiosSecure.get(
//       `/vehicles/admin?status=${statusFilter}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error getting admin vehicles:", error);
//     throw error;
//   }
// };

// // ✅ NEW: Get all pending vehicles
// export const getPendingVehicles = async () => {
//   try {
//     const { data } = await axiosSecure.get("/vehicles/pending");
//     return data;
//   } catch (error) {
//     console.error("Error getting pending vehicles:", error);
//     throw error;
//   }
// };

// // ✅ NEW: Approve a vehicle
// export const approveVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/approve/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error approving vehicle:", error);
//     throw error;
//   }
// };

// // Update vehicle by admin
// export const updateVehicleByAdmin = async (id, vehicleData) => {
//   try {
//     const { data } = await axiosSecure.put(
//       `/vehicles/admin/${id}`,
//       vehicleData
//     );
//     return data;
//   } catch (error) {
//     console.error("Error updating vehicle by admin:", error);
//     throw error;
//   }
// };

// // Soft delete vehicle (admin)
// export const softDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(
//       `/vehicles/admin/soft-delete/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error soft deleting vehicle:", error);
//     throw error;
//   }
// };

// // Restore deleted vehicle (admin)
// export const restoreVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.patch(`/vehicles/admin/restore/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error restoring vehicle:", error);
//     throw error;
//   }
// };

// // Permanently delete vehicle (admin)
// export const permanentDeleteVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.delete(
//       `/vehicles/admin/permanent/${id}`
//     );
//     return data;
//   } catch (error) {
//     console.error("Error permanently deleting vehicle:", error);
//     throw error;
//   }
// };

// // Get single vehicle for editing
// export const getSingleVehicle = async (id) => {
//   try {
//     const { data } = await axiosSecure.get(`/vehicle/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error getting single vehicle:", error);
//     throw error;
//   }
// };
// // Get single vehicle for editing
// export const getVehicleById = async (id) => {
//   try {
//     const response = await axiosSecure.get(`/vehicle/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error getting vehicle:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };
