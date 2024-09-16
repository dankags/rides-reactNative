/* eslint-disable prettier/prettier */

import { InputFieldProps } from "@/types/type";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"


const InputField = ({
  labelStyle,
  label,
  icon,
  iconStyle,
  inputStyle,
  containerStyle,
  secureTextEntry = false,
  className,
  ...props
}:InputFieldProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" :"height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View className={`flex flex-row items-center justify-start relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
            {icon&& <Image source={icon} alt="" className={`w-6 h-6 ml-4 ${iconStyle}`}/>}
            <TextInput className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`} {...props}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField