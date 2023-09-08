function formatResponse({ statusCode, body = null }) {
  const response = {
    statusCode: statusCode,
    Headers: {
      "Content-Type": "application/json",
    },
  };
  response.body = body ? JSON.stringify(body) : null;
  return response;
}

module.exports = formatResponse;
