import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const signUpUser = async (email, password, phone, userName) => {
  let data = {
    userName,
    email,
    phone,
    isAvailable: false,
  };

  let response = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      console.log('res -->', res.user);

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
