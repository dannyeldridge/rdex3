import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';
import { useStitchAuth } from '../StitchAuth';
import { useContactItems } from '../useContactItems';
import { useParams } from 'react-router-dom';
import ContactTop from './ContactTop';
import InteractionTable from './InteractionTable';
import AddInteractionForm from './AddInteractionForm';
import ContactActions from './ContactActions';

const Contact = () => {
  let { id } = useParams();
  const { currentUser } = useStitchAuth();
  const {
    actions: { getContact, addInteraction, deleteInteraction, deleteContact },
    contact,
    isLoading,
    interactions,
  } = useContactItems(currentUser.id);

  // useEffect(() => {
  //   getContact(id);
  // }, [id]);

  return (
    <Pane>
      <ContactTop contact={contact} />
      <AddInteractionForm addInteraction={addInteraction} id={id} />
      <ContactActions contact={contact} deleteContact={deleteContact} id={id} />
      <InteractionTable
        id={id}
        contact={contact}
        deleteInteraction={deleteInteraction}
        isLoading={isLoading}
        interactions={interactions}
      />
    </Pane>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContactById: PropTypes.func.isRequired,
};

export default Contact;
