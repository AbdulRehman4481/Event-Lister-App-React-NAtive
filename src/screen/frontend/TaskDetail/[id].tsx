import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/Ionicons';
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

type RootStackParamList = {
  TaskDetail: {id: string};
};

export default function TaskDetail() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'TaskDetail'>>();
  const {id} = route.params;
  const [isCompleted, setIsCompleted] = useState(false);
  const [task, setTask] = useState<any | null>(null);
  useEffect(() => {
    console.log('i`m in Detail Page', id);
    const fetchedTask = tasks.find(t => t.id.toString() === id.toString());
    setTask(fetchedTask || null);
  }, [id]);

  if (!task) {
    return <Text>Task not found</Text>;
  }
  return (
    <View style={styles.container}>
      {/* Image and Go Back Button */}
      <View>
        <Image source={task.image} style={styles.image} />
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity> */}
      </View>

      {/* Task Details */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <TouchableOpacity
            onPress={() => console.log("Play task description")}
          >
            <Icon name="volume-high-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeRow}>
          <Icon name="calendar-outline" size={16} color="#555" />
          <Text style={styles.dateText}>{task.date}</Text>
          {/* <Icon name="time-outline" size={16} color="#555" />
          <Text style={styles.dateText}>{task.time}</Text> */}
        </View>

        <Text style={styles.description}>{task.description}</Text>

        {/* Medication Details */}
        <View style={styles.medicationBox}>
          <Text style={styles.subtitle}>Medication Details:</Text>
          <FlatList
            data={task.medicationDetails}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <Text style={styles.medicationText}>{item}</Text>
            )}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              isCompleted ? styles.completedButton : styles.defaultButton,
            ]}
            onPress={() => setIsCompleted(!isCompleted)}
          >
            <Icon
              name={
                isCompleted ? "checkmark-circle-outline" : "checkmark-circle"
              }
              size={24}
              color={isCompleted ? "green" : "#fff"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                isCompleted ? styles.completedText : styles.defaultText,
              ]}
            >
              {isCompleted ? "Completed" : "Mark as Done"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.skipButton]}>
            <Icon
              name="play-skip-forward-outline"
              size={24}
              color="red"
              style={styles.icon}
            />
            <Text style={[styles.buttonText, styles.skipText]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4" },
    image: { width: "100%", height: 200, resizeMode: "cover" },
    backButton: {
      position: "absolute",
      top: 10,
      left: 10,
      backgroundColor: "#000",
      padding: 10,
      borderRadius: 30,
    },
    content: { padding: 20 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { fontSize: 24, fontWeight: "bold", color: "#333" },
    dateTimeRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    dateText: { marginLeft: 5, marginRight: 20, color: "#555" },
    description: { fontSize: 16, color: "#555", marginBottom: 20 },
    medicationBox: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8 },
    subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
    medicationText: { fontSize: 16, color: "#555" },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      padding: 10,
      borderRadius: 5,
    },
    defaultButton: { backgroundColor: "#28a745" },
    completedButton: {
      borderWidth: 1,
      borderColor: "green",
      backgroundColor: "#fff",
      marginRight: 2,
    },
    skipButton: {
      borderWidth: 1,
      borderColor: "red",
      backgroundColor: "#fff",
      marginLeft: 2,
    },
    buttonText: { fontSize: 18, marginLeft: 10 },
    defaultText: { color: "#fff" },
    completedText: { color: "green" },
    skipText: { color: "red" },
    icon: { marginRight: 10 }, // <-- Added the icon style here
  });
  
  