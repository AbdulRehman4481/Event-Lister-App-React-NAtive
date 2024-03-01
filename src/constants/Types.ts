import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsLists} from '../screen/frontend';

export interface SigInUser {
  email?: string | null;
  password?: string | null;
}

export interface SignUpState {
  name: string;
  email: string | null;
  password: string;
  photo: string;
  uid: string;
}

export interface CheckUser {
  name?: string;
  email?: string | null;
  photo?: string;
  uid?: string;
}

export interface DetailUserData {
  dateCreated: {
    nanoseconds: number;
    seconds: number;
  };
  email: string;
  name: string;
  photo: string;
  uid: string;
}

export interface AuthState {
  isAuth: boolean;
  user: CheckUser | null;
  isAppLoading: boolean;
}

export interface EventState {
  eventData: EventInfo[];
  todayEvent: EventInfo[];
  isLoading: boolean;
}

export interface MyEventState {
  myEventData: EventInfo[];
  isLoading: boolean;
}

export interface EditEventInfo {
  eventName?: string;
  eventPrice?: string;
  eventType?: string;
  eventLocation?: string;
  eventMapUrl?: string;
  eventDate?: any;
  eventImage?: string;
  uid?: string;
  createdBy?: {
    email?: string;
    name?: string;
    uid?: string;
    photoURL?: string;
  };
}
export type EventImage = string | {assets: {uri: string; fileName: string}[]};

export interface TicketInfo {
  eventDate: any;
  eventId: string;
  eventImage: string;
  eventLocation: string;
  eventMapUrl: string;
  eventName: string;
  eventPrice: string;
  eventType: string;
  userEmail: string;
  userId: string;
  userName: string;
}
export interface EventInfo {
  eventName: string;
  eventPrice: number;
  eventType: string;
  eventLocation: string;
  eventMapUrl: string;
  eventDate: Date;
  eventImage: string;
  uid: string;
  createdBy: {
    email: string;
    name: string;
    uid: string;
    photoURL: string;
  };
}

export interface SignInScreenProp {
  navigation: StackNavigationProp<RootStackParamsList, 'SignIn'>;
}

export interface SigUpScreenProp {
  navigation: StackNavigationProp<RootStackParamsList, 'SignUp'>;
}
export interface DiscoveryScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'EditEvents'>;
}
export interface DetailTicketScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'DetailTicket'>;
  route: any;
}
export interface EventDetailScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'EventDetail'>;
}



export type RootStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackNavigationProps<T extends keyof RootStackParamsList> = {
  navigation: StackNavigationProp<RootStackParamsList, T>;
};
