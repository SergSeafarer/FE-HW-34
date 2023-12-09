let globalPositions;

const getWorker = (worker) => {
  console.log(worker);
}

const getAssistant = (assistant) => {
  console.log(assistant);
  getFileData(`./assets/files/${globalPositions[3]}.json`, getWorker);
}

const getManager = (manager) => {
  console.log(manager);
  getFileData(`./assets/files/${globalPositions[2]}.json`, getAssistant);
}

const getInvestor = (investor) => {
  console.log(investor);
  getFileData(`./assets/files/${globalPositions[1]}.json`, getManager);
}

const getPositions = (positions) => {
  globalPositions = positions;
  getFileData(`./assets/files/${positions[0]}.json`, getInvestor);
}

const getFileData = (file, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file);
  xhr.send();

  xhr.addEventListener('readystatechange', () => {
    if(xhr.readyState === 4) {
      const isStatus = xhr.status >= 200 && xhr.status < 400;
      const response = isStatus ? JSON.parse(xhr.response) : [];
      cb(response);
    }
  })
}
getFileData('./assets/files/positions.json', getPositions);