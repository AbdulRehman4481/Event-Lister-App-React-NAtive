import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import ShowToast from '../components/showToast/ShowTost';
import { FIRE_BASE_COLLECTION } from '../constants/FirebaseCollection';
import { EventInfo } from '../constants/Types';
import { RootState } from '../store/store';

type EventImage = string | {assets: {uri: string; fileName: string}[]};

const initialEvent: EventInfo = {
  eventName: '',
  eventPrice: 0,
  eventType: '',
  eventLocation: '',
  eventDate: new Date(),
  eventMapUrl: '',
  uid: '',
  eventImage: '',
  createdBy: {
    email: '',
    name: '',
    uid: '',
    photoURL: '',
  },
};
export default function useAddEvents() {
  const [eventInfo, setEventInfo] = useState<EventInfo>(initialEvent);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [eventImage, setEventImage] = useState<EventImage>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalVisible(false)
  };

  const options = [
    'Exhibition',
    'Workshop',
    'Conference',
    'Festival',
    'Game',
    'Premiere',
    'Concert',
    'Charity Auction',
    'Show',
    'Gala',
    'Fair',
    'Comedy',
  ];
  const handleChange = (name: keyof EventInfo, value: string | number) => {
    setEventInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDate = (_event: any, date: Date | undefined) => {
    if (date) {
      setEventInfo({...eventInfo, eventDate: date});
    }
    setOpen(false);
  };

  const handlePostEvent = async () => {
    const {
      eventName,
      eventPrice,
      eventType,
      eventLocation,
      eventDate,
      eventMapUrl,
    } = eventInfo;

    if (
      !eventName ||
      !eventPrice ||
      !eventDate ||
      !eventLocation ||
      !eventMapUrl ||
      !eventDate
    ) {
      ShowToast('danger', 'Please Fill All Fields');
      return;
    }

    if (!eventImage) {
      ShowToast('danger', 'Please Upload Image');
      return;
    }
    const event = {
      eventName,
      eventPrice,
      eventType: selectedOption.toLowerCase(),
      eventDate,
      eventLocation,
      eventMapUrl,
      eventImage: eventImage ?? '',
      dateCreated: new Date().getTime(),
      uid: Math.random().toString(36).slice(2),
      createdBy: {
        name: user?.name,
        email: user?.email,
        uid: user?.uid,
      },
    };

    try {
      setIsLoading(true);
      if (!eventImage) {
        ShowToast('danger', 'Please Upload Image');
        return;
      }
      const url = await uploadEventImage(eventImage);
      if (!url) throw new Error('Image not uploaded');
      event.eventImage = url;
      await firestore()
        .collection(FIRE_BASE_COLLECTION.EVENTINFO)
        .doc(event.uid)
        .set(event);
    } catch (error) {
      console.log('error', error);
    } finally {
      ShowToast('success', 'Post Upload Successfully');
      setIsLoading(false);
      setEventInfo(initialEvent);
      setEventImage('');
    }
  };

  const openCamera = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setEventImage(result as EventImage);
  };

  const uploadEventImage = async (eventImage: EventImage) => {
    if (typeof eventImage === 'object') {
      const reference = storage().ref(eventImage.assets[0].fileName);
      const pathToFile = eventImage.assets[0].uri;
      try {
        await reference.putFile(pathToFile);
        const url = await storage()
          .ref(eventImage.assets[0].fileName)
          .getDownloadURL();
        return url;
      } catch (error: any) {
        throw new Error(error?.message);
      }
    }
  };

  return {
    isLoading,
    eventImage,
    eventInfo,
    openCamera,
    handleChange,
    handlePostEvent,
    handleDate,
    setOpen,
    open,
    setEventInfo,
    options,
    handleSelect,
    selectedOption,
    setIsModalVisible,isModalVisible
  };
}
