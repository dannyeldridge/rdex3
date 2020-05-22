import React, { Fragment } from 'react';
import { Table, Spinner, Pane } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';

const ContactsTable = ({ contacts }) => {
  const history = useHistory();

  let bodyContent;
  if (contacts === null) {
    bodyContent = <Spinner />;
  } else if (contacts.length === 0) {
    bodyContent = <p>Add a contact to get started.</p>;
  } else {
    bodyContent = (
      <Fragment>
        {contacts.map((contact) => (
          <Table.Row
            key={contact._id}
            isSelectable
            onSelect={() => history.push(`/contacts/${contact._id}`)}
          >
            <Table.TextCell>{contact.name}</Table.TextCell>
            <Table.TextCell>
              {contact.interactions.length > 0 && (
                <Moment
                  date={contact.interactions[0].date}
                  format='YYYY/MM/DD'
                />
              )}
            </Table.TextCell>
          </Table.Row>
        ))}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Pane>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Last Interaction</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>{bodyContent}</Table.Body>
        </Table>
      </Pane>
    </Fragment>
  );
};

ContactsTable.propTypes = {};

export default ContactsTable;
