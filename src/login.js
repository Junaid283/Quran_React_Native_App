import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { scale, verticalScale } from "./helperFunctions";

const Login = ({ navigation }) => {
  const [UserName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [UserNameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData !== null) {
        const parsed = JSON.parse(userData);
        console.log("Already Logged in:", parsed);
        navigation.replace("Screen_Lists");
      }
    } catch (e) {
      console.error("Error checking storage", e);
    }
  };

  const handleUsernameInput = (data) => {
    setName(data);
    if (UserNameError) setNameError("");
  };
  const handlePasswordInput = (data) => {
    setPassword(data);
    if (passwordError) setPasswordError("");
  };
  const ShowPassword = () => {
    setSecureText(!secureText);
  };
  const HandleNameError = () => {
    if (UserName.trim() === "") {
      setNameError("Email is required");
    } else if (UserName.trim() !== "" && !UserName.includes("@")) {
      setNameError("Email is invalid");
    } else if (UserNameError) {
      setNameError("");
    }
  };
  const HandlePasswordError = () => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (passwordError) {
      setPasswordError("");
    }
  };

  return (
    <ScrollView style={myStyle.container}>
      <View style={myStyle.header}>
        <Text style={myStyle.title}>Sign In</Text>
        <View style={myStyle.registerRow}>
          <Text style={myStyle.labelText}>Not Registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signup");
              if (UserNameError || passwordError) {
                setNameError("");
                setPasswordError("");
              }
            }}
          >
            <Text style={myStyle.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={myStyle.form}>
        <Text style={myStyle.label}>Email</Text>
        <TextInput
          style={myStyle.input}
          placeholder="Enter Email"
          placeholderTextColor={"#888"}
          onChangeText={handleUsernameInput}
          value={UserName}
          keyboardType="email-address"
        />
        {UserNameError ? (
          <Text style={myStyle.error}>{UserNameError}</Text>
        ) : null}

        <Text style={myStyle.label}>Password</Text>
        <View style={myStyle.passwordContainer}>
          <TextInput
            style={myStyle.passwordInput}
            placeholder="Enter Password"
            placeholderTextColor={"#888"}
            secureTextEntry={secureText}
            onChangeText={handlePasswordInput}
            value={password}
          />
          <TouchableOpacity onPress={ShowPassword} style={myStyle.eyeIcon}>
            <AntDesign name="eye" size={24} color="rgba(204, 166, 43, 0.99)" />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={myStyle.error}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={myStyle.buttonWrapper}>
        <TouchableOpacity
          style={myStyle.button}
          onPress={async () => {
            HandleNameError();
            HandlePasswordError();

            if (
              UserName.trim() !== "" &&
              password.trim() !== "" &&
              UserName.includes("@")
            ) {
              if (UserNameError || passwordError) {
                setName("");
                setPassword("");
              }

              try {
                const user = {
                  email: UserName,
                  password: password,
                };

                await AsyncStorage.setItem("userData", JSON.stringify(user));
                console.log("User logged in & saved");

                navigation.replace("Screen_Lists");
              } catch (e) {
                console.error("AsyncStorage error", e);
              }
            }
          }}
        >
          <Text style={myStyle.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={myStyle.forgotPasswordRow}>
        <Text style={myStyle.forgotPasswordText}>Forgot Password?</Text>
      </View>
    </ScrollView>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b1941ff",
  },
  header: {
    alignItems: "center",
    marginTop: scale(60),
  },
  title: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "rgba(204, 166, 43, 0.99)",
  },
  registerRow: {
    flexDirection: "row",
    marginTop: scale(10),
  },
  labelText: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "rgba(204, 166, 43, 0.99)",
  },
  registerLink: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#2563EB",
    marginLeft: scale(5),
    textDecorationLine: "underline",
  },
  form: {
    padding: scale(20),
    marginTop: scale(40),
  },
  label: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "rgba(204, 166, 43, 0.99)",
    marginBottom: scale(2),
  },
  input: {
    borderColor: "#301934",
    borderWidth: scale(2),
    fontSize: scale(12),
    color: "rgba(204, 166, 43, 0.99)",
    padding: scale(10),
    marginBottom: scale(15),
    borderRadius: scale(8),
    backgroundColor: "#301934",
  },
  passwordContainer: {
    flexDirection: "row",
    borderColor: "#301934",
    borderWidth: scale(2),
    alignItems: "center",
    borderRadius: scale(8),
    backgroundColor: "#301934",
    marginBottom: scale(5),
  },
  passwordInput: {
    flex: 1,
    fontSize: scale(12),
    color: "rgba(204, 166, 43, 0.99)",
    padding: scale(10),
  },
  eyeIcon: {
    paddingHorizontal: scale(10),
  },
  error: {
    color: "#c52b10f6",
    marginBottom: scale(10),
  },
  buttonWrapper: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(204, 166, 43, 0.99)",
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    alignItems: "center",
    marginTop: scale(10),
    elevation: 3,
  },
  buttonText: {
    color: "#301934",
    fontSize: scale(15),
    fontWeight: "bold",
    paddingHorizontal: scale(45),
  },
  forgotPasswordRow: {
    marginTop: scale(20),
    alignItems: "flex-end",
    paddingHorizontal: scale(30),
  },
  forgotPasswordText: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "rgba(204, 166, 43, 0.99)",
  },
  successMsgContainer: {
    alignItems: "center",
    marginTop: scale(50),
  },
  successMsg: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "rgba(204, 166, 43, 0.99)", // Green Success
  },
});

export default Login;
