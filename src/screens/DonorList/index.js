import * as React from 'react';
import {
  Container,
  Content,
  Input,
  Text,
  Root,
  ListItem,
  List,
  Item,
  Left,
  Right,
  Label,
} from 'native-base';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {getAllDonors} from '../../middleware/queries/donorData';

export function DonorsListComp({user}) {
  let [usersList, setUsersList] = React.useState([]);
  let [modalState, setModalState] = React.useState(false);
  let [oneUserData, setOneUserData] = React.useState(null);
  React.useEffect(() => {
    async function getDonorsData() {
      let response = await getAllDonors();
      if (response) {
        setUsersList(response);
      }
    }
    getDonorsData();
  }, []);

  return (
    <>
      <Root>
        <Container>
          <Text>Donors List</Text>
          {/* <Item regular>
            <Input placeholder="Regular Textbox" />
          </Item> */}

          <Content>
            <List>
              {usersList?.map((list, i) => (
                <ListItem
                  key={i}
                  onPress={() => {
                    setOneUserData(list);
                    setModalState(true);
                  }}>
                  <Left>
                    <Text>{list.userName}</Text>
                  </Left>

                  <Right>
                    <Text>
                      {list.bloodGroup}
                      {list.rhValue === 'neg' ? ' -' : ' +'}
                    </Text>
                  </Right>
                </ListItem>
              ))}
            </List>
          </Content>
        </Container>

        <Modal animationType="fade" transparent visible={modalState}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>{oneUserData?.userName}</Text>
              <Text>{oneUserData?.email}</Text>

              <Label>Blood Group : </Label>
              <Text>
                {oneUserData?.bloodGroup}{' '}
                {oneUserData?.rhValue === 'neg' ? '-' : '+'}
              </Text>

              <Label>Address</Label>
              <Text>{oneUserData?.address}</Text>

              <Label>Phone</Label>
              <Text>{oneUserData?.phone}</Text>

              <Label>Home Phone</Label>
              <Text>{oneUserData?.homePhone}</Text>

              <Label>Medical Details</Label>
              <Text>{oneUserData?.medicalDetails}</Text>

              <TouchableOpacity
                onPress={() => {
                  setModalState(false);
                }}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FooterNav />
      </Root>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

let DonorsList = connect(mapStateToProps, null)(DonorsListComp);
export {DonorsList};
