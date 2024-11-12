import AppointmentProvider from "@/providers/AppointmentsProvider";
import TelemedicineProvider from "@/providers/TelemediineProvider";
import UserProvider from "@/providers/UserProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <AppointmentProvider>
        <TelemedicineProvider>

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

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
            <Stack.Screen name="home" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="view_appointment" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="view_all_appointments" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="view_results" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="create_appointment" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="add_service" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="telemedicine" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="add_telemedicine" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
            <Stack.Screen name="profile" options={{
                headerTransparent: true,
                headerTitle: '', 
              }}/>
          </Stack>
        </TelemedicineProvider>
      </AppointmentProvider>
    </UserProvider>
  );
}
