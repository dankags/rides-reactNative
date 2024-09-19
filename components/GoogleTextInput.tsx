/* eslint-disable prettier/prettier */

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type"
import { Image, Text, View } from "react-native"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  handlePress,
  icon,
  containerStyle,
  textInputBackgroundColor,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        styles={{
          textInputContainer:{
            justifyContent:"center",
            alignItems:"center",
            marginHorizontal:20,
            borderRadius:20,
            position:"relative",
            shadowColor:"#d4d4d4"
          },
         textInput:{
          fontWeight:"600",
          fontSize:16,
          marginTop:5,
          width:"100%",
          borderRadius:200,
          backgroundColor: textInputBackgroundColor || "white"
         },
         listView:{
          backgroundColor: textInputBackgroundColor || "white",
          width:"100%",
          position:"relative",
          top:0,
          borderRadius:10,
          zIndex:99,
          shadowColor:"#d4d4d4"
         }
        }
        }
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GoogleTextInput