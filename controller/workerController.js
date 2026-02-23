const { sendBirthdayMail } = require('../config/mail');
const User = require('../model/userModel');
const cron = require('node-cron');
// get today's date, month and day
const getTodayMD = () => {
    const today = new Date();
    return { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear() };
};
 
//function to send email 
exports.runBirthdayEmails = async (req,res) => {
  console.log('Worker is running...');
    console.log('Checking birthdays in DB...');
    const { month: todayMonth, day: todayDay, year: currentYear } = getTodayMD();
  
    // Query users whose birthday is today AND who haven't been sent an email this year
    // const users = await User.find({});
    const birthdayUsers = await User.find({
      dob: {
        $exists: true
      },
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$dob' }, todayDay] },
          { $eq: [{ $month: '$dob' }, todayMonth] }
        ]
      },
      $or: [
        { lastSendYear: { $lt: currentYear } },
        { lastSendYear: null }
      ]
    });
  
    if (birthdayUsers.length === 0) {
      res.status(200).json({message:"No birthday mails to send today"})
      console.log('No birthday mails to send today');
      return;
    }
  
    for (const user of birthdayUsers) {
      const success = await sendBirthdayMail(user.email, user.username);
      if (success) {
        // lastSendYear updated so we don't resend to the user this year
        user.lastSendYear = currentYear;
        await user.save();
      }
    }
    res.status(200).json({message:"Worker done... emails sent for the day"})
    console.log('Birthday emails job finished.');
};


// Schedule: every day at 7:00 AM
cron.schedule('0 6 * * *', () => { //deployment on render will push it to 7 because they use UTC timezone 
    runBirthdayEmails().catch(err => console.error(err));
});