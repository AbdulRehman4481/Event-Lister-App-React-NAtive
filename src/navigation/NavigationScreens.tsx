import {
  AUTH_STACK_SCREEN,
  FRONTEND_STACK_SCREENS,
} from '../constants/Navigation';
import SignIn from '../screen/auth/signIn/SignIn';
import SignUp from '../screen/auth/signUp/SignUp';
import DetailTicket from '../screen/frontend/detailTicket/DetailTicket';
import EditEvents from '../screen/frontend/editEvents/EditEvents';
import EventDetail from '../screen/frontend/eventDetail/EventDetail';

export const AUTH_STACK_NAVIGATION_SCREENS = [
  {name: AUTH_STACK_SCREEN.SignIn, component: SignIn},
  {name: AUTH_STACK_SCREEN.SignUp, component: SignUp},
];

export const FRONTEND_STACK_NAVIGATION_SCREENS = [
  {name: FRONTEND_STACK_SCREENS.DetailTicket, component: DetailTicket},
  {name: FRONTEND_STACK_SCREENS.EditEvents, component: EditEvents},
  {name: FRONTEND_STACK_SCREENS.EventDetail, component: EventDetail},
];
