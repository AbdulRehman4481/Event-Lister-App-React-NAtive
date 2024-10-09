import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  TaskDetail: {id: number} | undefined;
};
export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

interface Task {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  status: string;
  categories: string[];
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Take Morning Medication',
    description:
      'At 08:00 AM, 02 Oct, 2024, take your morning medication as prescribed by your doctor.',
    date: '02 Oct, 2024 08:00 AM',
    categories: ['Medicine'],
    status: 'completed',
    image: require('../../../assets/tasks/medication2.webp'),
  },
  {
    id: 2,
    title: 'Schedule a Routine Health Checkup',
    description:
      'At 10:00 AM, 06 Oct, 2024, schedule a routine health checkup with your doctor.',
    date: '06 Oct, 2024 10:00 AM',
    categories: ['Medicine'],
    status: 'pending',
    image: require('../../../assets/tasks/health.webp'),
  },
  {
    id: 3,
    title: '30-Minute Cardio Workout',
    description:
      'At 07:00 AM, 01 Oct, 2024, perform a 30-minute cardio workout session.',
    date: '01 Oct, 2024 07:00 AM',
    categories: ['Exercise'],
    status: 'missed',
    image: require('../../../assets/tasks/sports-man-doing-crunches-exercise-tmklqw8p5nd2i09y.webp'),
  },
  {
    id: 4,
    title: 'Prepare a Healthy Meal Plan for the Week',
    description:
      'At 11:00 AM, 01 Oct, 2024, prepare a nutritious meal plan for the week.',
    date: '01 Oct, 2024 11:00 AM',
    categories: ['Food'],
    status: 'missed',
    image: require('../../../assets/tasks/meal.jpeg'),
  },
  {
    id: 5,
    title: 'Track Daily Water Intake',
    description:
      'At 06:00 PM, 02 Oct, 2024, monitor and log your daily water consumption.',
    date: '02 Oct, 2024 06:00 PM',
    categories: ['Medicine'],
    status: 'completed',
    image: require('../../../assets/tasks/water.jpg'),
  },
  {
    id: 6,
    title: 'Complete a Full-Body Stretching Routine',
    description:
      'At 08:30 AM, 07 Oct, 2024, complete a full-body stretching routine for flexibility.',
    date: '07 Oct, 2024 08:30 AM',
    categories: ['Exercise'],
    status: 'pending',
    image: require('../../../assets/tasks/f77da9406a3a76c70a1d3afab2bada0e.gif'),
  },
];

interface notificationType {
  title: string;
  message: string;
}

export default function Home() {
  const [projectList, setProjectList] = useState<Task[]>(tasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [category, setCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const navigationRef = useRef();
  const navigation = useNavigation<HomeScreenNavigationProp>(); 

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };
  const handlePlayText = (text: string) => {
    console.log('Text-to-Speech:', text);
  };

  const handleTaskCompletion = (status: string, taskId: number) => {
    const updatedList = projectList.map(task => {
      if (task.id === taskId) {
        return {...task, status};
      }
      return task;
    });
    setProjectList(updatedList);
    setFilteredTasks(
      updatedList.filter(task => (task.id !== taskId ? task : null)),
    );
    updateCategory(category);
  };

  const updateCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    filterTasks(selectedCategory, filterStatus);
  };

  const handleStatusChange = (selectedStatus: string) => {
    setFilterStatus(selectedStatus);
    filterTasks(category, selectedStatus);
  };
  const filterTasks = (selectedCategory: string, selectedStatus: string) => {
    let updatedTasks = projectList;

    if (selectedCategory !== 'All') {
      updatedTasks = updatedTasks.filter(task =>
        task.categories.some(
          cat => cat.toLowerCase() === selectedCategory.toLowerCase(),
        ),
      );
    }

    if (selectedStatus !== 'all') {
      updatedTasks = updatedTasks.filter(
        task => task.status.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }

    setFilteredTasks(updatedTasks);
  };

  const renderTask = ({item}: {item: Task}) => {
    let cardBgColor = '';
    let textColor = '';

    switch (item.status.toLowerCase()) {
      case 'completed':
        cardBgColor = '#00AB55';
        textColor = 'white';
        break;
      case 'pending':
        cardBgColor = '#E2A03F';
        textColor = 'white';
        break;
      case 'missed':
        cardBgColor = '#E7515A';
        textColor = 'white';
        break;
      default:
        cardBgColor = '#f3f3f3';
        textColor = 'black';
        break;
    }
    const imageSource =
      typeof item.image === 'string'
        ? {uri: item.image} // For remote images
        : item.image; // For local images (require)

    return (
      <View style={[styles.card, {backgroundColor: cardBgColor}]}>
        <Image source={imageSource} style={styles.taskImage} />
        <View style={styles.cardContent}>
          <Text
            style={[styles.cardTitle, {color: textColor}]}
            onPress={() => {
              console.log('press');
              navigation.navigate('TaskDetail', {id: item.id});
            }}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => handlePlayText(item.description)}>
            <Icon
              name="volume-up"
              size={20}
              style={[styles.icon, {color: textColor}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dateRow}>
          {/* <IconCalendar /> */}
          <Text style={[styles.cardDate, {color: textColor}]}>{item.date}</Text>
        </View>
        <View style={styles.buttonRow}>
          {/* Skip Button */}
          <Button
            title="Skip"
            onPress={() => handleTaskCompletion('missed', item.id)}
          />
          <Button
            title="Done"
            onPress={() => handleTaskCompletion('missed', item.id)}></Button>
          {/* <Button
            // mode="outlined"
            onPress={() => handleTaskCompletion("missed", item.id)}
            style={styles.button}
          >
            <View style={styles.iconWithText}>
               <Icon
                name="step-forward"
                size={20}
                color="red"
                style={styles.iconButtons}
              /> 
              <Text style={[styles.buttonText, { color: "red" }]}>Skip</Text>
            </View>
          </Button>  */}

          {/* Done Button */}
          {/* <Button
            mode="outlined"
            onPress={() => handleTaskCompletion("completed", item.id)}
            style={styles.button}
          >
            <View style={styles.iconWithText}>
              <Icon
                name="check"
                size={20}
                color="green"
                style={styles.iconButtons}
              />
              <Text style={[styles.buttonText, { color: "green" }]}>Done</Text>
            </View>
          </Button>  */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}></View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.taskList}
      />
      <Button title="Login" onPress={handleNavigateToLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskList: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
  },
  taskImage: {
    height: 100,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
    // You can also include color and other styles here
  }, // Adjust this line if using an SVG icon that expects ViewStyle
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    justifyContent: 'center', // Align content inside the button
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align icon and text together horizontally
  },
  iconButtons: {
    marginRight: 5, // Add space between icon and text
  },
  buttonText: {
    fontSize: 20, // Match icon size
  },
  filterSection: {
    // Define your styles for the filter section here
    marginBottom: 20, // Example style
    padding: 10, // Example style
    backgroundColor: '#f8f8f8', // Example style
    borderRadius: 8, // Example style
  }, // Ensure the correct type is used
});
