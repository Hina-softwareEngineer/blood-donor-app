import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const signUpUser = async (email, password, phone, userName) => {
  let response = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      let data = {
        userName,
        email,
        phone,
      };

      await database()
        .ref(`/users/${res.user.uid}`)
        .set({
          ...data,
        });
      return res.user;
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }
      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }
    });
  return response;
};
