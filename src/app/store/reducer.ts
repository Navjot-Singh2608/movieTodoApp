import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import {
  MovieState,
  movieReducer,
  userReducer,
} from './reducers/movie.reducer';
import { environment } from '../environment/environment';
import { logout } from './actions/movie.action';
import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<MovieState> = {
  movies: movieReducer,
  user: userReducer,
  router: routerReducer,
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<MovieState>[] = environment.production
  ? [logoutMeta]
  : [debugMeta, logoutMeta];
