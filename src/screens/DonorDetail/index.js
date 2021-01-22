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
} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';

export function BloodUserDetails({navigation, user, loginUser}) {
  return (
    <Root>
      <Container>
        <Content>
          <Form>
            <Label>Fill up your Profile</Label>
            <Label>Available for Donation of Blood</Label>
            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="red"
              label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="large"
              onToggle={(isOn) => console.log('changed to : ', isOn)}
            />

            <Item>
              <Label>Address</Label>
              <Input onChangeText={(value) => setPhoneNumber(value)} />
            </Item>

            <Item>
              <Label>House Phone Number</Label>
              <Input onChangeText={(value) => setPhoneNumber(value)} />
            </Item>

            <Item>
              <Label>Do you have any one of the disease?</Label>
              <Text>1. Malaria</Text>
              <Text>2. Hepatitis</Text>
              <Text>3. HIV</Text>
              <Text>4. SYPHILIS</Text>
              <Text>5. Other</Text>
              <Input onChangeText={(value) => setUsername(value)} />
            </Item>
            <Item>
              <Label>Blood Group</Label>
              <ListItem>
                <Left>
                  <Text>A</Text>
                </Left>
                <Right>
                  <Radio selected={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>B</Text>
                </Left>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>AB</Text>
                </Left>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>O</Text>
                </Left>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
            </Item>

            <Item>
              <Label>Rh Factor (e.g AB+ , O-)</Label>
              <ListItem>
                <Left>
                  <Text>Positive</Text>
                </Left>
                <Right>
                  <Radio selected={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Negative</Text>
                </Left>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
            </Item>

            <Item>
              <Label>Other Medical Details</Label>
              <Textarea rowSpan={5} bordered placeholder="Textarea" />
            </Item>

            <Button primary onPress={onSubmitForm}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    </Root>
  );
}
