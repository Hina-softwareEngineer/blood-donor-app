import * as React from 'react';
import {
  Container,
  Content,
  Input,
  Text,
  Root,
  ListItem,
  List,
} from 'native-base';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {
  addDonorData,
  getAllDonors,
  getUserMedicalData,
  updateDonorData,
} from '../../middleware/queries/donorData';

export function DonorsListComp({user}) {
  React.useEffect(() => {
    // addDonorData();
    // updateDonorData();
    console.log('user Id ---->', user.uid);
    // getUserMedicalData(user.uid);
    // get
  }, []);

  return (
    <Root>
      <Container>
        <Text>Donors List</Text>
        <Input />

        <Content>
          <List>
            <ListItem onPress={createTwoButtonAlert}>
              <Text>Aaron Bennet</Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>

            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
      <FooterNav />
    </Root>
  );
}

const createTwoButtonAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

let DonorsList = connect(mapStateToProps, null)(DonorsListComp);
export {DonorsList};
