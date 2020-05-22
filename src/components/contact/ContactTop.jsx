import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';

const ContactTop = ({ contact }) => {
  return (
    <Fragment>
      {contact && (
        <Pane>
          <h3>{contact.name}</h3>
        </Pane>
      )}
    </Fragment>
  );
};

ContactTop.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactTop;
