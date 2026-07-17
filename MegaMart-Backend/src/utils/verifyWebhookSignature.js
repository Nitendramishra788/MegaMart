const crypto = require("crypto");

const verifyWebhookSignature = (
    rawBody,
    webhookSignature
) => {

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_WEBHOOK_SECRET
        )
        .update(rawBody)
        .digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(webhookSignature)
    );
};

module.exports = verifyWebhookSignature;