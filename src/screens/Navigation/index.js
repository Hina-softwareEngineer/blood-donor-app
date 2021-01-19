import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import {LoginScreen} from '../Login';
import {SignUpScreen} from '../Signup';

const Stack = createStackNavigator();

function Navigation({user, loadUser}) {
  React.useEffect(() => {
    // loadUser();
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

export default connect(mapStateToProps, null)(Navigation);
