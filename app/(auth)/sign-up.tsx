/* eslint-disable prettier/prettier */
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import CustomBtn from "@/components/CustomBtn";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal"
import { fetchAPI } from "@/lib/fetch";


const SignUp = () => {
  
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verification, setVerification] = useState({
    state:"default",
    error:"",
    code:""
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress:form.email,
        password:form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({...verification,state:"pending"})
    } catch (err: any) {
      Alert.alert("Error",err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code:verification.code,
      })

      if (completeSignUp.status === 'complete') {
        // todo: Create database user
        await fetchAPI(`/(api)/user`,{
          method:"POST",
          body:JSON.stringify({
            name:form.name,
            email:form.email,
            clerkId:completeSignUp.createdUserId
          })
        })
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({...verification,state:"success"})
      } else {
        setVerification({...verification,error:`Verification failed`,state:"failed"})
      }
    } catch (err: any) {
      setVerification({...verification,error:err.errors[0].longMessage,state:"failed"})
    }
  }

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
            Create your account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label={"Name"}
            value={form.name}
            onChangeText={(value) =>
              setform((prev) => ({ ...prev, name: value }))
            }
            placeholder="Enter Your Name"
            icon={icons.person}
          />
          <InputField
            label={"Email"}
            value={form.email}
            onChangeText={(value) =>
              setform((prev) => ({ ...prev, email: value }))
            }
            placeholder="Enter Your Email"
            icon={icons.email}
          />
          <InputField
            label={"Password"}
            value={form.password}
            onChangeText={(value) =>
              setform((prev) => ({ ...prev, password: value }))
            }
            placeholder="Enter Your PassWord"
            icon={icons.lock}
          />

          <CustomBtn title="Sign up" onPress={onSignUpPress} className="mt-6" />

          {/* OAuth */}
          <OAuth />

          <Link
            href={"/(auth)/sign-in"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Sign in</Text>
          </Link>
        </View>
        {/* Verification Model */}
        <ReactNativeModal
          isVisible={verification.state==="pending"}
          onModalHide={() =>{
            if(verification.state==="success") setShowSuccessModal(true);
          }
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-JakartaMedium mb-5">
              We&apos;ve sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="1234"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code)=>setVerification(prev=>({...prev,code}))}
            />
            {verification.error&&<Text className="text-red-500 text-sm mt-1">{verification.error}</Text>}
            <CustomBtn title="Verify Email" onPress={onPressVerify} className="mt-5 bg-success-500"/>
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold">
              Verified
            </Text>
            <Text className="text-base text-center text-gray-400 font-JakartaLight mt-2">
              You have successfully verified your account.
            </Text>
            <CustomBtn
              title="Browse home"
              onPress={() => {
                setShowSuccessModal(false)
                router.replace("/(root)/(tabs)/home")}}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
