import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ShowToast from '../components/showToast/ShowTost';
import {launchImageLibrary} from 'react-native-image-picker';
import {EditEventInfo} from '../constants/Types';
import {FIRE_BASE_COLLECTION} from '../constants/FirebaseCollection';

export default function useEditEvents(eventId: string) {
  const [eventDetails, setEventDetails] = useState<EditEventInfo>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalVisible(false);
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
  const handleChange = (name: keyof EditEventInfo, value: string | number) => {
    setEventDetails((prevState: EditEventInfo | undefined) => ({
      ...prevState!,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = await firestore()
          .collection(FIRE_BASE_COLLECTION.EVENTINFO)
          .doc(eventId)
          .get();
        if (eventDoc.exists) {
          const eventData = eventDoc.data() as EditEventInfo;
          eventData.eventDate = eventData.eventDate.toDate();
          setSelectedOption(eventData.eventType || '');
          setEventDetails(eventData);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);
  const handleUpdatePost = async () => {
    if (eventDetails) {
      const {
        eventName,
        eventPrice,
        eventType,
        eventLocation,
        eventMapUrl,
        eventDate,
        eventImage: updateImage,
      } = eventDetails;

      try {
        setIsLoading(true);
        if (updateImage && updateImage !== eventDetails.eventImage) {
          const url = await uploadEventImage(updateImage);
          if (!url) {
            ShowToast('danger', 'Failed to upload image');
            return;
          }
          eventDetails.eventImage = url;
        }

        await firestore()
          .collection(FIRE_BASE_COLLECTION.EVENTINFO)
          .doc(eventId)
          .update({
            eventName,
            eventPrice,
            eventType,
            eventLocation,
            eventMapUrl,
            eventDate,
            eventImage: eventDetails.eventImage,
          });

        ShowToast('success', 'Event updated successfully!');
      } catch (error) {
        console.log('error', error);
        ShowToast('danger', 'Failed to update event');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openCamera = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    const uri = result?.assets?.[0]?.uri;
    if (uri) {
      setEventDetails({
        ...eventDetails,
        eventImage: uri,
      });
    }
  };

  const uploadEventImage = async (newImage: string) => {
    const fileName = Math.random().toString(36);
    var fileExtension = newImage.split('.').pop();
    const reference = storage().ref(`images/${fileName}.${fileExtension}`);
    const pathToFile = newImage;
    try {
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(`images/${fileName}.${fileExtension}`)
        .getDownloadURL();

      return url;
    } catch (error: any) {
      console.log('Error uploading file:', error);
      throw error;
    }
  };

  return {
    options,
    handleSelect,
    setIsModalVisible,
    openCamera,
    handleUpdatePost,
    handleChange,
    isModalVisible,
    isLoading,
    setSelectedOption,
    selectedOption,
    open,
    setOpen,
    eventDetails,
    setEventDetails,
  };
}
