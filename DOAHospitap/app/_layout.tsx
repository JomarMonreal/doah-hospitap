import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          headerTransparent: true,
          headerTitle: '', 
        }}/>
      <Stack.Screen name="signup" options={{
          headerTransparent: true,
          headerTitle: '', 
        }}/>
      <Stack.Screen name="login" options={{
          headerTransparent: true,
          headerTitle: '', 
        }}/>
    </Stack>
  );
}
