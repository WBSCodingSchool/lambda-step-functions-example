const axios = require('axios');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.handler = async (event) => {
  const { startDate } = event;

  try {
    console.log('Starting background processing...');
    await delay(4000);

    const message = {
      text: `Request executed successfully (${process.env.NODE_ENV})`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `Request executed successfully (${process.env.NODE_ENV})`,
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "plain_text",
            text: `${(+new Date() - startDate) / 1000} seconds after start`,
            emoji: true
          }
        }
      ]
    };

    await axios.post(process.env.SLACK_WEBHOOK_URL, message);
    console.log('Successfully sent message to Slack');

    return { success: true };
  } catch (error) {
    console.error('Background processing error:', error);
    throw error;
  }
};