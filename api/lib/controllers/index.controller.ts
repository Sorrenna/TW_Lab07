import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { SensorService } from '../modules/services/sensor.service';

class IndexController implements Controller {
  public path = '/';
  public router = Router();
  private io: Server;
  private sensorService: SensorService;

  constructor(io: Server) {
    this.io = io;
    this.sensorService = new SensorService();
    this.initializeRoutes();
    this.startSensorDataEmitting();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.serveIndex);
    this.router.post(`${this.path}api/send-sensor-data`, this.sendCustomSensorData);
  }

  private serveIndex = async (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }

  private startSensorDataEmitting() {
    setInterval(() => {
      const data = this.sensorService.generateSensorData();
      this.io.emit('sensor-data', data);
      console.log("Automatycznie wysłano dane:", data);
    }, 3000); 
  }

  private sendCustomSensorData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { temperature, humidity, pressure } = req.body;
      const data = {
        temperature: temperature ?? (20 + Math.random() * 10).toFixed(1),
        humidity: humidity ?? (40 + Math.random() * 30).toFixed(0),
        pressure: pressure ?? (990 + Math.random() * 30).toFixed(0),
      };
      this.io.emit('sensor-data', data);
      console.log("Wysłano dane przez POST:", data);
      res.status(200).json({ message: 'Data sent successfully', data });
    } catch (error) {
      console.error("Error sending sensor data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default IndexController;
