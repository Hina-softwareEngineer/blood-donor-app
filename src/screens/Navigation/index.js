import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import {LoginScreen} from '../Login';
import {SignUpScreen} from '../Signup';
import {loadingUser} from '../../middleware/queries/loadingUser';
import {loadingUserState, logoutUser} from '../../redux/actions/authActions';

const Stack = createStackNavigator();

function Navigation({user, loadingUserState, logoutUser}) {
  console.log('user data-->', user);
  React.useEffect(() => {
    async function userData() {
      let response = await loadingUser();
      if (response) {
        loadingUserState(response);
      } else {
        logoutUser();
      }
    }
    userData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Blood Group Management',
          headerStyle: {
            backgroundColor: '#0277bd',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
});

export default connect(mapStateToProps, {loadingUserState, logoutUser})(
  Navigation,
);
