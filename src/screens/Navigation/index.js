import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {connect} from 'react-redux';

import {LoginScreen} from '../Login';
import {SignUpScreen} from '../Signup';
import {BloodUserDetails} from '../DonorDetail';
import {loadingUser} from '../../middleware/queries/loadingUser';
import {loadingUserState, logoutUser} from '../../redux/actions/authActions';
import {DonorsList} from '../DonorList';

import {bottomNavStateChange} from '../../redux/actions/navActions';

const Stack = createStackNavigator();

function Navigation({
  user,
  navState,
  loadingUserState,
  logoutUser,
  bottomNavStateChange,
}) {
  React.useEffect(() => {
    async function userData() {
      let response = await loadingUser();
      if (response) {
        await loadingUserState(response);
      } else {
        await logoutUser();
      }
    }
    userData();

    if (navState == 2) {
      bottomNavStateChange(0);
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: 'Blood Group Management',
            headerStyle: {
              backgroundColor: '#0277bd',
            },
            headerTintColor: '#fff',
          }}>
          {!user.isAuthenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignUpScreen} />
            </>
          ) : null}
          {user.isAuthenticated && user.isLoaded ? (
            <>
              <Stack.Screen name="donorsList" component={DonorsList} />
              <Stack.Screen
                name="donorProfile"
                options={{
                  headerLeft: null,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
                component={BloodUserDetails}
              />
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
  navState: state.navState.active,
});

export default connect(mapStateToProps, {
  loadingUserState,
  logoutUser,
  bottomNavStateChange,
})(Navigation);
