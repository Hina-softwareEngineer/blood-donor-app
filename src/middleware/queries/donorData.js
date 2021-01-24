import database from '@react-native-firebase/database';

export const addDonorData = async (data) => {
  const newRef = await database().ref('/donor').push();
  let response = newRef
    .set({
      ...data,
      _id: newRef.key,
    })
    .then((res) => {
      console.log('res, Success');
    })
    .catch((e) => console.log('fail'));

  console.log('response in daata-->', response);
  return response;
};

export const updateDonorData = async (id, data) => {
  await database()
    .ref(`/donor/${id}`)
    .update({
      ...data,
    });
};

export const getUserMedicalData = async (userId) => {
  let response;
  let a = await database()
    .ref(`/donor`)
    .orderByChild('userId')
    .equalTo(userId)
    .on(
      'value',
      await function (snapshot) {
        console.log('snapshot of get user', snapshot.val());
        response = snapshot.val();
        return snapshot.val();
      },
    );
  console.log('--res', a, response);
  return response;
};

export const getAllDonors = async (userId) => {
  await database()
    .ref(`/donor`)
    .orderByKey('isAvailable')
    .equalTo(true)
    .on('child_changed', function (snapshot) {
      console.log('snapshot', snapshot);
    });
};
