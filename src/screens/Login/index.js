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
import {Keyboard} from 'react-native';
import {ValidationFields} from '../../middleware/Validation';
import {connect} from 'react-redux';
import {signInUser} from '../../middleware/queries/signin';
import {
  loginSignupError,
  loginSignupUser,
} from '../../redux/actions/authActions';

function Login({navigation, loginSignupError, loginSignupUser}) {
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
        if (typeof response !== 'string') {
          await loginSignupUser(response);
          navigation.navigate('donorsList');
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
        position: 'top',
        type: 'danger',
      });
    }
  };

  return (
    <Root>
      <Container>
        <Content>
          <Form>
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

            <Button primary onPress={onSubmitForm}>
              <Text>Login</Text>
            </Button>
          </Form>
          <Text>Not a User yet? </Text>

          <Button primary onPress={() => navigation.navigate('Signup')}>
            <Text>Signup Now</Text>
          </Button>
        </Content>
      </Container>
    </Root>
  );
}

let LoginScreen = connect(null, {loginSignupError, loginSignupUser})(Login);
export {LoginScreen};
