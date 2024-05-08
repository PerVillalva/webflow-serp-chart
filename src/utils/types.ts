export interface Position {
  date: string;
  title: string;
  position: number;
  url: string;
}

export interface Company {
  company: string;
  positions: Position[];
}

export interface MongoData {
  _id: string;
  keyword: string;
  companies: Company[];
}
