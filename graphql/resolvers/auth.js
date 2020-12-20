const bcrypt = require('bcryptjs');
const User = require('../../models/user');


module.exports = {
    createUser: async args => {
        try {
            const user_2 = await User.findOne({ email: args.userInput.email });
            if (user_2) {
                throw new Error('User Exists Already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user_1 = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user_1.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
};