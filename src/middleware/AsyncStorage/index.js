import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key, value) => {
  try {
    if (value) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.log('error ========>', e);
  }
};

export const storeObject = async (key, value) => {
  try {
    if (value) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.log('error ========>', e);
  }
};

export const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (err) {
    return err;
  }
};

export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    return err;
  }
};
