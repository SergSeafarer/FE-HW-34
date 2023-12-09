let globalPositions;

const fillTable = (position, fields) => {
  const positionKey = [];
  for(key in position) {
    positionKey.push(position[key]);
  }
  for(let i = 0; i < fields.children.length; i++) {
    fields.children[i].append(positionKey[i]);
  }
}

const getWorker = (worker) => {
  const workerFields = document.querySelector('.worker');
  fillTable(worker, workerFields);
}

const getAssistant = (assistant) => {
  const assistantFields = document.querySelector('.assistant');
  fillTable(assistant, assistantFields);
  getFileData(`./assets/files/${globalPositions[3]}.json`, getWorker);
}

const getManager = (manager) => {
  const managerFields = document.querySelector('.manager');
  fillTable(manager, managerFields);
  getFileData(`./assets/files/${globalPositions[2]}.json`, getAssistant);
}

const getInvestor = (investor) => {
  const investorFields = document.querySelector('.investor');
  fillTable(investor, investorFields);
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