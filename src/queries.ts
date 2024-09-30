import { APIGatewayEvent, Context } from 'aws-lambda';
import axios from 'axios';

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const query = `
    query {
      hello
    }
  `;

  try {
    const response = await axios.post(process.env.GRAPHQL_API, { query });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://mywebsite-graphql.s3-website.ap-south-1.amazonaws.com",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://mywebsite-graphql.s3-website.ap-south-1.amazonaws.com",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
