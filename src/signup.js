import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {scale,verticalScale} from "./helperFunctions";


const Signup = ({ navigation }) => {
  const [checkConfirmPassword, setConfirmPassword] = useState("");
  const [checkFirstPassword, setFirstPassword] = useState("");
  const [passwordNotSameMsg, setpasswordNotSameMsg] = useState("");

  const [FullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");

  const [userFullName, setuserFullName] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const [
    secureTextEntryCheckforNormalPassword,
    setsecureTextEntryCheckforNormalPassword,
  ] = useState(true);
  const [
    secureTextEntryCheckforNormalConfirmPassword,
    setsecureTextEntryCheckforNormalConfirmPassword,
  ] = useState(true);

  const userFullNameFun = (data) => {
    setuserFullName(data);
    if (FullNameError) setFullNameError("");
  };

  const userEmailFun = (data) => {
    setuserEmail(data);
    if (EmailError) setEmailError("");
  };

  const firstTimePassword = (data) => {
    setFirstPassword(data);
    if (passwordError) setPasswordError("");
  };

  const confirmTimePassword = (data) => {
    setConfirmPassword(data);
    if (confirmpasswordError) setConfirmPasswordError("");
  };

  const showPassword = () => {
    setsecureTextEntryCheckforNormalPassword(
      !secureTextEntryCheckforNormalPassword
    );
  };

  const showConfirmPassword = () => {
    setsecureTextEntryCheckforNormalConfirmPassword(
      !secureTextEntryCheckforNormalConfirmPassword
    );
  };

  const passwordsNotSame = () => {
    if (
      checkFirstPassword !== checkConfirmPassword &&
      checkFirstPassword.trim() !== "" &&
      checkConfirmPassword.trim() !== ""
    ) {
      setpasswordNotSameMsg("Passwords do not match.");
    } else {
      setpasswordNotSameMsg("");
    }
  };

  const handleFullNameError = () => {
    if (userFullName.trim() === "") setFullNameError("Full Name is required");
  };
  const handleEmailError = () => {
    if (userEmail.trim() === "") {
      setEmailError("Email is required");
    } else if (userEmail.trim() !== "" && !userEmail.includes("@")) {
      setEmailError("Email is invalid");
    }
  };
  const handlePasswordError = () => {
    if (checkFirstPassword.trim() === "")
      setPasswordError("Password is required");
  };
  const handleConfirmPasswordError = () => {
    if (checkConfirmPassword.trim() === "")
      setConfirmPasswordError("Confirm Password is required");
  };

  const allEntriesEmptyOnSubmit = () => {
    if (
      userFullName.trim() !== "" &&
      userEmail.trim() !== "" &&
      checkFirstPassword.trim() !== "" &&
      checkConfirmPassword.trim() !== "" &&
      checkFirstPassword === checkConfirmPassword &&
      userEmail.includes("@")
    ) {
      if (
        FullNameError ||
        EmailError ||
        passwordError ||
        confirmpasswordError
      ) {
        setuserEmail("");
        setuserFullName("");
        setFirstPassword("");
        setConfirmPassword("");
      }
      navigation.navigate("Login_Screen");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginHorizontal: 25, marginTop: 50 }}>
        <Text style={styles.heading}>Create New Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            placeholderTextColor="#888"
            onChangeText={userFullNameFun}
            value={userFullName}
          />
          {FullNameError ? (
            <Text style={styles.error}>{FullNameError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#888"
            onChangeText={userEmailFun}
            value={userEmail}
            keyboardType="email-address"
          />
          {EmailError ? <Text style={styles.error}>{EmailError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry={secureTextEntryCheckforNormalPassword}
              onChangeText={firstTimePassword}
              value={checkFirstPassword}
            />
            <TouchableOpacity onPress={showPassword} style={styles.eyeIcon}>
              <AntDesign name="eye" size={24} color="rgba(204, 166, 43, 0.99)" />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={secureTextEntryCheckforNormalConfirmPassword}
              onChangeText={confirmTimePassword}
              value={checkConfirmPassword}
            />
            <TouchableOpacity
              onPress={showConfirmPassword}
              style={styles.eyeIcon}
            >
              <AntDesign name="eye" size={24} color="rgba(204, 166, 43, 0.99)" />
            </TouchableOpacity>
          </View>
          {confirmpasswordError ? (
            <Text style={styles.error}>{confirmpasswordError}</Text>
          ) : null}
        </View>
        {passwordNotSameMsg ? (
          <Text style={[styles.error]}>{passwordNotSameMsg}</Text>
        ) : null}

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleFullNameError();
              handleEmailError();
              handlePasswordError();
              handleConfirmPasswordError();
              passwordsNotSame();
              allEntriesEmptyOnSubmit();
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b1941ff",
    flex: 1,
  },
  heading: {
    fontSize: scale(20),
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(204, 166, 43, 0.99)",
    marginBottom: scale(30),
  },
  inputContainer: {
    marginBottom: scale(10),
  },
  label: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "rgba(204, 166, 43, 0.99)",
    marginBottom: scale(6),
  },
  input: {
    backgroundColor: "#301934",
    borderWidth: scale(2),
    borderColor: "#301934",
    borderRadius: scale(10),
    padding: scale(10),
    fontSize: scale(12),
    color: "rgba(204, 166, 43, 0.99)",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(2),
    borderColor: "#301934",
    borderRadius: scale(10),
    backgroundColor: "#301934",
  },
  passwordInput: {
    flex: 1,
    padding: scale(10),
    fontSize: scale(12),
    color: "rgba(204, 166, 43, 0.99)",
  },
  eyeIcon: {
    paddingHorizontal: scale(12),
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
  error: {
    color: "red",
    marginTop: scale(4),
  },
  link: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: scale(12),
    textDecorationLine: "underline",
  },
});

export default Signup;
