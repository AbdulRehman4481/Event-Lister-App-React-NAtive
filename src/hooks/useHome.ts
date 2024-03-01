import { useEffect, useState } from 'react';
import { EventInfo } from '../constants/Types';
import {
  fetchEvents,
  fetchTodayEvents,
} from '../store/reducer/eventFetchReducer';
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/storeHook';

export default function useHome() {
  const [showSorted, setShowSorted] = useState(false);
  const [filterData, setFilterData] = useState<EventInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const allEvents = useAppSelector(
    (state: RootState) => state.events.eventData,
  );
  const todayEvent = useAppSelector(
    (state: RootState) => state.events.todayEvent,
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.events.isLoading,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchEvents());
        await dispatch(fetchTodayEvents());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const sortedEventsGet = async (
    values: number[],
    selectedValue: string,
    date: any,
  ) => {
    try {
      const filteredData = await allEvents.filter(event => {
        const eventPrice = event.eventPrice;
        const eventType = event.eventType.toLowerCase();
        const selectedValueToLower = selectedValue.toLowerCase();
        const eventDate = new Date(event.eventDate);

        if (!selectedValueToLower) {
          const dateCondition = eventDate >= new Date(date);
          const priceCondition =
            eventPrice >= values[0] && eventPrice <= values[1];
          const typeCondition =
            !selectedValueToLower || eventType === selectedValueToLower;
          return typeCondition && priceCondition && dateCondition;
        } else {
          const dateCondition = eventDate >= new Date(date);
          const priceCondition =
            eventPrice >= values[0] && eventPrice <= values[1];
          return priceCondition && dateCondition;
        }
      });
      setFilterData(filteredData);
      setShowSorted(true);
    } catch (error) {
      console.error('Error sorting events:', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredSearchResults = allEvents.filter(event => {
        const eventNameLowerCase = event.eventName.toLowerCase();
        return eventNameLowerCase.includes(searchQuery.toLowerCase());
      });
      setFilterData(filteredSearchResults);
      setShowSorted(true);
    } else {
      setFilterData([]);
      setShowSorted(false);
    }
  }, [searchQuery]);

  return {
    sortedEventsGet,
    isLoading,
    todayEvent,
    allEvents,
    filterData,
    setFilterData,
    setShowSorted,
    showSorted,
    searchQuery,
    setSearchQuery,
  };
}
