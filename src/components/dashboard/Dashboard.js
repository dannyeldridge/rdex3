import React, { Fragment } from 'react';
import Contacts from './Contacts';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Contact from '../contact/Contact';

const Dashboard = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Fragment>
        <Switch>
          <Route exact path={`${path}`}>
            <Contacts />
          </Route>
          <Route exact path={`/contacts/:id`}>
            <Contact />
          </Route>
        </Switch>
      </Fragment>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
