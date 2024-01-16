import axiosSecure from ".";

// Payment Intent Here
export const createPaymentIntent = async (price) => {
  const { data } = await axiosSecure.post("/create-payment-intent", price);
  return data;
};

// Saving Booking Info in DB
export const saveBookingInfo = async (paymentInfo) => {
  const { data } = await axiosSecure.post("/bookings", paymentInfo);
  return data;
};

//  Update Booking Status after booking a vehicle
export const updateStatus = async (id, status) => {
  const { data } = await axiosSecure.patch(`/rooms/status/${id}`, { status });
  return data;
};
