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
import {ValidationFields} from '../../middlewares/Validation';
import {login} from '../../middlewares/apis/auth';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions';

function Login({navigation, user, loginUser}) {
  return <Text>hina</Text>;
}
