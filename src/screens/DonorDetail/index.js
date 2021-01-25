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
import {Keyboard} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {
  addDonorData,
  getUserMedicalData,
  updateDonorData,
} from '../../middleware/queries/donorData';

export function BloodUserDetailsComp({user}) {
  let [available, setAvailable] = React.useState(false);
  let [address, setAddress] = React.useState(null);
  let [home_phone, setHomePhone] = React.useState(null);
  let [diseases, setDiseases] = React.useState([]);
  let [blood_group, setBloodGroup] = React.useState('A');
  let [rh_factor, setRhFactor] = React.useState('pos');
  let [medical, setMedical] = React.useState(null);

  let [userProfileId, setUserProfileId] = React.useState(null);

  React.useEffect(() => {
    async function subFunction() {
      let userProfileid = await getUserMedicalData(user.uid);
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
        <Content>
          <Form>
            <Label>Fill up your Profile</Label>
            <Label>Available for Donation of Blood</Label>
            <ToggleSwitch
              isOn={available}
              onColor="green"
              offColor="red"
              label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={(isOn) => {
                setAvailable(isOn);
              }}
            />

            <Item regular>
              <Label>Address</Label>
              <Input
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
            </Item>

            <Item regular>
              <Label>House Phone Number</Label>
              <Input
                value={home_phone}
                onChangeText={(value) => setHomePhone(value)}
              />
            </Item>

            <Label>Have any one of the below Disease:</Label>
            <Label>(If not, then leave it blank)</Label>
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

            <Item>
              <Label>Other Medical Details</Label>
              <Textarea
                value={medical}
                rowSpan={5}
                bordered
                placeholder="Textarea"
                onChangeText={(val) => setMedical(val)}
              />
            </Item>

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

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

let BloodUserDetails = connect(mapStateToProps, null)(BloodUserDetailsComp);
export {BloodUserDetails};
