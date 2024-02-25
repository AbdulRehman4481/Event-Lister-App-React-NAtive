import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EventInfo } from '../constants/Types';
import {
  fetchMyPostEvents,
} from '../store/reducer/myEventReducer';
import { RootState } from '../store/store';
import { useAppDispatch } from '../store/storeHook';

export default function useDiscovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState<EventInfo[]>()
  const dispatch = useAppDispatch();
  const allEvents = useSelector(
    (state: RootState) => state.events.eventData,
  );
  const myPostEvents = useSelector(
    (state: RootState) => state.myEvents.myEventData,
  );
  const isLoading = useSelector(
    (state: RootState) => state.myEvents.isLoading,
  );

  useEffect(() => {
    if (searchQuery) {
      const searchEvents = allEvents.filter(event => {
        const eventNameLowerCase = event.eventName.toLowerCase();
        return eventNameLowerCase.includes(searchQuery.toLowerCase());
      });
      setFilterData(searchEvents);
    } else {
      setFilterData([]);
    }
  }, [searchQuery]);


  useEffect(() => {
    dispatch(fetchMyPostEvents());
  }, [dispatch, searchQuery]);
  return {searchQuery, isLoading, setSearchQuery, myPostEvents, filterData};
}
