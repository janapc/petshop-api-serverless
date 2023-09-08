const { parse } = require("fast-csv");

async function convertCsv(data) {
  const response = await new Promise((resolve, reject) => {
    const pets = [];
    const stream = parse({
      headers: ["name", "breed", "birthDay", "identifyNumberCustomer"],
      renameHeaders: true,
    })
      .on("data", (result) => pets.push(result))
      .on("error", (error) => reject(new Error("Error processing data")))
      .on("end", () => resolve(pets));

    stream.write(data);
    stream.end();
  });
  if (response instanceof Error) throw response;
  return response;
}
module.exports = { convertCsv };
