import * as React from 'react';
import {Button, Text, Root} from 'native-base';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {changeSearchValue} from '../../redux/actions/searchActions';

export function SearchScr({navigation, changeSearchValue}) {
  return (
    <Root>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('A+');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('A-');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>A-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('B+');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>B+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('B-');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>B-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('AB+');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>AB+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeSearchValue('AB-');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>AB-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              changeSearchValue('O+');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>O+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeSearchValue('O-');
              navigation.goBack();
            }}>
            <Text style={styles.bloodGroups}>O-</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={() => {
            changeSearchValue(null);
            navigation.goBack();
          }}
          primary
          style={{
            backgroundColor: '#de2c2c',
            justifyContent: 'center',
            width: '80%',
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          <Text>Clear Search</Text>
        </Button>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  bloodGroups: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    borderRadius: 50,
    backgroundColor: '#de2c2c',
    width: 80,
    height: 80,
    marginVertical: 15,
    shadowOffset: {
      height: 2,
      width: 4,
    },
    elevation: 20,
  },
});

let SearchBtn = connect(null, {changeSearchValue})(SearchScr);
export {SearchBtn};
