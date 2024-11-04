const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
export const knex = knexConfigs[configMode];