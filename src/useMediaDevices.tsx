import { useEffect, useState } from "react"
import useEventListener from "./useEventListener";
import isNavigator from "./utils/isNavigator";

type DeviceType = {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

interface NavigatorWithMediaDevices extends Navigator {
  enumerateDevices?: () => Promise<DeviceType[]>;
}

const navigatorWithMediaDevices: NavigatorWithMediaDevices | null = isNavigator ? navigator : null

function useMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState([] as DeviceType[]);

  async function handleChange() {
    try {
      const devices = await navigatorWithMediaDevices!.enumerateDevices!();
      setMediaDevices(devices);
    } catch (error) {
      setMediaDevices([]);
    }
  }

  useEventListener("devicechange", handleChange);

  useEffect(() => {
    handleChange();
  }, []);

  return mediaDevices;
}

export default isNavigator ? useMediaDevices : () => ({});
