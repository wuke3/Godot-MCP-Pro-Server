"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTools = void 0;
exports.testTools = {
    run_test_scenario: {
        name: "run_test_scenario",
        description: "Run an automated test scenario",
        inputSchema: {
            type: "object",
            properties: {
                scenario_name: { type: "string", description: "Name of the test scenario" },
                scenario_path: { type: "string", description: "Path to scenario definition" },
                params: { type: "object", description: "Scenario parameters" },
            },
            required: ["scenario_name"],
        },
    },
};
//# sourceMappingURL=test.js.map