import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { scale, verticalScale } from "./helperFunctions";

const Ayahs = ({ route }) => {
  const { item } = route.params;
  let verses = item?.verses;
  console.log("verses", verses);

  const printAyahs = (item) => {
    return (
      <View style={styles.AyahsMainView}>
        
        <Text
          style={{
            fontSize: scale(17),
            color: "rgba(204, 166, 43, 0.99)",
            fontWeight: "600",
          }}
        >
          {item.text}({item.id})
        </Text>
      </View>
    );
  };

  const drawPic = (item) => {
    return (
      <View>
        <Image
          source={require("../assets/Bismillah.png")}
          resizeMode="contain"
          style={{ width: Dimensions.get("window") }}
        />
        <View style={styles.headerInnerView}>
          <View
            style={{
              backgroundColor: "#301934",
              padding: scale(15),
              borderRadius: scale(20),
              shadowOpacity:0.5,
              
            }}
          >
            <Text style={styles.typeStyle}>Surah No.{item?.id}</Text>
            <Text style={styles.typeStyle}>{item?.type}</Text>
            <Text style={styles.typeStyle}>Total Verses: {item?.total_verses}</Text>
          </View>
          <View
            style={{
              backgroundColor: "#301934",
              padding: scale(15),
              paddingHorizontal:scale(15),
              borderRadius: scale(20),
              shadowOpacity:0.5,
            }}
          >
            <Text style={styles.title}>{item?.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {drawPic(item)}
      <FlatList
        data={verses}
        renderItem={({ item }) => printAyahs(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Ayahs;

const styles = StyleSheet.create({
  title: {
    fontSize: scale(20),
    color: "rgba(204, 166, 43, 0.99)",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#3b1941ff",
    //marginHorizontal: scale(20),
  },
  typeStyle: {
    fontSize: scale(15),
    color: "rgba(204, 166, 43, 0.99)",
    fontWeight: "600",
  },
  headerInnerView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "rgba(204, 166, 43, 0.99)",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  AyahsMainView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    //marginHorizontal: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "#301934",
    margin: verticalScale(1),
    borderRadius: scale(10),
  },
});
