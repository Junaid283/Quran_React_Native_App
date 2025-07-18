import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "./helperFunctions";

const Flatlist = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [allSurahs, setAllSurahs] = useState([]);
  const [tempSurahs, setTempSurahs] = useState([]);


  const handleSearchInput = (data) => {
    data = data.toLowerCase();
    setSearchInput(data);
    if (data.trim() === "") {
      setAllSurahs(tempSurahs);
      return;
    }
    const filtered = tempSurahs?.filter((item) =>
      item.transliteration.toLowerCase().includes(data)
    );
    setAllSurahs(filtered);
  };

  const ClearInput = () => {
    setSearchInput("");
  };

  const getApiData = async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json"
      );
      const allData = await response.json();
      if (allData) {
        setAllSurahs(allData);
        setTempSurahs(allData);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const myCard = (item) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Ayahs_Details", { item });
      }}
      activeOpacity={0.5}
    >
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            style={{ height: scale(40), width: scale(40) }}
            source={require("../assets/image1.png")}
            resizeMode="contain"
          />
        </View>

        <View style={styles.middleContent}>
          <Text style={styles.name}>{item?.transliteration}</Text>
          <Text style={styles.verseNumber}>
            Total Verses: {item?.total_verses}
          </Text>
        </View>

        <View style={styles.endContent}>
          <Text style={styles.name}>{item?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const searchBarFun = () => (
    <View style={styles.searchWrapper}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="rgba(204, 166, 43, 0.99)"
          onChangeText={handleSearchInput}
          value={searchInput}
          style={styles.searchBarStyle}
        />
        {searchInput ? (
          <TouchableOpacity onPress={ClearInput}>
            <Entypo name="cross" size={25} color="rgba(204, 166, 43, 0.99)" />
          </TouchableOpacity>
        ) : (
          <EvilIcons name="search" size={28} color="rgba(204, 166, 43, 0.99)" />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {searchBarFun()}
      <FlatList
        data={allSurahs}
        renderItem={({ item }) => myCard(item)}
        keyExtractor={(item) => item.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b1941ff",
  },
  searchWrapper: {
    marginTop: scale(20),
    marginBottom: scale(10),
    backgroundColor: "#301934",
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBarStyle: {
    padding: scale(12),
    fontSize: scale(15),
    color: "rgba(204, 166, 43, 0.99)",
    flex: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#301934",
    borderRadius: scale(10),
    padding: scale(10),
    margin: verticalScale(1),
    alignItems: "center",
  },
  imageWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "15%",
  },
  middleContent: {
    justifyContent: "flex-start",
    width: "50%",
    marginLeft: 10,
  },
  endContent: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "30%",
  },
  name: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "rgba(204, 166, 43, 0.99)",
  },
  verseNumber: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "rgba(204, 166, 43, 0.99)",
  },
});

export default Flatlist;
