import swaggerJSDoc from "swagger-jsdoc";
import { BASE_URL } from "../constant.js";

export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "Simple API for URL shortening service",
        },
        servers: [
            {
                url: BASE_URL || "http://localhost:7272",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions);