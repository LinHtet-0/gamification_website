// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const app = require('./src/app');


//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
const PORT = 3000;


//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT,()=> {
    console.log(`App listening to port ${PORT}`);
});
