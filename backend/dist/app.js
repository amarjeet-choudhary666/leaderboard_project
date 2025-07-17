"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ limit: "16kb", extended: true }));
app.use(express_1.default.json({ limit: "16kb" }));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/v1/api/users", user_routes_1.default);
