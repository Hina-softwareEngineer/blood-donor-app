import * as React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast,
  Root,
  Left,
  Right,
} from 'native-base';
import {
  Keyboard,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

export function SearchBtn({navigation}) {
  return (
    <Root>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.content}>
          <Text style={styles.bloodGroups}>A+</Text>

          <Text style={styles.bloodGroups}>A-</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.bloodGroups}>B+</Text>

          <Text style={styles.bloodGroups}>B-</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.bloodGroups}>AB+</Text>

          <Text style={styles.bloodGroups}>AB-</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.bloodGroups}>O+</Text>

          <Text style={styles.bloodGroups}>O-</Text>
        </View>

        <Button
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
