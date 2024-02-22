const { format } = require("date-fns");

module.exports = (file) => ({
    fileId: file.primary_key,
    filename: file.filename,
    fileType: file.fileType,
    versionId: file.versionId,
    versions: file.versions,
    username: file.username,
    updatedAt: format(new Date(file.updatedAt), "yyyy-MM-dd HH:mm"),
});