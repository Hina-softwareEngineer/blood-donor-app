import React from 'react';
import {Container, Header, Content, Spinner} from 'native-base';
export function Spinner() {
  return (
    <Container>
      <Content>
        <Spinner color="red" />
      </Content>
    </Container>
  );
}
