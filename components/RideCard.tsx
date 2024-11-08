/* eslint-disable prettier/prettier */
import { Image, Text, View } from 'react-native';
import { Ride } from '@/types/type';
import { icons, images } from '@/constants';
import { formatDate, formatTime } from '@/lib/utils';


const RideCard = ({ride:{
    destination_longitude,
    destination_latitude,
    destination_address,
    origin_address,
    driver,
    created_at,
    ride_time,
    payment_status
    
}}:{ride:Ride}) => {
  return (
    <View className=" flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex  items-center justify-center p-3">
        <View className="flex flex-row justify-between items-center">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            alt=""
            resizeMode="contain"
            className="w-[80px] h-[90px] rounded-lg"
          />
          <View className='flex flex-1 flex-col mx-5 gap-y-5'>
            <View className='flex flex-row items-center gap-x-2'>
            <Image
            source={icons.to}
            alt=""
            resizeMode="contain"
            className="w-5 h-5"
          />
           <Text className="text-md font-JakartaMedium" numberOfLines={1}>{origin_address}</Text>
            </View>

            <View className='flex flex-row items-center gap-x-2'>
            <Image
            source={icons.point}
            alt=""
            resizeMode="contain"
            className="w-5 h-5"
          />
           <Text className="text-md font-JakartaMedium" numberOfLines={1}>{destination_address}</Text>
            </View>
          </View>
        </View>

        <View className='flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center'>
            <View className='w-full flex flex-row items-center justify-between mb-5'>
              <Text className='text-md font-JakartaLight text-gray-500'>Date & time</Text>
              <Text className='text-md font-JakartaMedium text-gray-500'>{formatDate(created_at)}, {formatTime(ride_time)}</Text>
            </View>
        
            <View className='w-full flex flex-row items-center justify-between mb-5'>
              <Text className='text-md font-JakartaLight text-gray-500'>Driver</Text>
              <Text className='text-md font-JakartaMedium text-gray-500'>{driver.first_name} {driver.last_name}</Text>
            </View>

            <View className='w-full flex flex-row items-center justify-between mb-5'>
              <Text className='text-md font-JakartaLight text-gray-500'>Car seats</Text>
              <Text className='text-md font-JakartaMedium text-gray-500'>{driver.car_seats}</Text>
            </View>

            <View className='w-full flex flex-row items-center justify-between mb-5'>
              <Text className='text-md font-JakartaLight text-gray-500'>Payment status</Text>
              <Text className={`text-md font-JakartaMedium text-gray-500 ${payment_status==="paid"?"text-green-500":"text-red-500"} capitalize`}>{payment_status}</Text>
            </View>
        </View>

      </View>
    </View>
  );
}

export default RideCard