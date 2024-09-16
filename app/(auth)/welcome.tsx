/* eslint-disable prettier/prettier */
import CustomBtn from "@/components/CustomBtn"
import { onboarding } from "@/constants"
import { router } from "expo-router"
import { useRef, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Swiper from "react-native-swiper"


const OnBoarding = () => {
  const swiperRef=useRef<Swiper>(null)
  const [activeIndex,setAtiveindex]=useState<number>(0)
  const isLastIndex= activeIndex===onboarding.length-1


  return (
    <SafeAreaView className="h-full flex items-center justify-between">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-sm font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0]" />}
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setAtiveindex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              alt=""
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="w-full flex flex-row items-center justify-center mt-10">
              <Text className="text-black text-3xl font-bold text-center mx-10">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomBtn
        title={isLastIndex ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        onPress={()=>
          isLastIndex
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
}

export default OnBoarding