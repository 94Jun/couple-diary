const { requestPostMemory, requestPostMemoryPhoto, requestPostMemoryTag } = require("./requestMemory");
const { generateRandomId } = require("../../../common");
const { uploadToS3 } = require("./uploadToS3");

/** 추억 등록에 의한 memories 테이블 POST, memory_phots 테이블 POST, memory_tags 테이블 POST */
const postMemoryByAdd = async (req, res) => {
  const { couple_id, user_id, title, content, memory_date } = req.body;
  const photos = req.files;
  const memory_id = generateRandomId("memory");
  const memoryData = { memory_id, couple_id, user_id, title, content, memory_date };
  let tags = [];
  if (typeof req.body.tags === "string") {
    tags.push(req.body.tags);
  }
  if (typeof req.body.tags === "object") {
    tags.push(...req.body.tags);
  }
  try {
    // memories 테이블 POST
    await requestPostMemory(memoryData);
    for (const photo of photos) {
      const res = await uploadToS3(photo);
      const photo_url = `${process.env.AWS_S3_BUCKET_URL}/memory/${photo.filename}`;
      const photo_id = generateRandomId("photo");
      const photoData = { photo_id, memory_id, photo_url };
      await requestPostMemoryPhoto(photoData);
    }
    for (const tag of tags) {
      const tag_id = generateRandomId("tag");
      const tagData = { tag_id, memory_id, tag_name: tag };
      await requestPostMemoryTag(tagData);
    }
    res.status(201).json({ message: "추억이 성공적으로 등록되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "추억 등록에 실패했습니다." });
  }
};

module.exports = { postMemoryByAdd };
