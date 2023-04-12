import {
  Image,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  View,
  StyleSheet,
  LogBox,
} from "react-native";

function AdminProfile({ navigation }) {
  const [user, setUser] = useState("");
  const [oldName, setOldName] = useState("");
  const [fullName, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const db = firebase.firestore();
  const userId = firebase.auth().currentUser.uid;
  const userRef = db.collection("users").doc(userId);

  return (
    <View>
      <Text>Job List</Text>
    </View>
  );
}

export default AdminProfile;
