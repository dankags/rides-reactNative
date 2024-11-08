/* eslint-disable prettier/prettier */
import DriverCard from '@/components/DriverCard'
import RideLayout from '@/components/RideLayOut'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { data } from '../../constants/index';
import CustomBtn from '@/components/CustomBtn';
import { router } from 'expo-router';
import { useDriverStore } from '@/store';



const ConfirmRide = () => {
 const {drivers,selectedDriver,setSelectedDriver}=useDriverStore()


  return (
    <RideLayout title={'Choose a Rider'} snapPoints={["65%","85%"]}>
      <FlatList 
      data={drivers}
      renderItem={({item})=>
       <DriverCard item={item} selected={selectedDriver!} setSelected={()=>setSelectedDriver(Number(item.id))}/>
      }
      ListFooterComponent={() => (
        <View className="mx-5 mt-10">
          <CustomBtn
            title="Select Ride"
            onPress={() => router.push("/(root)/book-ride")}
          />
        </View>
      )}
      />
    </RideLayout>
  )
}

export default ConfirmRide