import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { useStitchAuth } from './StitchAuth';
import { Card, CardBody, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export function Login() {
  let history = useHistory();
  const { actions } = useStitchAuth();
  return (
    <Fragment>
      <LoginCard>
        <CardBody>
          <ButtonRow>
            <LoginButton
              provider='anonymous'
              onClick={() =>
                actions.handleLogin('anonymous').then(() => {
                  history.push('/');
                })
              }
            >
              Log In as a Guest User
            </LoginButton>
            <LoginButton
              provider='google'
              onClick={() => actions.handleLogin('google')}
            >
              Log In with Google
            </LoginButton>
          </ButtonRow>
        </CardBody>
      </LoginCard>
    </Fragment>
  );
}
const Layout = styled.div`
  background: #eeeeee;
  height: 100%;
  padding: 20px;
`;
const LoginCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
`;
const LoginButton = styled(Button)`
  margin-top: 10px;
  :first-of-type {
    margin-top: 0px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
`;

{
  /* <LoginButton
                provider='google'
                onClick={() => actions.handleLogin('google')}
              >
                Log In with Google
              </LoginButton> */
}
