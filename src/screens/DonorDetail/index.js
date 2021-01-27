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
  Header,
  ListItem,
  Radio,
  Right,
  Left,
  Textarea,
  CheckBox,
  Body,
} from 'native-base';
import {Keyboard, StyleSheet} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {
  addDonorData,
  getUserMedicalData,
  updateDonorData,
  getUser,
} from '../../middleware/queries/donorData';

export function BloodUserDetailsComp({user, navigation}) {
  let [available, setAvailable] = React.useState(false);
  let [address, setAddress] = React.useState(null);
  let [home_phone, setHomePhone] = React.useState(null);
  let [diseases, setDiseases] = React.useState([]);
  let [blood_group, setBloodGroup] = React.useState('A');
  let [rh_factor, setRhFactor] = React.useState('pos');
  let [medical, setMedical] = React.useState(null);

  let [userProfileId, setUserProfileId] = React.useState(null);
  console.log('user--->', user);
  React.useEffect(() => {
    async function subFunction() {
      let userProfileid = await getUserMedicalData(user?.uid);
      if (
        userProfileid &&
        typeof userProfileid === 'object' &&
        Object.keys(userProfileid).length > 0
      ) {
        let id = Object.keys(userProfileid)[0];
        setAddress(userProfileid[id]['address']);
        setBloodGroup(userProfileid[id]['bloodGroup']);
        setRhFactor(userProfileid[id]['rhValue']);
        if (userProfileid[id]['diseases'][0] !== 'none') {
          setDiseases(userProfileid[id]['diseases']);
        }
        setHomePhone(userProfileid[id]['homePhone']);
        setAvailable(userProfileid[id]['isAvailable']);
        setMedical(userProfileid[id]['medicalDetails']);
        setUserProfileId(id);
      }
      let userDetail = await getUser(user?.uid);
      userDetail = userDetail[user?.uid];
      navigation.setOptions({title: userDetail.userName});
    }
    subFunction();
  }, []);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (address && home_phone && blood_group && rh_factor && medical) {
      if (diseases.length > 0 && available) {
        Toast.show({
          text: "If you have any disease, then you can't give blood.",
          position: 'center',
          type: 'warning',
          duration: 3000,
        });
      } else {
        let data = {
          userId: user.uid,
          isAvailable: available,
          address,
          homePhone: home_phone,
          diseases: diseases.length == 0 ? ['none'] : diseases,
          bloodGroup: blood_group,
          rhValue: rh_factor,
          medicalDetails: medical,
        };
        if (userProfileId) {
          let response = await updateDonorData(userProfileId, data);
          if (response) {
            Toast.show({
              text: 'Successfully Updated.',
              position: 'top',
              type: 'success',
            });
          }
        } else {
          let response = await addDonorData(data);
          console.log(response);
          if (response) {
            Toast.show({
              text: 'Successfully Saved.',
              position: 'top',
              type: 'success',
            });
          }
        }
      }
    } else {
      Toast.show({
        text: 'Fill all the necessage fields first!',
        position: 'center',
        type: 'warning',
      });
    }
  };

  return (
    <Root>
      <Container>
        <Content style={styles.content}>
          <Text style={styles.heading}>Profile</Text>
          <Form style={{marginTop: 10}}>
            <ToggleSwitch
              isOn={available}
              onColor="#de2c2c"
              offColor="#767676"
              label="Available for Donation of Blood "
              labelStyle={{
                color: '#1a1a1a',
                fontSize: 16,
                marginLeft: 0,
                width: '83%',
              }}
              size="small"
              onToggle={(isOn) => {
                setAvailable(isOn);
              }}
            />

            <Content style={(styles.input, {marginTop: 10})}>
              <Label style={styles.label}>Address</Label>
              <Input
                placeholder="Enter Address"
                style={styles.inputBox}
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
            </Content>

            <Content style={styles.input}>
              <Label style={styles.label}>Home Phone Number</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter Home Phone Number"
                value={home_phone}
                onChangeText={(value) => setHomePhone(value)}
              />
            </Content>

            <Label style={styles.label}>
              Have any one of the below Disease:
            </Label>
            <Label style={styles.label}>(If not, then leave it blank)</Label>
            <ListItem>
              <CheckBox
                checked={diseases.includes('Malaria')}
                onPress={() => {
                  if (diseases.includes('Malaria')) {
                    let dis = [...diseases];
                    dis.splice(diseases.indexOf('Malaria'), 1);
                    setDiseases(dis);
                  } else {
                    setDiseases([...diseases, 'Malaria']);
                  }
                }}
              />
              <Body>
                <Text>Malaria</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                checked={diseases.includes('Hepatitis')}
                onPress={() => {
                  if (diseases.includes('Hepatitis')) {
                    let dis = [...diseases];
                    dis.splice(diseases.indexOf('Hepatitis'), 1);
                    setDiseases(dis);
                  } else {
                    setDiseases([...diseases, 'Hepatitis']);
                  }
                }}
              />
              <Body>
                <Text>Hepatitis</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                checked={diseases.includes('HVP')}
                onPress={() => {
                  if (diseases.includes('HVP')) {
                    let dis = [...diseases];
                    dis.splice(diseases.indexOf('HVP'), 1);
                    setDiseases(dis);
                  } else {
                    setDiseases([...diseases, 'HVP']);
                  }
                }}
              />
              <Body>
                <Text>HIV</Text>
              </Body>
            </ListItem>
            <Content>
              <Label>Blood Group</Label>
              <ListItem>
                <Left>
                  <Text>A</Text>
                </Left>
                <Right>
                  <Radio
                    selected={blood_group === 'A'}
                    onPress={() => setBloodGroup('A')}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>B</Text>
                </Left>
                <Right>
                  <Radio
                    selected={blood_group === 'B'}
                    onPress={() => setBloodGroup('B')}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>AB</Text>
                </Left>
                <Right>
                  <Radio
                    selected={blood_group === 'AB'}
                    onPress={() => setBloodGroup('AB')}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>O</Text>
                </Left>
                <Right>
                  <Radio
                    selected={blood_group === 'O'}
                    onPress={() => setBloodGroup('O')}
                  />
                </Right>
              </ListItem>
            </Content>

            <Content>
              <Label>Rh Factor (e.g AB+ , O-)</Label>
              <ListItem>
                <Left>
                  <Text>Positive</Text>
                </Left>
                <Right>
                  <Radio
                    selected={rh_factor === 'pos'}
                    onPres={() => setRhFactor('pos')}
                  />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Negative</Text>
                </Left>
                <Right>
                  <Radio
                    selected={rh_factor === 'neg'}
                    onPress={() => setRhFactor('neg')}
                  />
                </Right>
              </ListItem>
            </Content>

            <Container>
              <Label>Other Medical Details</Label>
              <Textarea
                value={medical}
                rowSpan={5}
                bordered
                placeholder="Textarea"
                onChangeText={(val) => setMedical(val)}
              />
            </Container>

            <Button primary onPress={onSubmitForm}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
      <FooterNav />
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    letterSpacing: 0.8,
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    padding: 0,
  },
  label: {
    fontSize: 12,
    color: '#1a1a1a',
    marginBottom: 3,
  },
  inputBox: {
    height: 50,
    borderRadius: 3,
    color: '#1a1a1a',
    borderColor: 'rgba(112,112,112,0.5)',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

let BloodUserDetails = connect(mapStateToProps, null)(BloodUserDetailsComp);
export {BloodUserDetails};
