import needle from 'needle'


needle.get('http://localhost:3001/salesreport?period=monthly', (err, res) => {
    console.log(res.body);   
});

// let period = 'weekly';
// const now = new Date();
// let startDate;

// switch (period) {
//     case 'weekly':
//       startDate = new Date(now.setDate(now.getDate() - 7));
//       break;
//     case 'monthly':
//       startDate = new Date(now.setMonth(now.getMonth() - 1));
//       break;
//     case 'annual':
//       startDate = new Date(now.setFullYear(now.getFullYear() - 1));
//       break;
//   }

//   console.log(startDate)

