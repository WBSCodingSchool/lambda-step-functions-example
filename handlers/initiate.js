const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

exports.handler = async (event, context) => {
  const startDate = +new Date();

  try {
    // Start step function execution
    await stepfunctions.startExecution({
      stateMachineArn: process.env.STATE_MACHINE_ARN,
      input: JSON.stringify({ startDate })
    }).promise();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        message: 'Processing started',
        timestamp: startDate,
        requestId: context.awsRequestId,
        environment: process.env.NODE_ENV
      })
    };
  } catch (error) {
    console.error('Failed to start step function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to start processing' })
    };
  }
};