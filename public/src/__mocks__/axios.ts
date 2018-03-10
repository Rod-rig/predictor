const mockTable = require('./england-table');
const tableLink = 'https://raw.githubusercontent.com/Rod-rig/epl-data/master/' +
  '2017-2018/england/premier-league/table.json';

export default {
  get: (url: string) => {
    return new Promise((resolve, reject) => {
      if (url === tableLink) {
        resolve({data: [...mockTable]});
      } else {
        reject(new Error(this.statusText));
      }
    });
  },
};
