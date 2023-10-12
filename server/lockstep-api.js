'use strict';

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const config_1 = __importDefault(require("@/config"));
async function startServer() {
    const app = (0, express_1.default)();
    await require('./loaders').default({ expressApp: app });
    app.listen(config_1.default.port, () => {
        console.info(`✓ Server listening on port: ${config_1.default.port}`);
    }).on('error', err => {
        console.error(err);
        process.exit(1);
    });
}
startServer();
//# sourceMappingURL=lockstep-api.js.map
