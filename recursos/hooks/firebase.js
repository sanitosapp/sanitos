import { firebase } from "../utils/firebase";

const db = firebase.firestore();

const saveTokenPhone = async (token, uid) => {
  let phoneTokens = [];
  try {
    console.log(token, uid);
    const PhoneTokenRef = db
      .collection("usuarios")
      .doc(uid)
      .collection("phoneTokens");

    const tokens = await PhoneTokenRef.where("phoneToken", "==", token).get();

    tokens.forEach((doc) => {
      phoneTokens.push({ ...doc.data() });
    });
    if (phoneTokens.length === 0) {
      await PhoneTokenRef.add({
        phoneToken: token,
      });
      console.log("Exito");
    }
  } catch (error) {
    console.log("Error");
  }
};

export { saveTokenPhone };
