import axiosSecure from ".";

// Payment Intent Here
export const createPaymentIntent = async (price) => {
  try {
    const { data } = await axiosSecure.post("/create-payment-intent", price);
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// Saving Booking Info in DB
export const saveBookingInfo = async (paymentInfo) => {
  try {
    const { data } = await axiosSecure.post("/bookings", paymentInfo);
    return data;
  } catch (error) {
    console.error("Error saving booking info:", error);
    throw error;
  }
};

//  Update Booking Status after booking a vehicle
export const updateStatus = async (id, status) => {
  try {
    const { data } = await axiosSecure.patch(`/vehicles/status/${id}`, {
      status,
    });
    return data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

// Get All Bookings for a guest
export const getBookings = async (email) => {
  try {
    const { data } = await axiosSecure(`/bookings?email=${email}`);
    return data;
  } catch (error) {
    console.error("Error getting guest bookings:", error);
    throw error;
  }
};
export const getAdminBookings = async () => {
  const { data } = await axiosSecure.get(`/bookings/admin`);
  return data;
};

export const updateBooking = async (id, updatedData) => {
  const { data } = await axiosSecure.put(`/bookings/${id}`, updatedData);
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await axiosSecure.delete(`/bookings/${id}`);
  return data;
};

// For host
export const getHostBookings = async (email) => {
  try {
    const { data } = await axiosSecure(`/bookings/host?email=${email}`);
    return data;
  } catch (error) {
    console.error("Error getting host bookings:", error);
    throw error;
  }
};

// Get deleted/cancelled bookings (admin)
export const getDeletedBookings = async () => {
  try {
    const { data } = await axiosSecure.get("/bookings/admin/deleted");
    return data;
  } catch (error) {
    console.error("Error getting deleted bookings:", error);
    throw error;
  }
};

// Soft delete booking (admin)
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

// Restore booking (admin)
export const restoreBooking = async (id) => {
  try {
    const { data } = await axiosSecure.patch(`/bookings/admin/restore/${id}`);
    return data;
  } catch (error) {
    console.error("Error restoring booking:", error);
    throw error;
  }
};

// Permanently delete booking (admin)
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
// Delete a booking
export const deleteBooking = async (id) => {
  try {
    const { data } = await axiosSecure.delete(`/bookings/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

// import axiosSecure from ".";

// // Payment Intent Here
// export const createPaymentIntent = async (price) => {
//   const { data } = await axiosSecure.post("/create-payment-intent", price);
//   return data;
// };

// // Saving Booking Info in DB
// export const saveBookingInfo = async (paymentInfo) => {
//   const { data } = await axiosSecure.post("/bookings", paymentInfo);
//   return data;
// };

// //  Update Booking Status after booking a vehicle
// export const updateStatus = async (id, status) => {
//   const { data } = await axiosSecure.patch(`/vehicles/status/${id}`, { status });
//   return data;
// };

// // Get All Bookings for a guest

// export const getBookings = async (email) => {
//   const { data } = await axiosSecure(`/bookings?email=${email}`);
//   return data;
// };
// // For host
// export const getHostBookings = async (email) => {
//   const { data } = await axiosSecure(`/bookings/host?email=${email}`);
//   return data;
// };
// // delete a booking
// export const deleteBooking = async id => {
//   const { data } = await axiosSecure.delete(`/bookings/${id}`)
//   return data
// }
