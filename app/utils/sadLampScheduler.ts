// app/utils/sadLampScheduler.ts
import { ScheduleItem } from "./types";

/**
 * Suggests the best time for SAD lamp usage based on the user's schedule.
 */
const suggestSadLampSlot = async (
  selectedDate: string,
  daylightData: { sunrise: string; sunset: string },
  schedule: ScheduleItem[]
): Promise<string | null> => {
  try {
    // ✅ Helper function to parse both 24-hour and 12-hour formats
    const parseTime = (time: string): number | null => {
      const regex24Hour = /^(\d{1,2}):(\d{2})$/;
      const regex12Hour = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
      
      if (regex24Hour.test(time)) {
        const [hours, minutes] = time.split(":").map(Number);
        return new Date(1970, 0, 1, hours, minutes).getTime();
      } else if (regex12Hour.test(time)) {
        const match = time.match(regex12Hour);
        if (!match) return null;
        let [_, hours, minutes, period] = match;
        let parsedHours = parseInt(hours, 10);
        if (period.toUpperCase() === "PM" && parsedHours < 12) {
          parsedHours += 12;
        }
        if (period.toUpperCase() === "AM" && parsedHours === 12) {
          parsedHours = 0;
        }
        return new Date(1970, 0, 1, parsedHours, parseInt(minutes)).getTime();
      } else {
        console.error("Invalid time format:", time);
        return null;
      }
    };

    // ✅ Convert and Validate sunrise and sunset times
    const sunrise = parseTime(daylightData.sunrise);
    const sunset = parseTime(daylightData.sunset);

    if (sunrise === null || sunset === null) {
      throw new Error("Invalid date formatting for sunrise or sunset.");
    }

    // ✅ Sort schedule based on start time
    const sortedSchedule = schedule
      .map((item) => ({
        ...item,
        startTime: parseTime(item.startTime) ?? 0,
        endTime: parseTime(item.endTime) ?? 0,
      }))
      .sort((a, b) => a.startTime - b.startTime);

    // ✅ Check for a free slot between sunrise and sunset (30 mins gap)
    let lastEndTime = sunrise;
    for (const event of sortedSchedule) {
      if (event.startTime - lastEndTime >= 30 * 60 * 1000) {
        return new Date(lastEndTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      lastEndTime = Math.max(lastEndTime, event.endTime);
    }

    // ✅ Suggest a slot before sunset if available
    if (sunset - lastEndTime >= 30 * 60 * 1000) {
      return new Date(lastEndTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "No available slot for SAD lamp usage today.";
  } catch (error) {
    console.error("Error suggesting SAD lamp slot:", error);
    return "Error suggesting SAD lamp slot.";
  }
};

export default suggestSadLampSlot;
