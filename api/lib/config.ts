export const config = {
    port: process.env.PORT || 3100,
    socketPort: process.env.PORT || 3000,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.py0mv8z.mongodb.net/IoT?retryWrites=true&w=majority&appName=Cluster0'
 };