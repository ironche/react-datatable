import { useReducer } from 'react';
import { Container, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { HomeContext, reducer, initialState, Actions } from '../state';

export default function CenteredLayout() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HomeContext.Provider value={{ state, dispatch, Actions }}>
      <Container sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={2}>
          <Outlet />
        </Paper>
      </Container>
    </HomeContext.Provider>
  );
}
