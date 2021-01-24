import auth from '@react-native-firebase/auth';

export const signInUser = async (email, password) => {
  let response = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      return res.user;
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        return 'User not found!';
      }
      if (error.code === 'auth/wrong-password') {
        return 'Incorrect Password';
      }
    });
  return response;
};
