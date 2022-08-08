const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const folder = document.getElementById("folder");
  const files = document.getElementById("files");

  // some validations

  if (folder && !folder.value) {
    alert("Folder name is required");
    return;
  }

  if (files && !files.files.length) {
    alert("Select files");
    return;
  }

  const formData = new FormData();
  formData.append("folder", folder.value);

  for (let i = 0; i < files.files.length; i++) {
    formData.append("files", files.files[i]);
  }

  fetch("http://localhost:4000/upload/multi", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Success", res);

      document.getElementById("success-message").style.display = "block";
      document.getElementById("success-message").innerText =
        res.message || "Successfully uploaded";

      setTimeout(() => {
        document.getElementById("success-message").style.display = "none";
      }, 2000);
    })
    .catch((error) => console.log("error: ", error));
}
