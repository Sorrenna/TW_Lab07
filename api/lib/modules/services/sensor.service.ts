export interface SensorData {
    temperature: string;
    humidity: string;
    pressure: string;
  }
  
  export class SensorService {
    generateSensorData(): SensorData {
      return {
        temperature: (20 + Math.random() * 10).toFixed(1),
        humidity: (40 + Math.random() * 30).toFixed(0), 
        pressure: (990 + Math.random() * 30).toFixed(0),
      };
    }
  }
  