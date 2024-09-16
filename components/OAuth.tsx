/* eslint-disable prettier/prettier */
import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomBtn from './CustomBtn'
import { icons } from '@/constants'

const OAuth = () => {

  const handleGoogleSignIn=async()=>{

  }
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <View className=" py-6 flex gap-y-5">
        <CustomBtn
          title="Log In with Google"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
          bgVariant='outline'
          textVariant='primary'
          onPress={handleGoogleSignIn}

        />
      </View>
    </View>
  );
}

export default OAuth