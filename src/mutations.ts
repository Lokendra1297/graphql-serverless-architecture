import { APIGatewayEvent, Context } from 'aws-lambda';
import axios from 'axios';

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const mutation = `
    mutation {
      addItem(name: "NewItem") {
        id
        name
      }
    }
  `;

  try {
    const response = await axios.post(process.env.GRAPHQL_API, { query: mutation });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
