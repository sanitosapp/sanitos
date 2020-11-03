let phoneToken = null;

const setPhoneToken = async (token) => {
  phoneToken = token;
};
const getPhoneToken = () => {
  return phoneToken;
};

export { setPhoneToken, getPhoneToken };
