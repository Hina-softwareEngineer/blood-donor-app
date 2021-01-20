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
        if (typeof response !== 'string') {
          loginSignupUser(response);
          // navigation.navigate('');
        } else {
          loginSignupError(response);
          Toast.show({
            text: response,
            position: 'bottom',
            type: 'danger',
          });
        }
      }
    } else {
      Toast.show({
        text: 'Fill all the fields first!',
        position: 'bottom',
        type: 'danger',
      });
    }
  };

  return (
    <Root>
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(value) => setUsername(value)} />
            </Item>
            {userErr && <Label>{userErr}</Label>}
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input onChangeText={(value) => setEmail(value)} />
            </Item>
            {emailErr && <Label>{emailErr}</Label>}
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(value) => setPassword(value)} />
            </Item>
            {passErr && <Label>{passErr}</Label>}
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input onChangeText={(value) => setPhoneNumber(value)} />
            </Item>
            {PhoneErr && <Label>{PhoneErr}</Label>}
            <Button primary onPress={onSubmitForm}>
              <Text>Submit</Text>
            </Button>
          </Form>

          <Text>Already a User? </Text>
          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login Now</Text>
          </Button>
        </Content>
      </Container>
    </Root>
  );
}

let SignUpScreen = connect(null, {loginSignupError, loginSignupUser})(
  SignUpScr,
);
export {SignUpScreen};
