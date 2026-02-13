import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://serene-scone-be7e3f.netlify.app/"
    ]
}));
app.use(express.json());



app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);



export default app;
