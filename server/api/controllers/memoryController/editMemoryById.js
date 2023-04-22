const { generateRandomId } = require("../../../common");
const { requestUpdateMemories, requestPostMemoryPhoto, requestDeletePhotoById, requestPostMemoryTag, requestDeleteTagByMemoryId } = require("./requestMemory");
const { uploadMemoryToS3 } = require("./uploadMemoryToS3");

const editMemoryById = async (req, res) => {
  const { title, content, memory_date } = req.body;
  const photos = req.files;
  const { memory_id } = req.params;
  const memoryData = { memory_id, title, content, memory_date };
  let tags = [];
  if (typeof req.body.tags === "string") {
    tags.push(req.body.tags);
  }
  if (typeof req.body.tags === "object") {
    tags.push(...req.body.tags);
  }
  let deletedPhotos = [];
  if (typeof req.body.deletedPhotos === "string") {
    deletedPhotos.push(req.body.deletedPhotos);
  }
  if (typeof req.body.deletedPhotos === "object") {
    deletedPhotos.push(...req.body.deletedPhotos);
  }
  try {
    // memories 테이블 update
    await requestUpdateMemories(memoryData);
    // memory_photos 테이블 update
    for await (const photo of photos) {
      const res = await uploadMemoryToS3(photo);
      const photo_url = `${process.env.AWS_S3_BUCKET_URL}/memory/${photo.filename}`;
      const photo_id = generateRandomId("photo");
      const photoData = { photo_id, memory_id, photo_url };
      await requestPostMemoryPhoto(photoData);
    }
    // memory_photos 테이블 delete
    for await (const deletedPhoto of deletedPhotos) {
      await requestDeletePhotoById(deletedPhoto);
    }
    // 기존 memory_tags 테이블 delete
    await requestDeleteTagByMemoryId(memory_id);
    // 새로운 memory_tags 테이블 POST
    for await (const tag of tags) {
      const tag_id = generateRandomId("tag");
      const tagData = { tag_id, memory_id, tag_name: tag };
      await requestPostMemoryTag(tagData);
    }
    res.status(201).json({ message: "추억이 성공적으로 수정되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "추억 수정에 실패했습니다." });
  }
};

module.exports = { editMemoryById };
