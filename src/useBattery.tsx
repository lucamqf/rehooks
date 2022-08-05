import { useState, useEffect } from "react";
import deepCompare from "./utils/deepCompare"
import isNavigator from "./utils/isNavigator"

export interface INativeBattery {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export interface IBattery {
  isCharging: boolean;
  timeUntilCharge: number;
  timeUntilDischarge: number;
  percentage: number;
}

interface IBatteryManager extends INativeBattery, EventTarget {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

interface INavigatorBattery extends Navigator {
  getBattery?: () => Promise<IBatteryManager>;
}

type UseBattery = Partial<
  IBattery & { isSupported: boolean; fetched: boolean }
>;

const navigatorWithBattery: INavigatorBattery | null = isNavigator
  ? navigator
  : null;
const isBatterySupported =
  navigatorWithBattery && typeof navigatorWithBattery.getBattery === "function";

function batteryStateMock(): UseBattery {
  return { isSupported: false };
}

function useBattery(): UseBattery {
  const [battery, setBattery] = useState({} as UseBattery);

  function handleChange(manager: IBatteryManager) {
    const newBatteryState: UseBattery = {
      isSupported: true,
      fetched: true,
      percentage: manager.level * 100,
      isCharging: manager.charging,
      timeUntilCharge: manager.chargingTime,
      timeUntilDischarge: manager.dischargingTime,
    };

    if (!deepCompare(battery, newBatteryState)) setBattery(newBatteryState);
  }

  function addBatteryEvents(manager: IBatteryManager) {
    manager.addEventListener("chargingchange", () => handleChange(manager));
    manager.addEventListener("chargingtimechange", () => handleChange(manager));
    manager.addEventListener("dischargingtimechange", () =>
      handleChange(manager)
    );
    manager.addEventListener("levelchange", () => handleChange(manager));
  }

  function clearBatteryEvents(manager: IBatteryManager) {
    manager.removeEventListener("chargingchange", () => handleChange(manager));
    manager.removeEventListener("chargingtimechange", () =>
      handleChange(manager)
    );
    manager.removeEventListener("dischargingtimechange", () =>
      handleChange(manager)
    );
    manager.removeEventListener("levelchange", () => handleChange(manager));
  }

  useEffect(() => {
    let battery: IBatteryManager | null = null;

    navigatorWithBattery!.getBattery!().then(
      (batteryManager: IBatteryManager) => {
        battery = batteryManager;
        addBatteryEvents(battery);
        handleChange(battery);
      }
    );

    return () => {
      if (battery) {
        clearBatteryEvents(battery);
      }
    };
  }, []);

  return isBatterySupported ? battery : batteryStateMock();
}

export default useBattery;
