import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { scale, verticalScale } from "./helperFunctions";
import * as ImagePicker from "expo-image-picker";

const ScreenList = ({ navigation }) => {
  const [pickedImage, setPickedImage] = useState(null);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Media library access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Image,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <Image
          style={{ height: scale(150), width: Dimensions.get("window").width }}
          source={require("../assets/image2.jpg")}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("FlatList")}
        activeOpacity={0.5}
      >
        <Image
          style={{ height: scale(30), width: scale(30), marginRight: 10 }}
          source={require("../assets/quran.png")}
          resizeMode="contain"
        />
        <Text style={styles.optionText}>Open Quran</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={pickImageFromGallery}>
        <Text style={styles.optionText}>Pick from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={takePhotoWithCamera}>
        <Text style={styles.optionText}>Open Camera</Text>
      </TouchableOpacity>

      {pickedImage && (
        <Image
          source={{ uri: pickedImage }}
          style={{ width: 200, height: 200, alignSelf: "center", marginTop: 20 }}
        />
      )}
    </ScrollView>
  );
};

export default ScreenList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#301934",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    elevation: 3,
    borderWidth: 0.2,
    marginBottom: 10,
  },
  optionText: {
    color: "rgba(204, 166, 43, 0.99)",
    fontSize: scale(18),
    fontWeight: "bold",
  },
});
