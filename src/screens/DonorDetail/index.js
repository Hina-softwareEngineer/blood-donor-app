import * as React from 'react';
import {
  Container,
  Content,
  Form,
  Input,
  Label,
  Button,
  Text,
  Toast,
  Root,
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
import {SpinnerLoader} from '../../components/Spinner';

export function BloodUserDetailsComp({user, navigation}) {
  let [available, setAvailable] = React.useState(false);
  let [address, setAddress] = React.useState(null);
  let [home_phone, setHomePhone] = React.useState(null);
  let [diseases, setDiseases] = React.useState([]);
  let [blood_group, setBloodGroup] = React.useState(null);
  let [rh_factor, setRhFactor] = React.useState(null);
  let [medical, setMedical] = React.useState(null);

  let [userProfileId, setUserProfileId] = React.useState(null);
  let [spinner, setSpinner] = React.useState(true);

  React.useEffect(() => {
    async function subFunction() {
      if (user) {
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
        setSpinner(false);
      }
    }
    subFunction();
  }, []);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (address && home_phone && blood_group && rh_factor && medical) {
      if (diseases.length > 0 && available) {
        Toast.show({
          text: "If you have any disease, then you can't give blood.",
          position: 'top',
          type: 'warning',
          duration: 3000,
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
        } else {
          let response = await addDonorData(data);
          console.log(response);
          if (response) {
            Toast.show({
              text: 'Successfully Saved.',
              position: 'top',
              type: 'success',
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
      }
    } else {
      Toast.show({
        text: 'Fill all the necessage fields first!',
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
        {spinner ? (
          <SpinnerLoader />
        ) : (
          <Content style={styles.content}>
            <Text style={styles.heading}>Profile</Text>
            <Form style={{marginTop: 15}}>
              <ToggleSwitch
                isOn={available}
                onColor="#de2c2c"
                offColor="#767676"
                label="Available for Donation of Blood "
                labelStyle={{
                  color: '#1a1a1a',
                  fontSize: 15,
                  marginLeft: 0,
                  width: '83%',
                }}
                size="small"
                onToggle={(isOn) => {
                  setAvailable(isOn);
                }}
              />

              <Content style={(styles.input, {marginTop: 30})}>
                <Label style={styles.label}>Address</Label>
                <Input
                  placeholder="Enter Address"
                  style={styles.inputBox}
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                />
              </Content>

              <Content style={(styles.input, {marginTop: 30})}>
                <Label style={styles.label}>Home Phone Number</Label>
                <Input
                  style={styles.inputBox}
                  placeholder="Enter Home Phone Number"
                  value={home_phone}
                  onChangeText={(value) => setHomePhone(value)}
                />
              </Content>

              <Content style={(styles.input, {marginTop: 35})}>
                <Label style={styles.label}>
                  Have any one of the below Disease:
                </Label>
                <Label style={styles.label}>
                  (If not, then leave it blank)
                </Label>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => {
                    if (diseases.includes('Malaria')) {
                      let dis = [...diseases];
                      dis.splice(diseases.indexOf('Malaria'), 1);
                      setDiseases(dis);
                    } else {
                      setDiseases([...diseases, 'Malaria']);
                    }
                  }}>
                  <CheckBox
                    color="#de2c2c"
                    style={{
                      borderColor: diseases.includes('Malaria')
                        ? '#de2c2c'
                        : 'rgba(112,112,112,0.7)',
                    }}
                    checked={diseases.includes('Malaria')}
                  />
                  <Body>
                    <Text style={styles.textColor}>Malaria</Text>
                  </Body>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => {
                    if (diseases.includes('Hepatitis')) {
                      let dis = [...diseases];
                      dis.splice(diseases.indexOf('Hepatitis'), 1);
                      setDiseases(dis);
                    } else {
                      setDiseases([...diseases, 'Hepatitis']);
                    }
                  }}>
                  <CheckBox
                    color="#de2c2c"
                    style={{
                      borderColor: diseases.includes('Hepatitis')
                        ? '#de2c2c'
                        : 'rgba(112,112,112,0.7)',
                    }}
                    checked={diseases.includes('Hepatitis')}
                  />
                  <Body>
                    <Text style={styles.textColor}>Hepatitis</Text>
                  </Body>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => {
                    if (diseases.includes('HVP')) {
                      let dis = [...diseases];
                      dis.splice(diseases.indexOf('HVP'), 1);
                      setDiseases(dis);
                    } else {
                      setDiseases([...diseases, 'HVP']);
                    }
                  }}>
                  <CheckBox
                    color="#de2c2c"
                    style={{
                      borderColor: diseases.includes('HVP')
                        ? '#de2c2c'
                        : 'rgba(112,112,112,0.7)',
                    }}
                    checked={diseases.includes('HVP')}
                  />
                  <Body>
                    <Text style={styles.textColor}>HIV</Text>
                  </Body>
                </ListItem>
              </Content>
              <Content
                style={
                  (styles.input,
                  {
                    marginTop: 35,
                  })
                }>
                <Label style={styles.label}>Choose Blood Group</Label>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setBloodGroup('A')}>
                  <Left>
                    <Text style={styles.textColor}>A</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={blood_group === 'A'}
                      onPress={() => setBloodGroup('A')}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setBloodGroup('B')}>
                  <Left>
                    <Text style={styles.textColor}>B</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={blood_group === 'B'}
                      onPress={() => setBloodGroup('B')}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setBloodGroup('AB')}>
                  <Left>
                    <Text style={styles.textColor}>AB</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={blood_group === 'AB'}
                      onPress={() => setBloodGroup('AB')}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setBloodGroup('O')}>
                  <Left>
                    <Text style={styles.textColor}>O</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={blood_group === 'O'}
                      onPress={() => setBloodGroup('O')}
                    />
                  </Right>
                </ListItem>
              </Content>

              <Content
                style={
                  (styles.input,
                  {
                    marginTop: 40,
                  })
                }>
                <Label style={styles.label}>Rh Factor (e.g AB+ , O-)</Label>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setRhFactor('pos')}>
                  <Left>
                    <Text style={styles.textColor}>Positive</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={rh_factor === 'pos'}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={{marginLeft: 0}}
                  onPress={() => setRhFactor('neg')}>
                  <Left>
                    <Text style={styles.textColor}>Negative</Text>
                  </Left>
                  <Right>
                    <Radio
                      selectedColor="#de2c2c"
                      color={'rgba(112,112,112,0.7)'}
                      selected={rh_factor === 'neg'}
                    />
                  </Right>
                </ListItem>
              </Content>

              <Content style={(styles.input, {marginTop: 35})}>
                <Label style={styles.label}>Other Medical Details</Label>
                <Textarea
                  style={styles.textArea}
                  value={medical}
                  rowSpan={4}
                  bordered
                  placeholder="Textarea"
                  onChangeText={(val) => setMedical(val)}
                />
              </Content>

              <Button style={styles.btnSubmit} onPress={onSubmitForm}>
                <Text>Save</Text>
              </Button>
            </Form>
          </Content>
        )}
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
  textArea: {
    marginTop: 5,
    marginBottom: 30,
  },
  btnSubmit: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#de2c2c',
    justifyContent: 'center',
    borderRadius: 3,
  },
  textColor: {
    color: '#1a1a1a',
  },
});

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

let BloodUserDetails = connect(mapStateToProps, null)(BloodUserDetailsComp);
export {BloodUserDetails};
