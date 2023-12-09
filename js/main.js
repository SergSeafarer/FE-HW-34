const getFileData = file => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file);
  xhr.send();

  xhr.addEventListener('readystatechange', () => {
    if(xhr.readyState === 4) {
      const isStatus = xhr.status >= 200 && xhr.status < 400;
      const response = isStatus ? JSON.parse(xhr.response) : [];
      console.log(response);
    }
  })
}
getFileData('./assets/files/positions.json');