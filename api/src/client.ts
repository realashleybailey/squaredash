import { Client, Environment } from "square";

export const squareClient = new Client({
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});
