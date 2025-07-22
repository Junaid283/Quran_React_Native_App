import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "./helperFunctions";

const Ayahs = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("");
  const [allSurahs, setAllSurahs] = useState([]);

  const { item } = route.params;
  console.log('item', item)

  let tempArray = [{ Name: "Urdu", trademark: "ur" }];
  useEffect(() => {
    setAllSurahs(item?.verses);
  }, []);

  const showModalFunc = () => {
    setShowModal(!showModal);
  };

  let sdf ="https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/ur/114.json"

  const getApiData = async (templanguage) => {
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${templanguage}/${item.id}.json`
      );
      const allData = await response.json();
      if (allData) {
        setAllSurahs(allData);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const printAyahs = (item) => {
    return (
      <View style={styles.AyahsMainView}>
        <View>
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
        <View>
          {item.translation ? (
            <Text
              style={{
                fontSize: scale(17),
                color: "rgba(204, 166, 43, 0.99)",
                fontWeight: "600",
              }}
            >
              {item.translation}({item.id})
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={showModalFunc}
      >
        <Pressable
          onPress={() => {
            showModalFunc();
          }}
          style={{
            flex: 1,
            backgroundColor: "#3b1941ff",
            height: Dimensions.get("window"),
            justifyContent: "center",
          }}
        >
          <View>
            <View style={{ padding: scale(10) }}>
              <Text
                style={{
                  color: "rgba(204, 166, 43, 0.99)",
                  fontSize: scale(15),
                }}
              >
                Available Languages:
              </Text>
            </View>
            <View
              style={{
                paddingVertical: verticalScale(20),
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexWrap: "wrap",
                borderRadius: scale(20),
                backgroundColor: "#301934",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_ur");
                  getApiData("ur");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Urdu</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_en");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>English</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_tr");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Turkish</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_sv");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Swedish</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_ru");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Russian</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_id");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Indonesian</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_fr");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>French</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_es");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Spanish</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_zh");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Chinese</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showModalFunc();
                  setLanguage("_bn");
                }}
              >
                <View style={styles.languageViewStyle}>
                  <Text style={styles.languageTextStyle}>Bengali</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  };
  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerInnerView}>
          <View
            style={{
              backgroundColor: "#301934",
              padding: scale(15),
              borderRadius: scale(20),
              shadowOpacity: 0.5,
            }}
          >
            <Text style={styles.typeStyle}>Surah No.{item?.id}</Text>
            <Text style={styles.typeStyle}>{item?.type}</Text>
            <Text style={styles.typeStyle}>
              Total Verses: {item?.total_verses}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#301934",
              padding: scale(15),
              paddingHorizontal: scale(15),
              borderRadius: scale(20),
              shadowOpacity: 0.5,
            }}
          >
            <Text style={styles.title}>{item?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={showModalFunc}
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#301934",
            padding: scale(10),
            borderRadius: scale(20),
            marginBottom: scale(5),
          }}
        >
          <View>
            <Text style={styles.languageTextStyle}>Select Language</Text>
          </View>
          <View>
            {language == "_ur" ? (
              <Text style={styles.languageTextStyle}>Urdu</Text>
            ) : language == "_en" ? (
              <Text style={styles.languageTextStyle}>English</Text>
            ) : language == "_tr" ? (
              <Text style={styles.languageTextStyle}>Turkish</Text>
            ) : language == "_ru" ? (
              <Text style={styles.languageTextStyle}>Russian</Text>
            ) : language == "_sv" ? (
              <Text style={styles.languageTextStyle}>Swedish</Text>
            ) : language == "_id" ? (
              <Text style={styles.languageTextStyle}>Indonesian</Text>
            ) : language == "_fr" ? (
              <Text style={styles.languageTextStyle}>French</Text>
            ) : language == "_es" ? (
              <Text style={styles.languageTextStyle}>Spanish</Text>
            ) : language == "_zh" ? (
              <Text style={styles.languageTextStyle}>Chinese</Text>
            ) : language == "_bn" ? (
              <Text style={styles.languageTextStyle}>Bengali</Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {renderModal()}
      {renderHeader()}
      <FlatList
        data={allSurahs}
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
    paddingBottom: scale(10),
    marginTop: scale(20),
  },
  AyahsMainView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    backgroundColor: "#301934",
    margin: verticalScale(1),
    borderRadius: scale(10),
  },

  languageViewStyle: {
    marginTop: scale(10),
    backgroundColor: "#301934",
    padding: scale(7),
    borderRadius: scale(20),
    borderColor: "rgba(204, 166, 43, 0.99)",
    borderWidth: scale(0.5),
  },
  languageTextStyle: {
    color: "rgba(204, 166, 43, 0.99)",
  },
  languageCancel: {
    marginTop: scale(10),
    backgroundColor: "#301934",
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(15),
    alignSelf: "center",
  },
});
