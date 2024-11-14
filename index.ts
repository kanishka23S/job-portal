import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import candidateRoutes from "./routes/candidates";
import jobRoutes from "./routes/job";

const app = express();
const PORT: number = 3001;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));

const corsOrigins = {
  origin: ["http://localhost:5173"],
  default: '*'
}

app.all("*", (req, res, next) => {
  const origin = corsOrigins.origin.includes(req.header('origin')?.toLowerCase() as string) ? req.headers.origin : corsOrigins.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  next();
});
 app.use("/api/candidates", candidateRoutes);
 app.use("/api/jobs", jobRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Job Service Running");
});

app.listen(PORT, () => {
  console.log(`Job Service is running on port ${PORT}`);
});

