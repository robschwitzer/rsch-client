type IStrapiRecursiveAttribute =
  | string
  | string[]
  | { [key: string]: IStrapiRecursiveAttribute }
  | undefined;

type TImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string;
  width: number;
  height: number;
  size: number;
  url: string;
};

export interface IStrapiBase {
  id: number;
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export type TTheme = {
  name: string;
  bg: string;
  bg_offset: string;
  bg_secondary: string;
  fg: string;
  fg_secondary: string;
};

export interface IFetchOptions {
  method?: "GET" | "POST" | "PUT";
  headers?: Headers | { [key: string]: string };
  body?:
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | USVString
    | ReadableStream;
  mode?: RequestMode;
  credentials?: RequestCredentials;
}

export interface IStrapiURLParamsObject {
  encodeValuesOnly?: boolean;
  fields?: IStrapiRecursiveAttribute;
  filters?: IStrapiRecursiveAttribute;
  populate?: IStrapiRecursiveAttribute;
  publicationState?: "live" | "preview";
  sort?: string[];
}

export interface IStrapiMedia extends IStrapiBase {
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: TImageFormat;
      large: TImageFormat;
      medium: TImageFormat;
      small: TImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    provider: string;
  };
}

export interface IStrapiSkill {
  Name: string;
  Proficiency: string;
  Logo: {
    data: IStrapiMedia
  };
}

export interface IStrapiCMS extends IStrapiBase {
  attributes: {
    CMS: IStrapiSkill;
  }
}

export interface IStrapiFramework extends IStrapiBase {
  attributes: {
    Skill: IStrapiSkill;
  }
}

export interface IStrapiJob extends IStrapiBase {
  attributes: {
    Company: {
      id: number;
      Name: string;
      Location: string;
      Logo: {
        data: IStrapiMedia;
      }
    };
    Description: string;
    StartDate: string;
    EndDate?: string;
    Title: string;
  }
}