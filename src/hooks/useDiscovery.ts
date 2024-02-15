import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../store/reducer/authReducer';
import {RootState} from '../store/store';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import { User } from '../types/Types';
import { useAppDispatch } from '../store/storeHook';
import { fetchMyPostEvents, fetchSeachEvents } from '../store/reducer/searchEventReducer';

export default function useDiscovery() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useAppDispatch();
    const searchEvents = useSelector(
      (state: RootState) => state.searchEvents.eventData,
    );
    const myPostEvents = useSelector(
      (state: RootState) => state.searchEvents.myEventData,
    );
    const isLoading = useSelector((state: RootState) => state.events.isLoading);
    useEffect(() => {
      dispatch(fetchSeachEvents(searchQuery));
      dispatch(fetchMyPostEvents());
    }, [dispatch, searchQuery]);
  return {searchQuery, isLoading,setSearchQuery,myPostEvents,searchEvents};
}
