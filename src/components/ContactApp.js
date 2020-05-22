import React from 'react';
import styled from '@emotion/styled';
import ErrorBoundary from 'react-error-boundary';
import { Card, CardTitle, Button } from 'reactstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// import TodoList from './TodoList';
// import TodoDetails from './TodoDetails';

export default function ContactApp() {
  let { path, url } = useRouteMatch();
  //
  return <div>Contact App</div>;
}

const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TodoCard = styled(Card)`
  max-width: 600px;
  align-items: center;
  width: 100%;
`;
const Title = styled(CardTitle)`
  margin: 0;
  h1 {
    padding: 20px;
    margin: 0;
  }
`;

// <ErrorBoundary>
//   <Layout>
//     <TodoCard>
//       <Switch>
//         <Route exact path={`${path}`} component={TodoList} />
//         <Route exact path={`/todo/:id`} component={TodoDetails} />
//       </Switch>
//     </TodoCard>
//   </Layout>
// </ErrorBoundary>
