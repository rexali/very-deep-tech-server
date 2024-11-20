const multer = require("multer");

/**
 * Upload upload file with a field name
 * @returns upload 
 */
export function uploadFile(fieldname) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            if (file?.originalname.endsWith('.jpg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
            } else if (file?.originalname.endsWith('.png')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
            } else if (file?.originalname.endsWith('.pdf')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
            } else if (file?.originalname.endsWith('.mp3')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3')
            } else if (file?.originalname.endsWith('.mp4')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp4')
            } else if (file?.originalname.endsWith('.jpeg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
            } else {
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        }
    });

    const upload = multer({ storage: storage }).single(fieldname);

    return upload;
}

/**
 * Upload multiple file with different field names
 * @returns upload
 */
export function uploadFiles() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            if (file?.originalname.endsWith('.jpg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
            } else if (file?.originalname.endsWith('.png')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
            } else if (file?.originalname.endsWith('.pdf')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
            } else if (file?.originalname.endsWith('.mp3')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3')
            } else if (file?.originalname.endsWith('.mp4')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp4')
            } else if (file?.originalname.endsWith('.jpeg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
            } else {
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        }
    });

    const upload = multer({ storage: storage }).any();

    return upload;
}
/**
 * Upload multiple file with same fieldnames
 * @returns upload
 */
export function uploadMultipleFiles(filedName) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            if (file?.originalname.endsWith('.jpg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
            } else if (file?.originalname.endsWith('.png')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
            } else if (file?.originalname.endsWith('.pdf')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
            } else if (file?.originalname.endsWith('.mp3')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3')
            } else if (file?.originalname.endsWith('.mp4')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.mp4')
            } else if (file?.originalname.endsWith('.jpeg')) {
                cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg')
            } else {
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        }
    });

    const upload = multer({ storage: storage }).array(filedName);

    return upload;
}

module.exports={
    uploadFile,
    uploadFiles,
    uploadMultipleFiles
}