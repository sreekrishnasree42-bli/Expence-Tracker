// Email Notification Service
const nodemailer = require('nodemailer');

// Create transporter (configure based on your email service)
let transporter = null;

const emailNotificationsEnabled = ['SEND_WELCOME_EMAIL', 'SEND_TRANSACTION_EMAIL', 'SEND_MONTHLY_REPORT'].some(
  (flag) => process.env[flag] === 'true'
);

if (!emailNotificationsEnabled) {
  console.log('Email notifications are disabled via env flags. Email service will not be initialized.');
} else if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.warn('Email notifications are enabled, but EMAIL_USER or EMAIL_PASSWORD is missing. Email service will not be initialized.');
} else {
  try {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify()
      .then(() => {
        console.log('✓ Email service configured successfully');
      })
      .catch((error) => {
        console.warn('Email service verification failed. Disabling email dispatch:', error.message);
        transporter = null;
      });
  } catch (error) {
    transporter = null;
    console.warn('Email service initialization failed. Email dispatch disabled:', error.message);
  }
}


// Send welcome email
const sendWelcomeEmail = async (user) => {
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Expense Tracker!',
      html: `
        <h2>Welcome ${user.name}!</h2>
        <p>Thank you for signing up with Expense Tracker.</p>
        <p>You can now start tracking your income and expenses easily.</p>
        <p>Get started now: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" target="_blank">Open App</a></p>
        <p>Best regards,<br>Expense Tracker Team</p>
      `,
    });
    console.log(`Welcome email sent to ${user.email}`);
  } catch (error) {
    console.log('Error sending welcome email:', error.message);
  }
};

// Send transaction notification
const sendTransactionNotification = async (user, transaction) => {
  if (!transporter) return;

  try {
    const action = transaction.type === 'income' ? 'Income Added' : 'Expense Recorded';
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `${action} - Expense Tracker`,
      html: `
        <h3>${action}</h3>
        <p>Hi ${user.name},</p>
        <p><strong>Amount:</strong> ${transaction.type === 'income' ? '+' : '-'} $${transaction.amount}</p>
        <p><strong>Category:</strong> ${transaction.category}</p>
        <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleDateString()}</p>
        ${transaction.description ? `<p><strong>Description:</strong> ${transaction.description}</p>` : ''}
        <p>Check your dashboard for more details.</p>
      `,
    });
    console.log(`Transaction notification sent to ${user.email}`);
  } catch (error) {
    console.log('Error sending transaction notification:', error.message);
  }
};

// Send monthly report
const sendMonthlyReport = async (user, report) => {
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Monthly Report - Expense Tracker`,
      html: `
        <h2>Monthly Report</h2>
        <p>Hi ${user.name},</p>
        <p>Here's your expense summary for ${report.month}:</p>
        
        <h3>Summary</h3>
        <ul>
          <li><strong>Total Income:</strong> $${report.totalIncome.toFixed(2)}</li>
          <li><strong>Total Expense:</strong> $${report.totalExpense.toFixed(2)}</li>
          <li><strong>Net Savings:</strong> $${(report.totalIncome - report.totalExpense).toFixed(2)}</li>
        </ul>
        
        <h3>Top Categories</h3>
        <ul>
          ${report.topCategories.map((cat) => `<li>${cat.category}: $${cat.amount.toFixed(2)}</li>`).join('')}
        </ul>
        
        <p>View your detailed dashboard for more insights.</p>
      `,
    });
    console.log(`Monthly report sent to ${user.email}`);
  } catch (error) {
    console.log('Error sending monthly report:', error.message);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendTransactionNotification,
  sendMonthlyReport,
};
