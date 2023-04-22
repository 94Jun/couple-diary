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

/** memories 테이블 PUT 요청 */
const requestUpdateMemories = async (data) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/${data.memory_id}`,
    method: "PUT",
    data: data,
  };
  await axios(config);
};

/** memory_photos 테이블 DELETE 요청*/
const requestDeletePhotoById = async (photo_id) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/photo/${photo_id}`,
    method: "DELETE",
  };
  await axios(config);
};

const requestDeleteTagByMemoryId = async (memory_id) => {
  const config = {
    url: `${process.env.SERVER_URL}/api/memory/tag/${memory_id}`,
    method: "DELETE",
  };
  await axios(config);
};

module.exports = { requestPostMemory, requestPostMemoryPhoto, requestPostMemoryTag, requestUpdateMemories, requestDeletePhotoById, requestDeleteTagByMemoryId };
