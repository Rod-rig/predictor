import {IRetriever} from '../../@types';
import {logos} from '../../content/logos';

export const addLogos = (data: IRetriever) => {
  data.logos = logos;
  return data;
};
