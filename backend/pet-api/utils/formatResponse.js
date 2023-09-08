function formatResponse({ statusCode, body = {} }) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    Headers: {
      "Content-Type": "application/json",
    },
  };
  return response;
}

module.exports = formatResponse;
