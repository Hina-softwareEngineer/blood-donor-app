import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const signUpUser = (email, password) => {
  let response = auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log('res -->', res);
      return res;
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }

      console.error(error);
    });
  console.log('response', response);
  return response;
};
