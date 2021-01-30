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
import {SearchBtn} from '../search';

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
    if (navState === 2 || navState === 1) {
      bottomNavStateChange(0);
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#de2c2c',
            },
            headerTintColor: '#fff',
          }}>
          {!user.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Login"
                options={{
                  headerShown: false,
                }}
                component={LoginScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Signup"
                component={SignUpScreen}
              />
            </>
          ) : null}
          {user.isAuthenticated && user.isLoaded ? (
            <>
              <Stack.Screen
                name="donorsList"
                options={{
                  title: 'Find Donors',
                }}
                component={DonorsList}
              />
              <Stack.Screen
                name="User Profile"
                options={{
                  headerLeft: null,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
                component={BloodUserDetails}
              />
              <Stack.Screen
                name="Search"
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
                component={SearchBtn}></Stack.Screen>
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
