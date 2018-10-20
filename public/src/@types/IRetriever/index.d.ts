export interface IRetrieverProps {
  url: string;
}

export interface IRetriever<Data = any> {
  data: Data;
  isLoaded: boolean;
  url: string;
}
