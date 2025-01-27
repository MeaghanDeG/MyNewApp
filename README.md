# MyNewApp - SAD Lamp Companion App  
**Your All-in-One Guide for Managing Seasonal Affective Disorder (SAD)**  

---

## Features  
- 🌤 **Weather Integration**: Access real-time weather updates and daylight hours.  
- 📅 **Schedule Management**: Track your personal schedule and receive SAD lamp usage recommendations.  
- 🌦 **Five-Day Forecast**: Plan ahead with extended weather and daylight predictions.  
- 📚 **Information Hub**: Get comprehensive FAQs and resources about SAD and light therapy.  
- ⚙️ **Customizable Settings**: Tailor your lamp duration and time windows to suit your needs.  

---

## Technical Stack  
- **Framework**: React Native (with Expo)  
- **Programming Language**: TypeScript  
- **Navigation**: React Navigation  
- **Data Persistence**: AsyncStorage  
- **API Integration**: OpenWeatherMap  

---

## How to Install  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repository/MyNewApp.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd MyNewApp
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Run the application:  
   ```bash
   expo start
   ```

---

## Environment Setup  
This app requires an OpenWeatherMap API key.  
Add your key to `app.config.js` under the `extra` field:  

```javascript
extra: {
  OPENWEATHERMAP_API_KEY: "your-api-key-here",
},
```

---

## Project Structure  
- `/app/screens`: Main screens of the application.  
- `/app/components`: Reusable UI components.  
- `/app/utils`: Utility functions and API helpers.  
- `/app/assets`: Images and fonts.  

---

## Core Features in Detail  
### 🏠 Home Screen  
- **Weather Display**: See current temperature and weather conditions.  
- **Daylight Hours**: Track sunrise and sunset times for the day.  
- **Schedule Overview**: Quickly glance at your schedule.  
- **SAD Lamp Recommendations**: Get a calculated time for your SAD lamp usage.  

### 📅 Schedule Management  
- Create and manage your daily activities.  
- Get automated SAD lamp usage suggestions based on your schedule and daylight hours.  

### ⚙️ Settings  
- Customize your lamp duration (e.g., 20–30 minutes).  
- Set preferred time windows for lamp usage.  
- Save your preferences for future sessions.  

---

## Resources  
- [Seasonal Affective Disorder - National Institute for Mental Health](https://www.nimh.nih.gov)  
- [SAD Lamp Recommendations - Day-Lights Blog](https://www.day-lights.com/blog)  
- [Mental Health Tips - Bupa](https://www.bupa.com)  

---

## Version  
**Current Version**: 1.0.0  

---

## License  
**Private** - All rights reserved.  

---

## Contact  
For support, reach us at:  
📧 support@mynewapp.com  

