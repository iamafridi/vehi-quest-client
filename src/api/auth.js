import axiosSecure from ".";

// Saving User Data In the database
export const saveUser = async (user) => {
  try {
    const currentUser = {
      email: user.email,
      role: "guest",
      status: "Verified",
    };
    const { data } = await axiosSecure.put(
      `/users/${user?.email}`,
      currentUser
    );
    return data;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// Getting token from Server
export const getToken = async (email) => {
  try {
    const { data } = await axiosSecure.put(`/jwt`, { email });
    console.log("Token Received Successfully =", data);
    return data;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

// Clearing Token From Browser
export const clearCookie = async () => {
  try {
    const { data } = await axiosSecure.get("/logout");
    return data;
  } catch (error) {
    console.error("Error clearing cookie:", error);
    throw error;
  }
};

// Get User Role
export const getRole = async (email) => {
  try {
    const { data } = await axiosSecure(`/user/${email}`);
    return data.role;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const { data } = await axiosSecure("/users");
    return data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

// Updating user Role
export const updateRole = async ({ email, role }) => {
  try {
    const currentUser = {
      email,
      role,
      status: "Verified",
    };
    const { data } = await axiosSecure.put(
      `/users/update/${email}`,
      currentUser
    );
    return data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// Become A Host
export const becomeHost = async (email) => {
  try {
    const currentUser = {
      email,
      status: "Requested",
    };
    const { data } = await axiosSecure.put(`/users/${email}`, currentUser);
    return data;
  } catch (error) {
    console.error("Error becoming host:", error);
    throw error;
  }
};

// import axiosSecure from ".";
// // Saving User Data In the database
// export const saveUser = async (user) => {
//   const currentUser = {
//     email: user.email,
//     role: "guest",
//     status: "Verified",
//   };
//   const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

//   return data;
// };

// // Getting token from Server
// export const getToken = async (email) => {
//   const { data } = await axiosSecure.put(`/jwt`, { email });
//   console.log("Token Received Successfully =", data);
//   return data;
// };

// // Clearing Token From Browser
// export const clearCookie = async () => {
//   const { data } = await axiosSecure.get("/logout");
//   return data;
// };

// // Get User Role
// export const getRole = async (email) => {
//   const { data } = await axiosSecure(`/user/${email}`);
//   return data.role;
// };

// // Get All Users
// export const getAllUsers = async () => {
//   const { data } = await axiosSecure("/users");
//   return data;
// };

// // Updating user Role
// export const updateRole = async ({ email, role }) => {
//   const currentUser = {
//     email,
//     role,
//     status: "Verified",
//   };
//   const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser);

//   return data;
// };

// // Become A Host
// export const becomeHost = async (email) => {
//   const currentUser = {
//     email,
//     status: "Requested",
//   };
//   const { data } = await axiosSecure.put(`/users/${email}`, currentUser);
//   return data;
// };
