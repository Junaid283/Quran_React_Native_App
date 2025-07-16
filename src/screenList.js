import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { scale, verticalScale } from "./helperFunctions";
const ScreenList = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        
      }}
    >
     
      <View>
        <Image
          style={{ height: scale(150), width: Dimensions.get("window") }}
          source={require("../assets/image2.jpg")}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("FlatList");
        }}
        activeOpacity={0.5}
      >
        <View style={{ marginRight: 10 }}>
          <Image
            style={{ height: scale(30), width: scale(30) }}
            source={require("../assets/quran.png")}
            resizeMode="contain"
          />
        </View>

        <View>
          <Text
            style={{ color: "rgba(204, 166, 43, 0.99)", fontSize: scale(20), fontWeight: "bold" }}
          >
            Open Quran
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenList;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#301934",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(10),
    elevation: 3,
    borderWidth: 0.2,
  },

});
