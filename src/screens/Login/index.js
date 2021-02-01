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
} from 'native-base';
import {Keyboard, View, Image, StyleSheet} from 'react-native';
import {ValidationFields} from '../../middleware/Validation';
import {connect} from 'react-redux';
import {signInUser} from '../../middleware/queries/signin';
import {
  loginSignupError,
  loginSignupUser,
} from '../../redux/actions/authActions';
import {bottomNavStateChange} from '../../redux/actions/navActions';

function Login({
  navigation,
  loginSignupError,
  loginSignupUser,
  bottomNavStateChange,
}) {
  let [email, setEmail] = React.useState(null);
  let [password, setPassword] = React.useState(null);

  let [emailErr, setEmailErr] = React.useState(null);
  let [passErr, setPassErr] = React.useState(null);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (email && password) {
      let validate = ValidationFields(email, password);
      let validationResult = validate.every((field, ind) => {
        if (field !== true) {
          if (ind == 1) {
            setEmailErr(validate[1]);
          } else if (ind == 2) {
            setPassErr(validate[2]);
          }
        } else {
          if (ind == 1) {
            setEmailErr(null);
          } else if (ind == 2) {
            setPassErr(null);
          }
        }
        return field === true;
      });

      if (validationResult) {
        let response = await signInUser(email, password);
        bottomNavStateChange(0);

        if (response && typeof response !== 'string') {
          await loginSignupUser(response);
          navigation.navigate('donorsList');
        } else {
          loginSignupError(response);
          Toast.show({
            text: response || 'Network Error',
            position: 'top',
            type: 'danger',
            style: {
              marginHorizontal: 10,
              borderRadius: 3,
              minHeight: 40,
              shadowOffset: {
                width: 10,
                height: 3,
              },
              elevation: 6,
            },
          });
        }
      }
    } else {
      Toast.show({
        text: 'Fill all the fields first!',
        position: 'top',
        type: 'danger',
        style: {
          marginHorizontal: 10,
          borderRadius: 3,
          minHeight: 40,
          shadowOffset: {
            width: 10,
            height: 3,
          },
          elevation: 6,
        },
      });
    }
  };

  return (
    <Root>
      <Container>
        <View style={styles.navbar}>
          <Image
            style={styles.logo}
            source={require('../../Images/logo.png')}
          />
          <Text style={styles.logoText}>DOBOR</Text>
        </View>
        <Content style={{paddingHorizontal: 20}}>
          <Text style={styles.heading1}>Welcome Back!</Text>
          <Form>
            <Item floatingLabel last style={styles.input}>
              <Label style={styles.labelFloat}>Email</Label>
              <Input
                value={email}
                style={{
                  color: '#1a1a1a',
                }}
                onChangeText={(value) => setEmail(value)}
              />
            </Item>
            {emailErr && <Label style={styles.error}>*{emailErr}</Label>}
            <Item floatingLabel last style={styles.input}>
              <Label style={styles.labelFloat}>Password</Label>
              <Input
                style={{
                  color: '#1a1a1a',
                }}
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </Item>
            {passErr && <Label style={styles.error}>*{passErr}</Label>}

            <Button style={styles.loginBtn} primary onPress={onSubmitForm}>
              <Text>Login</Text>
            </Button>
          </Form>
          <View style={styles.signupScr}>
            <Text style={styles.notAccount}>Don't have an account yet? </Text>

            <Button
              style={styles.singup}
              onPress={() => navigation.navigate('Signup')}>
              <Text uppercase={false} style={styles.textSignup}>
                Signup Now
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  navbar: {
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c62e23',
  },
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  labelFloat: {
    top: 7,
    left: -10,
  },
  input: {
    borderColor: '#de2c2c',
    borderStyle: 'solid',
    borderBottomWidth: 2.5,
    paddingTop: 5,
    paddingLeft: 5,
    marginBottom: 2,
  },
  error: {
    marginBottom: 0,
    color: '#de2c2c',
    fontSize: 14,
  },

  loginBtn: {
    marginVertical: 50,
    width: '100%',
    backgroundColor: '#de2c2c',
    justifyContent: 'center',
    borderRadius: 3,
  },
  signupScr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notAccount: {
    fontSize: 13,
    color: '#767676',
  },
  singup: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0,
    elevation: 0,
    padding: 0,
  },
  textSignup: {
    fontSize: 13,
    paddingTop: 1,
    paddingLeft: 2,
    color: '#de2c2c',
    fontWeight: 'bold',
  },
});

let LoginScreen = connect(null, {
  loginSignupError,
  loginSignupUser,
  bottomNavStateChange,
})(Login);
export {LoginScreen};
