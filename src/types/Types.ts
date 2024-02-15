export interface User {
  name?: string;
  email?: string | null;
  photo?: string;
  uid?: string;
}

export interface AuthState {
  isAuth: boolean;
  user: User | null;
  isAppLoading: boolean;
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

export interface EventState {
  eventData: EventInfo[];
  todayEvent: EventInfo[];
  isLoading: boolean;
}

export interface SearchEventState {
  eventData: EventInfo[];
  myEventData: EventInfo[];
  isLoading: boolean;
}
