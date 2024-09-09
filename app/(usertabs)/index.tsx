import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  Animated,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LinearGradient from "react-native-linear-gradient";

export default function HomeScreen() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [enable, setEnable] = useState(false);

  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setEnable(false);
      return;
    }

    await Location.getCurrentPositionAsync()
      .then((location) => {
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setEnable(true);
      })
      .catch(() => {
        setEnable(false);
      });
  };

  const checkLocationService = async () => {
    const isServiceEnabled = await Location.hasServicesEnabledAsync();
    if (isServiceEnabled) {
      userLocation();
    } else {
      setEnable(false);
    }
  };

  useEffect(() => {
    checkLocationService();

    const intervalId = setInterval(checkLocationService, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(progress1, {
        toValue: 5,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(progress2, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(progress3, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [progress1, progress2, progress3]);

  return (
    <ScrollView>
      <SafeAreaView style={style.safeAreaView}>
        {/* Top */}
        <View style={style.top}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "sans-serif",
              color: "black",
              backgroundColor: "white",
            }}
          >
            WELCOME USER
          </Text>
        </View>

        {/* Middle */}
        <View style={style.middle}>
          <MapView
            style={style.map}
            region={mapRegion}
            showsUserLocation={true}
            mapType="standard"
          >
            <Marker coordinate={mapRegion} title="Your Location" />
            <Circle
              center={mapRegion}
              radius={200}
              fillColor="rgba(255,0,0,0.2)"
              strokeWidth={2}
              strokeColor="rgba(255,0,0,0.5)"
            />
          </MapView>

          <Button title="View Location" onPress={userLocation} />
        </View>

        {/* Bottom */}
        <View style={style.bottom}>
          {/*----------------- Progress Bar */}

          <View style={style.container}>
            <Text style={style.title}>Progress Bar</Text>

            <View style={style.progressBar}>
              {/* Alloted segment*/}
              <Animated.View
                style={[
                  style.progressSegment,
                  {
                    flex: progress1, // Animate the flex value
                    backgroundColor: "royalblue",
                  },
                ]}
              />
            </View>

            <View style={style.legendItem}>
              <Text style={{ color: "royalblue" }}>• Alloted Hours</Text>
              <Text>100%</Text>
            </View>

            {/* Progress Bar */}
            <View style={style.progressBar}>
              {/* Second segment  */}
              <Animated.View
                style={[
                  style.progressSegment,
                  {
                    flex: progress2, // Animate the flex value
                    backgroundColor: "#1E90FF",
                  },
                ]}
              />

              {/* Third segment*/}
              <Animated.View
                style={[
                  style.progressSegment,
                  {
                    flex: progress3, // Animate the flex value
                    backgroundColor: "#00BFFF",
                  },
                ]}
              />
            </View>

            {/* Legend */}
            <View style={style.legendContainer}>
              <View style={style.legendItem}>
                <Text style={{ color: "#1E90FF" }}>• Completed WorkHours</Text>
                <Text>56%</Text>
              </View>
              <View style={style.legendItem}>
                <Text style={{ color: "#00BFFF" }}>• Remaning WorkHours</Text>
                <Text>44%</Text>
              </View>
            </View>
          </View>

          {/*----------------- Progress Bar Ends  */}

          {/* Card No.1 */}
          <View style={style.card}>
            <View style={style.cardLeft}>
              <MaterialIcons
                name="people-alt"
                style={{ paddingLeft: scale(7), margin: scale(5) }}
                size={25}
                color="black"
              />
              <Text style={style.text}>GPS</Text>
            </View>
            {enable ? (
              <Text style={style.sideTextEnable}>Enabled</Text>
            ) : (
              <Text style={style.sideTextDisable}>Disabled</Text>
            )}
          </View>

          {/* Card No.2 */}
          <View style={style.card}>
            <View style={style.cardLeft}>
              <MaterialIcons
                name="summarize"
                style={{ paddingLeft: scale(7), margin: scale(5) }}
                size={25}
                color="black"
              />
              <Text style={style.text}>Current Status</Text>
            </View>
            {enable ? (
              <Text style={style.sideTextEnable}>Checked In</Text>
            ) : (
              <Text style={style.sideTextDisable}>Checked Out</Text>
            )}
          </View>

          {/* Card No.3 */}

          {/* First_Section */}
          <View style={style.card}>
            <View style={style.cardLeft}>
              <FontAwesome
                name="hourglass"
                style={{ paddingLeft: scale(7), margin: scale(5) }}
                size={20}
                color="black"
              />
              <Text style={style.text}>Alloted WorkHours</Text>
            </View>
            <Text style={style.miniCardRightText}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginLeft: "auto",
                  color: "royalblue",
                }}
              >
                8 Hr
              </Text>
            </Text>
          </View>

          {/* Second_Section */}
          <View style={style.card}>
            <View style={style.cardLeft}>
              <FontAwesome6
                name="hourglass-2"
                style={{ paddingLeft: scale(7), margin: scale(5) }}
                size={25}
                color="black"
              />
              <Text style={style.text}>Completed WorkHours</Text>
            </View>
            <Text style={style.miniCardRightText}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginLeft: "auto",
                  color: "royalblue",
                }}
              >
                4.5 Hr
              </Text>
            </Text>
          </View>

          {/* Third_Section */}
          <View style={style.card}>
            <View style={style.cardLeft}>
              <FontAwesome6
                name="hourglass-2"
                style={{ paddingLeft: scale(7), margin: scale(5) }}
                size={25}
                color="black"
              />
              <Text style={style.text}>Remaining WorkHours</Text>
            </View>
            <Text style={style.miniCardRightText}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginLeft: "auto",
                  color: "royalblue",
                }}
              >
                3.5 Hr
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "1000%",
  },

  card: {
    width: scale(312),
    height: verticalScale(68),
    margin: moderateScale(10),
    paddingRight: moderateScale(20),
    paddingVertical: scale(20),
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "flex-end",
    shadowColor: "black",
    elevation: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  miniCard: {
    width: scale(300),
    height: scale(60),
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    elevation: 3,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: "auto",
  },

  bigCard: {
    width: scale(300),
    margin: scale(10),
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "flex-end",
    shadowColor: "black",
    elevation: 10,
    flex: 1,
    flexDirection: "column",
    gap: scale(10),
    justifyContent: "space-between",
    paddingVertical: scale(10),
  },

  cardLeft: {
    flex: 1,
    flexDirection: "row",
  },

  top: {
    width: scale(349.5),
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },

  middle: {
    width: scale(355),
    height: verticalScale(250),
  },

  bottom: {
    width: scale(345),
    margin: 10,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },

  map: {
    width: scale(340),
    height: verticalScale(250),
    borderRadius: 20,
    alignSelf: "center",
    overflow: "hidden",
    borderColor: "#007aff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  button: {
    margin: scale(10),
    width: scale(300),
    padding: moderateScale(40),
  },

  sideTextDisable: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: scale(110),
    color: "red",
  },

  sideTextEnable: {
    color: "green",
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    // marginLeft: scale(5),
  },

  miniCardText: {
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "center",
  },

  miniCardRightText: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: scale(20),
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  progressBar: {
    flexDirection: "row",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  progressSegment: {
    height: "100%",
  },
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});