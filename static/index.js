function uploadBase64Image(imageBuffer, contentType) {
  const formData = new FormData();
  formData.append("base64image", imageBuffer);

  return axios({
    method: "post",
    url: "/upload",
    data: formData,
    config: {
      headers: { "Content-Type": "multipart/form-data" },
    },
  });
}
const options = {
  convertImage: mammoth.images.imgElement((image) => {
    return image.read("base64").then(async (imageBuffer) => {
      const result = await uploadBase64Image(imageBuffer, image.contentType);
      return {
        src: result.data.path,
      };
    });
  }),
};

function readFileInputEventAsArrayBuffer(event, callback) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (loadEvent) {
    const arrayBuffer = loadEvent.target.result;
    callback(arrayBuffer);
  };

  reader.readAsArrayBuffer(file);
}

function displayResult(result) {
  console.log(result);
  document.querySelector("#word").innerHTML = result.value;
}

document
  .getElementById("document")
  .addEventListener("change", handleFileSelect, false);

function handleFileSelect(event) {
  readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer }, options)
      .then(displayResult)
      .done();
  });
}
