/* eslint-disable prettier/prettier */
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


const Index = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(root)/find-ride'} />
  }

  return (
    <Redirect href={"/(auth)/welcome"}/>
  )
}

export default Index
