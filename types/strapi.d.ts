type MergedAttributes<Base, Target> = Target &
  Pick<Base, Exclude<keyof Base, keyof Target>>;

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

export interface IStrapiMedia
  extends MergedAttributes<
    IStrapiBase,
    {
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
  > {}

export type TStrapiSkill = {
  name: string;
  proficiency: string;
  logo: {
    data: IStrapiMedia;
  };
};

export interface IStrapiCMS
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        cms: IStrapiSkill;
      };
    }
  > {}

export interface IStrapiSkill
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        skill: TStrapiSkill;
      };
    }
  > {}

export interface IStrapiJob
  extends MergedAttributes<
    IStrapiBase,
    {
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
      };
    }
  > {}

export interface IStrapiResume
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        blurb1: string;
        blurb2?: string;
        icon: {
          data: IStrapiMedia;
        };
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
          };
        };
      };
    }
  > {}

export interface IStrapiConfig
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        theme: TTheme;
      };
    }
  > {}

export interface IStrapiSocial
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        name: string;
        url: string;
        icon: {
          data: IStrapiMedia;
        };
      };
    }
  > {}

export interface IStrapiSchool
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        school: {
          id: number;
          achievement: string;
          description: string;
          name: string;
          url: string;
          endDate?: string;
          logo: IStrapiMedia["attributes"];
        };
      };
    }
  > {}

export interface IStrapiInterest
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        icon: string;
        name: string;
      };
    }
  > {}

export interface IStrapiLetter {
  id: number;
  from: string;
  to: string;
  body: string;
}

export interface IStrapiApplication
  extends MergedAttributes<
    IStrapiBase,
    {
      attributes: {
        company: {
          id: number;
          name: string;
          location: string;
          logo: {
            data: IStrapiMedia;
          };
          url: string;
        };
        coverletter: IStrapiLetter;
        followup: IStrapiLetter;
      };
    }
  > {}
