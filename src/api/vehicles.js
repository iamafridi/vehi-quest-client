import axiosSecure from ".";

// Fetch all vehicle from DB
export const getAllVehicles = async () => {
  const { data } = await axiosSecure("/vehicles");
  return data;
};

// Fetch all Vehicle for host
export const getHostVehicles = async (email) => {
  const { data } = await axiosSecure(`/vehicles/${email}`);
  return data;
};

// Fetch Single Vehicle from DB
export const getVehicle = async (id) => {
  const { data } = await axiosSecure(`/vehicle/${id}`);
  return data;
};

// Save Vehicle Data in db
export const addVehicle = async (vehicleData) => {
  const { data } = await axiosSecure.post(`/vehicles`, vehicleData);
  return data;
};
// Delete a Vehicle
export const deleteVehicle = async id => {
  const { data } = await axiosSecure.delete(`/vehicles/${id}`)
  return data
}
// update a vehicle
export const updateVehicle = async (vehicleData, id) => {
  const { data } = await axiosSecure.put(`/vehicles/${id}`, vehicleData)
  return data
}
