const axios = require("axios");

const requestPostMemory = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios(config);
};

const requestPostMemoryPhoto = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/photo`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios(config);
};

const requestPostMemoryTag = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/tag`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios(config);
};

module.exports = { requestPostMemory, requestPostMemoryPhoto, requestPostMemoryTag };
