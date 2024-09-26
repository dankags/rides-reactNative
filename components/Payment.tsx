/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View ,Text, Image, Alert } from 'react-native'
import CustomBtn from './CustomBtn';
import { router } from 'expo-router';
import { images } from '@/constants';
import ReactNativeModal from 'react-native-modal';
import { useAuth } from '@clerk/clerk-expo';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';
import { useLocationStore } from '@/store';

const Payment = ({
    fullName,
    email,
    amount,
    driverId,
    rideTime,
  }: PaymentProps) => {
    const { userId } = useAuth();
    const [success, setSuccess] = useState<boolean>(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const {
        userAddress,
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationAddress,
        destinationLongitude,
      } = useLocationStore();
  

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler
      }
    });
    if (error) {
      // handle error
    }
  };

  const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    // Make a request to your own server.
    const { paymentIntent, customer } = await fetchAPI(
        "/(api)/(stripe)/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName || email.split("@")[0],
            email: email,
            amount: amount,
            paymentMethodId: paymentMethod.id,
          }),
        },
      );
    // Call the `intentCreationCallback` with your server response's client secret or error
   
    if (paymentIntent.client_secret) {
        const { result } = await fetchAPI("/(api)/(stripe)/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_method_id: paymentMethod.id,
              payment_intent_id: paymentIntent.id,
              customer_id: customer,
              client_secret: paymentIntent.client_secret,
            }),
          });

          if(result.client_secret){
            await fetchAPI("/(api)/ride/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: "paid",
                  driver_id: driverId,
                  user_id: userId,
                }),
            });

            intentCreationCallback({
                clientSecret: result.client_secret,
              });

          }
          
    } else {
      intentCreationCallback({error:paymentIntent?.error});
    }
  }

  useEffect(() => {
    initializePaymentSheet();
  }, []);


  const didTapCheckoutButton = async () => {
    // implement later
  }
 




    const openPaymentSheet=async()=>{
       await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
                setSuccess(true);
                
        }
    }

  return (
    <>
      <CustomBtn
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomBtn
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  )
}

export default Payment