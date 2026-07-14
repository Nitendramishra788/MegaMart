const Counter = require("../models/Counter");

const generateSequence = async(counterName, prefix)=>{
    const counter = await Counter.findOneAndUpdate(
         {
            _id: counterName,
        },
        {
            $inc: {
                sequenceValue: 1,
            },
        },
        {
            new: true,
            upsert: true,
        }
    );

        return `${prefix}${String(counter.sequenceValue).padStart(6, "0")}`;
};

module.exports = generateSequence;