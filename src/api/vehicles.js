import axiosSecure from ".";

// Fetch all vehicle from DB
export const getAllVehicles = async () => {
  const { data } =await axiosSecure("/vehicles");
  return data;
};

// Fetch Single Vehicle from DB
export const getVehicle = async id => {
    const { data } =await axiosSecure(`/vehicle/${id}`);
    return data;
  };
