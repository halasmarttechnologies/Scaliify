import { Router } from "express";
import toolFinderRoutes from "./toolFinderRoutes.js";
import toolsRoutes from "./toolsRoutes.js";
import leadsRoutes from "./leadsRoutes.js";

const apiRouter = Router();

apiRouter.use("/tool-finder", toolFinderRoutes);
apiRouter.use("/tools", toolsRoutes);
apiRouter.use("/leads", leadsRoutes);

export default apiRouter;
