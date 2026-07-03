import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`ColomboFlow API is running on port ${env.port}`);
});
