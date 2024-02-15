import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import ShowToast from '../components/ShowToast/ShowTost';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {EventInfo} from '../types/Types';

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
  const [isloading, setIsloading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [eventImage, setEventImage] = useState<EventImage>();
  const user = useSelector((state: RootState) => state.auth.user);

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
      // eventUid,
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
      eventType,
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
      setIsloading(true);
      if (!eventImage) {
        ShowToast('danger', 'Please Upload Image');
        return;
      }
      const url = await uploadEventIamge(eventImage);
      if (!url) throw new Error('Image not uploaded');
      event.eventImage = url;
      await firestore().collection('eventInfo').doc(event.uid).set(event);
    } catch (error) {
      console.log('error', error);
    } finally {
      ShowToast('success', 'Post Upload Successfully');
      setIsloading(false);
      setEventInfo(initialEvent);
      setEventImage('');
    }
  };

  const openCamera = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setEventImage(result as EventImage);
  };

  const uploadEventIamge = async (eventImage: EventImage) => {
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
    isloading,
    eventImage,
    eventInfo,
    openCamera,
    handleChange,
    handlePostEvent,
    handleDate,
    setOpen,
    open,
    setEventInfo,
  };
}
