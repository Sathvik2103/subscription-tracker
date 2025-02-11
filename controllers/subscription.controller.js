import subscription from "../models/subscriptions.model";

export const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = await subscription.create({
            ...req.body,
            user: req.user._id,
        })
    } catch (error) {
    next(error);
    }
}