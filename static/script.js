function post(url, params, cb) {
  fetch(url, {
      method : "POST",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify(params)
  })
  .then(response => response.text())
  .then(html => cb(html))
}

function reloadPreview(filepath) {
  post("preview/", {filepath: filepath}, function(data) {
    document.getElementById("preview").innerHTML = data
  })
}

function autoReload() {
  let filepath = document.getElementById("filepath").value
  let delay = document.getElementById("delay").value
  if (filepath == "") {
    alert("No file")
  } else {
    reloadPreview(filepath)

    if (delay == "") delay = 10
    setInterval(function() {
      reloadPreview(filepath)
    }, delay * 1000)
  }
}
