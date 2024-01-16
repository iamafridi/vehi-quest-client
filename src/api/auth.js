import axiosSecure from ".";
// Saving User Data In the database
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "guest",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};

// Getting token from Server
export const getToken = async (email) => {
  const { data } = await axiosSecure.put(`/jwt`, email);
  console.log("Token Received Successfully =", data);
  return data;
};

// Clearing Token From Browser
export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

// Get User Role
export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data.role;
};

// Get All Users
export const getAllUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

// Updating user Role
export const updateRole = async ({ email, role }) => {
  const currentUser = {
    email,
    role,
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser);

  return data;
};

// Become A Host
export const becomeHost = async (email) => {
  const currentUser = {
    email,
    status: "Requested",
  };
  const { data } = await axiosSecure.put(`/users/${email}`, currentUser);
  return data;
};
