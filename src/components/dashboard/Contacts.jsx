import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import ContactsTable from './ContactsTable';
import AddContactForm from './AddContactForm';
import { useStitchAuth } from '../StitchAuth';
import { useContactItems } from '../useContactItems';
import { Spinner } from 'reactstrap';

const Contacts = () => {
  const { currentUser } = useStitchAuth();
  const { contacts, isLoading, actions } = useContactItems(currentUser.id);

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h4>Contacts</h4>
      <AddContactForm isLoading={isLoading} actions={actions} />
      <ContactsTable contacts={contacts} />
    </Fragment>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
