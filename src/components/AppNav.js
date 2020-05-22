import React from 'react';
import { Pane, Button, Heading } from 'evergreen-ui';
import { NavbarBrand } from 'reactstrap';

export const AppNav = ({ isLoggedIn, handleClick }) => {
  return (
    <Pane
      display='flex'
      paddingTop={8}
      paddingBottom={8}
      background='tint2'
      borderRadius={3}
    >
      <Pane flex={1} alignItems='center' display='flex' marginLeft={86}>
        <NavbarBrand href='/'>RDex</NavbarBrand>
      </Pane>
      <Pane>
        {isLoggedIn && (
          <Button color='secondary' onClick={handleClick} marginRight={86}>
            Logout
          </Button>
        )}
      </Pane>
    </Pane>
  );
};
