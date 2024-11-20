
function getFilesNames(files) {
    let results = [];
    files.forEach((file) => {
            results.push(file.filename)
    });

    return results;
}

module.exports={
    getFilesNames
}