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
  Picker,
} from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import IconE from 'react-native-vector-icons/dist/Entypo';
import IconM from 'react-native-vector-icons/dist/MaterialIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {getAllDonors} from '../../middleware/queries/donorData';
import Navigation from '../Navigation';

export function DonorsListComp({user, navigation}) {
  let [usersList, setUsersList] = React.useState([]);
  let [modalState, setModalState] = React.useState(false);
  let [oneUserData, setOneUserData] = React.useState(null);
  let [search, setSearch] = React.useState(null);
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
        <Container style={{paddingHorizontal: 15}}>
          <Item
            style={styles.searchBox}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Text style={{color: '#1a1a1a', fontSize: 14}}>
              {search ? search : 'Search Blood Group'}
            </Text>
            <Right>
              {search ? (
                <IconE
                  onPress={() => setSearch(null)}
                  name="cross"
                  style={{fontSize: 18, color: '#de2c2c'}}
                />
              ) : (
                <IconM name="search" style={{fontSize: 18, color: '#de2c2c'}} />
              )}
            </Right>
          </Item>

          <Content style={{marginTop: 10}}>
            <List>
              {usersList?.map((list, i) => (
                <ListItem
                  style={{marginLeft: 5}}
                  key={i}
                  onPress={() => {
                    setOneUserData(list);
                    setModalState(true);
                  }}>
                  <Left style={{alignItems: 'center'}}>
                    <Icon
                      name="user-alt"
                      style={{
                        fontSize: 28,
                        color: 'rgba(112,112,112,0.6)',
                        marginRight: 10,
                      }}
                    />
                    <Content>
                      <Text style={styles.text}>{list.userName}</Text>
                      <Text style={styles.email}>{list.email}</Text>
                    </Content>
                  </Left>

                  <Right>
                    <Text style={styles.bloodStyle}>
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
  searchBox: {
    padding: 15,
    marginTop: 10,
    borderRadius: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(112,112,112,0.6)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  bloodStyle: {
    backgroundColor: '#f8f1f0',
    color: '#de2c2c',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 15,
  },
  email: {
    fontSize: 12,
    color: '#1a1a1a',
    alignContent: 'flex-end',
  },
});

let DonorsList = connect(mapStateToProps, null)(DonorsListComp);
export {DonorsList};
