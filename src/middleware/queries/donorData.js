import database from '@react-native-firebase/database';

export const addDonorData = async (data) => {
  if (data) {
    const newRef = await database().ref('/donor').push();
    let response = await newRef
      .set({
        ...data,
        _id: newRef.key,
      })
      .then((res) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
    return response;
  }
  return false;
};

export const updateDonorData = async (id, data) => {
  let updateRes = await database()
    .ref(`/donor/${id}`)
    .update({
      ...data,
    })
    .then((res) => true)
    .catch((err) => false);
  return updateRes;
};

export const getUserMedicalData = async (userId) => {
  if (userId) {
    let response = await database()
      .ref(`/donor`)
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then((res) => res.val())
      .catch((err) => err);
    return response;
  }
  return null;
};

export const getAllDonors = async () => {
  let response = await database()
    .ref(`/donor`)
    .orderByChild('isAvailable')
    .equalTo(true)
    .once('value')
    .then(async (res) => {
      let values = res.val();
      let dataArray = [];
      if (values) {
        let keys = Object.keys(values);
        if (keys) {
          let allUsers = await database()
            .ref('/users')
            .once('value')
            .then((resp) => {
              return resp.val();
            });

          keys.forEach(async (k) => {
            dataArray.push({...values[k], ...allUsers[values[k]['userId']]});
          });
        }
      }
      return dataArray;
    })
    .catch((err) => err);

  return response;
};

export const getUser = async (userId) => {
  if (userId) {
    let user = await database()
      .ref('/users')
      .orderByKey()
      .equalTo(userId)
      .once('value')
      .then((resp) => {
        return resp.val();
      });
    return user;
  }
  return null;
};
