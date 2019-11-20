const
    express = require('express'),
    app = express(),
    csrfToken = require('csurf');

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs'); // setting ejs as protocol
app.set('views', 'views'); // setting views to be showened in views folder 

const
    PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));