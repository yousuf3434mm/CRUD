import { MongoClient} from "mongodb";

const url = "mongodb+srv://birganj247:URDC8c6LymuOOOGs@cluster0.5mdseo5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const mongoClient = new MongoClient(url, {});

const db_client = mongoClient.connect();

export default db_client;