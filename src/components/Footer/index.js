import React, {useState} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/authActions';
import {bottomNavStateChange} from '../../redux/actions/navActions';
import {logoutSignInUser} from '../../middleware/queries/loadingUser';

function FooterNavigation({navState, bottomNavStateChange, logoutUser}) {
  let navigation = useNavigation();
  return (
    <Footer>
      <FooterTab>
        <Button
          active={navState === 0}
          vertical
          onPress={() => {
            bottomNavStateChange(0);
            navigation.navigate('donorsList');
          }}>
          <Icon name="apps" />
          <Text>Donors</Text>
        </Button>
        <Button
          active={navState === 1}
          vertical
          onPress={() => {
            bottomNavStateChange(1);
            navigation.navigate('donorProfile');
          }}>
          <Icon name="person" />
          <Text>Profile</Text>
        </Button>
        <Button
          active={navState === 2}
          vertical
          onPress={() => {
            bottomNavStateChange(2);
            logoutSignInUser();
            logoutUser();
          }}>
          <Icon name="navigate" />
          <Text>Logout</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

const mapStateToProps = (state) => ({
  navState: state.navState.active,
});

let FooterNav = connect(mapStateToProps, {bottomNavStateChange, logoutUser})(
  FooterNavigation,
);
export {FooterNav};
