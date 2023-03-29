const axios = require("axios");

/** memories 테이블 POST 요청 */
const requestPostMemory = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios(config);
};

/** memory_photos 테이블 POST 요청 */
const requestPostMemoryPhoto = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/photo`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios(config);
};

/** memory_tags 테이블 POST 요청 */
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
