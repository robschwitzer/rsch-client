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

export type TStrapiSkill = {
  name: string;
  proficiency: string;
  logo: {
    data: IStrapiMedia
  };
}

export interface IStrapiCMS extends IStrapiBase {
  attributes: {
    cms: IStrapiSkill;
  }
}

export interface IStrapiSkill extends IStrapiBase {
  attributes: {
    skill: TStrapiSkill;
  }
}

export interface IStrapiJob extends IStrapiBase {
  attributes: {
    id: number;
    company: {
      id: number;
      name: string;
      location: string;
      logo: {
        data: IStrapiMedia;
      };
      url: string;
    };
    description: string;
    startDate: string;
    endDate?: string;
    title: string;
  }
}

export interface IStrapiResume extends IStrapiBase {
  attributes: {
    bio: string;
    icon: {
      data: IStrapiMedia;
    }
    information: {
      currentlocation: string;
      email: string;
      firstname: string;
      id: number;
      lastname: string;
      phonenumber: string;
      profession: string;
    };
    metadata: {
      description: string;
      title: string;
      id: number;
      image: {
        data: IStrapiMedia;
      }
    };
  }
}

export interface IStrapiConfig extends IStrapiBase {
  attributes: {
    theme: TTheme;
  }
}

export interface IStrapiSocial extends IStrapiBase {
  attributes: {
    name: string;
    url: string;
    icon: {
      data: IStrapiMedia;
    };
  }
}

export interface IStrapiSchool extends IStrapiBase {
  attributes: {
    school: {
      id: number;
      achievement: string;
      name: string;
      // url: string;
      endDate?: string;
      logo: IStrapiMedia["attributes"]
    }
  }
}

export interface IStrapiInterest extends IStrapiBase {
  attributes: {
    icon: string;
    name: string;
  }
}

