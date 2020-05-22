import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button } from 'evergreen-ui';

const ContactActions = ({ id, deleteContact }) => {
  const [toHome, setToHome] = useState(false);

  const handleDelete = () => {
    deleteContact(id);
    setToHome(true);
  };

  return (
    <Fragment>
      {toHome && <Redirect to='/' />}
      <Button is={Link} iconBefore='arrow-left' to='/'>
        Back
      </Button>
      <Button intent='danger' onClick={handleDelete} iconBefore='trash'>
        Delete Contact
      </Button>
    </Fragment>
  );
};

export default withRouter(ContactActions);
