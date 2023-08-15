"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const LogLineParser_1 = require("../src/LogLineParser");
describe("LogLineParser", () => {
    it("should parse a line", () => {
        const line = '2023-08-12T12:00:00.000Z - INFO - {"transactionId":"10"}';
        const result = LogLineParser_1.LogLineParser.parseLogLine(line);
        (0, chai_1.expect)(result.time().toISOString()).to.equal("2023-08-12T12:00:00.000Z");
        (0, chai_1.expect)(result.level()).to.equal("INFO");
        (0, chai_1.expect)(result.payload()).to.deep.equal({ transactionId: "10" });
    });
    it("should throw on empty date", () => {
        const line = ' - ERROR - {"transactionId":"10"}';
        const result = LogLineParser_1.LogLineParser.parseLogLine(line);
        (0, chai_1.expect)(result.time).to.throw("LogLineParser: empty date");
    });
    it("should throw on invalid date", () => {
        const line = '202345 - INFO - {"transactionId":"10"}';
        const result = LogLineParser_1.LogLineParser.parseLogLine(line);
        (0, chai_1.expect)(result.time).to.throw("LogLineParser: failed to parse date");
    });
    it("should throw error on empty payload", () => {
        const line = "2023-08-12T12:00:00Z - INFO - ";
        const result = LogLineParser_1.LogLineParser.parseLogLine(line);
        (0, chai_1.expect)(result.payload).to.throw("LogLineParser: empty JSON payload");
    });
    it("should throw error on invalid payload", () => {
        const line = '2023-08-12T12:00:00Z - INFO - {trans action id: "10"}';
        const result = LogLineParser_1.LogLineParser.parseLogLine(line);
        (0, chai_1.expect)(result.payload).to.throw(/LogLineParser: failed to parse JSON payload/);
    });
    it("should throw error for missing separators", () => {
        const line = '2023-08-12T12:00:00Z INFO {"message":"test"}';
        (0, chai_1.expect)(() => LogLineParser_1.LogLineParser.parseLogLine(line)).to.throw("LogLineParser: missing separator");
    });
    it("should throw error for missing separator", () => {
        const line = '2023-08-12T12:00:00Z - INFO {"message":"test"}';
        (0, chai_1.expect)(() => LogLineParser_1.LogLineParser.parseLogLine(line)).to.throw("LogLineParser: missing separator");
    });
    it("should throw error for invalid separator", () => {
        const line = '2023-08-12T12:00:00Z-INFO {"message":"test"}';
        (0, chai_1.expect)(() => LogLineParser_1.LogLineParser.parseLogLine(line)).to.throw("LogLineParser: missing separator");
    });
});
