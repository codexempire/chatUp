const mongoose = require('mongoose');

mongoose.connect(process.env.MOGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

global.mongoose = mongoose;