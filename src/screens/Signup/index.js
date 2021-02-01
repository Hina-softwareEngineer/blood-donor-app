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
import {signUpUser} from '../../middleware/queries/signup';
import {
  loginSignupError,
  loginSignupUser,
} from '../../redux/actions/authActions';
import {connect} from 'react-redux';

function SignUpScr({navigation, loginSignupUser, loginSignupError}) {
  let [username, setUsername] = React.useState(null);
  let [email, setEmail] = React.useState(null);
  let [password, setPassword] = React.useState(null);
  let [phone_number, setPhoneNumber] = React.useState(null);
  let [userErr, setUserErr] = React.useState(null);
  let [emailErr, setEmailErr] = React.useState(null);
  let [passErr, setPassErr] = React.useState(null);
  let [PhoneErr, setPhoneErr] = React.useState(null);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (username && email && password && phone_number) {
      let validate = ValidationFields(email, password, username, phone_number);
      let validationResult = validate.every((field, ind) => {
        if (field !== true) {
          if (ind == 0) {
            setUserErr(validate[0]);
          } else if (ind == 1) {
            setEmailErr(validate[1]);
          } else if (ind == 2) {
            setPassErr(validate[2]);
          } else {
            setPhoneErr(validate[3]);
          }
        } else {
          if (ind == 0) {
            setUserErr(null);
          } else if (ind == 1) {
            setEmailErr(null);
          } else if (ind == 2) {
            setPassErr(null);
          } else {
            setPhoneErr(null);
          }
        }
        return field === true;
      });

      if (validationResult) {
        let response = await signUpUser(
          email,
          password,
          phone_number,
          username,
        );
        console.log('response --getting', response);
        if (typeof response !== 'string' && response) {
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
        <Content
          style={{
            paddingHorizontal: 20,
            marginTop: 40,
          }}>
          <Text style={styles.heading1}>Create An Account</Text>

          <Form style={{marginTop: 20}}>
            <Item floatingLabel last style={styles.input}>
              <Label style={styles.labelFloat}>Username</Label>
              <Input
                style={{
                  color: '#1a1a1a',
                }}
                onChangeText={(value) => setUsername(value)}
              />
            </Item>
            {userErr && <Label style={styles.error}>*{userErr}</Label>}
            <Item floatingLabel last style={styles.input}>
              <Label style={styles.labelFloat}>Email</Label>
              <Input
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
                onChangeText={(value) => setPassword(value)}
              />
            </Item>
            {passErr && <Label style={styles.error}>*{passErr}</Label>}
            <Item floatingLabel last style={styles.input}>
              <Label style={styles.labelFloat}>Phone Number</Label>
              <Input
                style={{
                  color: '#1a1a1a',
                }}
                onChangeText={(value) => setPhoneNumber(value)}
              />
            </Item>
            {PhoneErr && <Label style={styles.error}>*{PhoneErr}</Label>}
            <Button style={styles.loginBtn} onPress={onSubmitForm}>
              <Text>Continue</Text>
            </Button>
            <Text style={styles.terms}>
              By clicking continue you will proceed.
            </Text>
          </Form>

          <View style={styles.signupScr}>
            <Text style={styles.notAccount}>Already a User?</Text>

            <Button
              style={styles.singup}
              onPress={() => navigation.navigate('Login')}>
              <Text uppercase={false} style={styles.textSignup}>
                Login now
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    margin: 0,
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
    marginTop: 5,
  },
  error: {
    marginBottom: 0,
    color: '#de2c2c',
    fontSize: 14,
  },

  loginBtn: {
    marginTop: 50,
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#de2c2c',
    justifyContent: 'center',
    borderRadius: 3,
  },
  signupScr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    paddingLeft: 5,
  },
  textSignup: {
    fontSize: 13,
    paddingTop: -1,
    paddingLeft: 2,
    color: '#de2c2c',
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#767676',
    textAlign: 'center',
  },
});

let SignUpScreen = connect(null, {loginSignupError, loginSignupUser})(
  SignUpScr,
);
export {SignUpScreen};
