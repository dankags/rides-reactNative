/* eslint-disable prettier/prettier */
import CustomBtn from "@/components/CustomBtn"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { useSignIn } from "@clerk/clerk-expo"
import { Link, router } from "expo-router"
import { useCallback, useState } from "react"
import { Image, ScrollView, Text, View } from "react-native"


const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])


  return (
    <ScrollView className=" flex-1 bg-white">
      <View className=" flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            alt=""
            className="w-full h-[250px] z-0 "
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 🖐️
          </Text>
        </View>

        <View className="p-5">

          <InputField
            label={"Email"}
            value={form.email}
            onChangeText={(value) => setform((prev) => ({ ...prev, email: value }))}
            placeholder="Enter Your Email"
            icon={icons.email}
          />
          <InputField
            label={"Password"}
            value={form.password}
            onChangeText={(value) => setform((prev) => ({ ...prev, password: value }))}
            placeholder="Enter Your PassWord"
            icon={icons.lock}
          />

          <CustomBtn title="Sign In" onPress={onSignInPress} className="mt-6"/>

          {/* OAuth */}
         <OAuth/>

          <Link href={"/(auth)/sign-up"} className="text-lg text-center text-general-200 mt-10">
            <Text>Don&apos;t have an account?</Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>

          {/* Verification Model */}
        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn