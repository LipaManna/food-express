import request from "supertest";
import { jest } from "@jest/globals";


jest.unstable_mockModule("../services/orderStatus.service.js", () => ({
    simulateOrderStatus: jest.fn(),
}));

const { default: app } = await import("../app.js");

describe("POST /api/orders", () => {
    it("should create an order", async () => {
        const response = await request(app)
            .post("/api/orders")
            .send({
                items: [{ id: "1", quantity: 2 }],
                customer: { name: "John", address: "Kolkata", phone: "9999999999" }
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("pending");
    });
});
