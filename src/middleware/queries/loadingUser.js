import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const loadingUser = async () => {
  let response;
  await auth().onAuthStateChanged(function (user) {
    if (user) {
      response = user;
    } else {
      response = null;
    }
  });
  return response;
};

export const logoutSignInUser = async () => {
  auth()
    .signOut()
    .then(() => {
      console.log('Successfully Logout');
    })
    .catch((e) => {
      throw new Error('Unable to logout.');
    });
};
