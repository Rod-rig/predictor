import table from './table';
import urls from './urls';

export default {
  get: (url: string) => {
    return new Promise((resolve, reject) => {
      if (url === urls.table) {
        resolve({data: [...table.table]});
      } else {
        reject(new Error(this.statusText));
      }
    });
  },
};
