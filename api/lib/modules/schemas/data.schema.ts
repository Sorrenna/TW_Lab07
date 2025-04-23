import { Schema, model } from 'mongoose';
import { IData } from "../models/data.model";


export const DataSchema = new Schema({
    temparture: {type: Number, required: true },
    pressure: {type: Number, required: true },
    humidity: {type: Number, required: true },
    readingDate: {type: Date, required: true, default: 'Date.now'},
    deviceId: {type: Number, required: true }

});


export default model<IData>('param', DataSchema);