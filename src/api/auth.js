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
console.log('Token Received Successfully =' ,data);
  return data;
};

// Clearing Token From Browser
export const clearCookie = async () => {
  const { data } = await axiosSecure.get('/logout' );
  return data;
};
