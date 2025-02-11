import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({ title: "Get all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send({ title: "Get all subscriptions details" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({ title: "Get all upcoming renewals" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({ title: "Get all subscriptions by user" });
});

subscriptionRouter.post("/", (req, res) => {
    res.send({ title: "Create a subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
    res.send({ title: "Update a subscription" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({ title: "cancel a subscription" });
});
subscriptionRouter.delete("/:id", (req, res) => {
    res.send({ title: "Delete a subscription" });
});

export default subscriptionRouter;