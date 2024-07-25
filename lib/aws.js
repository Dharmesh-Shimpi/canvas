import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: process.env.AMAZON_ACCESS_KEY,
	secretAccessKey: process.env.AMAZON_SECRET_ACCESS,
	region: process.env.AWS_REGION, 
});

const s3 = new AWS.S3();

export { s3 };
