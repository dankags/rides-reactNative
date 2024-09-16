/* eslint-disable prettier/prettier */

import { GoogleInputProps } from "@/types/type"
import { Text, View } from "react-native"


const GoogleTextInput = ({
  handlePress,
  icon,
  containerStyle,
  textInputBackgroundColor,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
      <Text className="">Search...</Text>
    </View>
  );
};

export default GoogleTextInput