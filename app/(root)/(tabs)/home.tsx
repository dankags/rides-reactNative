/* eslint-disable prettier/prettier */
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import * as Location from "expo-location"
import { ActivityIndicator, FlatList, Image, Text,  TouchableOpacity,  View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { data, icons, images } from '../../../constants/index';
import RideCard from '@/components/RideCard';
import noResult from '@/assets/images/no-result.png';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import { useLocationStore } from '@/store';
import { useEffect, useState } from 'react';
import { useFetch } from '@/lib/fetch'
import { Ride } from '@/types/type'




export default function Page() {
  const { user } = useUser()
  const { signOut } = useAuth();
  const {setUserLocation,setDestinationLocation}=useLocationStore()
  const [hasPermission,setHasPermission]=useState(false)
  const {data:recentRides,loading,error}=useFetch<Ride[]>(`/(api)/(ride)/${user?.id}`)


  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className=' bg-general-500'>
      <FlatList
        data={recentRides?.slice(0,5)}
        renderItem={( {item }) => <RideCard ride={item} />}
        className='px-5 '
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom:100
        }}
        ListEmptyComponent={()=>
          <View className='flex items-center justify-center'>
            {!loading?
            <>
             <Image source={images.noResult} alt='No recent rides found' resizeMode='contain' className='w-40 h-40'/>
             <Text className='text-sm'>No recent rides found</Text>
            </>
            :
            <ActivityIndicator size={'small'} color='#000'/>}
          </View>
        }
        ListHeaderComponent={()=>
          <>
          <View className='flex flex-row items-center justify-between my-5'>
            <Text className='text-2xl font-JakartaBold capitalize'>Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]} 🖐️</Text>
            <TouchableOpacity onPress={handleSignOut} className='flex justify-center items-center w-10 h-10 rounded-full bg-white'>
              <Image source={icons.out} className='w-4 h-4'/>
            </TouchableOpacity>
          </View>
          
          {/* Google tet input*/}
          <GoogleTextInput handlePress={handleDestinationPress} icon={icons.search} containerStyle={`bg-white shadow-md shadow-neutral-300`}/>

          <>
            <Text className='text-xl font-JakartaBold mt-5 mb-3'>Your current location</Text>
            <View className='h-[300px] flex flex-row items-center bg-transparent'>
              <Map/>
            </View>
          </>

          <Text className='text-xl font-JakartaBold mt-5 mb-3'>Recent Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}