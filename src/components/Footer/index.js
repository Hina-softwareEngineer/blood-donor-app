import React, {useState} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/authActions';
import {bottomNavStateChange} from '../../redux/actions/navActions';
import {changeSearchValue} from '../../redux/actions/searchActions';
import {logoutSignInUser} from '../../middleware/queries/loadingUser';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/dist/FontAwesome5';

function FooterNavigation({
  navState,
  bottomNavStateChange,
  logoutUser,
  changeSearchValue,
}) {
  let navigation = useNavigation();
  return (
    <Footer style={styles.footer}>
      <FooterTab style={styles.footer}>
        <Button
          style={styles.btn}
          active={navState === 0}
          vertical
          onPress={() => {
            bottomNavStateChange(0);
            navigation.navigate('donorsList');
          }}>
          <Icon
            style={{
              color: navState === 0 ? '#de2c2c' : '#464646',
              fontSize: 24,
            }}
            name="home-search-outline"
          />
          <Text
            style={navState === 0 ? styles.btnText : styles.btnUnActiveText}>
            Donors
          </Text>
        </Button>
        <Button
          style={styles.btn}
          active={navState === 1}
          vertical
          onPress={() => {
            bottomNavStateChange(1);
            navigation.navigate('User Profile');
          }}>
          <IconF
            style={{
              color: navState === 1 ? '#de2c2c' : '#464646',
              fontSize: 20,
              marginTop: 2,
              marginBottom: 2,
            }}
            name="user"
          />
          <Text
            style={navState === 1 ? styles.btnText : styles.btnUnActiveText}>
            Profile
          </Text>
        </Button>
        <Button
          style={styles.btn}
          active={navState === 2}
          vertical
          onPress={async () => {
            await logoutUser();
            await logoutSignInUser();
            await bottomNavStateChange(2);
            await navigation.navigate('Login');
            changeSearchValue(null);
          }}>
          <Icon
            style={{
              color: navState === 2 ? '#de2c2c' : '#464646',
              fontSize: 20,
              marginTop: 2,
              marginBottom: 1,
            }}
            name="logout"
          />
          <Text
            style={navState === 2 ? styles.btnText : styles.btnUnActiveText}>
            Logout
          </Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    shadowOffset: {
      width: 10,
      height: 0,
    },
    elevation: 20,
  },
  btn: {
    backgroundColor: '#fff',
  },
  btnText: {
    color: '#de2c2c',
    fontSize: 11,
  },
  btnUnActiveText: {
    color: '#464646',
    fontSize: 11,
  },
});

const mapStateToProps = (state) => ({
  navState: state.navState.active,
});

let FooterNav = connect(mapStateToProps, {
  bottomNavStateChange,
  logoutUser,
  changeSearchValue,
})(FooterNavigation);
export {FooterNav};
