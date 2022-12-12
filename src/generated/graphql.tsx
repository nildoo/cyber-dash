import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AdResults = {
  __typename?: "AdResults";
  _id?: Maybe<Scalars["String"]>;
  amountSpent: Scalars["Float"];
  costPerResults: Array<Result>;
  reach: Scalars["Int"];
  results: Array<Result>;
};

export type AddAdminInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  role: Scalars["String"];
};

export type AddCampaingInput = {
  client: Scalars["String"];
  consultant: Scalars["String"];
  endDate: Scalars["DateTime"];
  socialMediaNames: Array<Scalars["String"]>;
  startDate: Scalars["DateTime"];
  title: Scalars["String"];
  type: Scalars["String"];
};

export type AddClientInput = {
  address: AddressInput;
  cnpj: Scalars["String"];
  consultant: Scalars["String"];
  contractType: ContractTypeInput;
  email: Scalars["String"];
  name: Scalars["String"];
  othersContracts: ContractsInput;
  password: Scalars["String"];
  phone: Scalars["String"];
  whatsapp: Scalars["String"];
};

export type AddConsultantInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  office: Scalars["String"];
  password: Scalars["String"];
  role: Scalars["String"];
};

export type AddFileCampaingInput = {
  approved?: InputMaybe<Scalars["Boolean"]>;
  firebasePath: Scalars["String"];
  folder: Scalars["String"];
  id: Scalars["String"];
  size: Scalars["Float"];
  thumb: Scalars["String"];
  title: Scalars["String"];
  type: Scalars["String"];
  url: Scalars["String"];
};

export type AddLinkInput = {
  id: Scalars["String"];
  link: Scalars["String"];
  title: Scalars["String"];
};

export type AddMeetInput = {
  campaingId: Scalars["String"];
  date: Scalars["DateTime"];
  title: Scalars["String"];
};

export type AddNotificationInput = {
  client: Scalars["String"];
  message: Scalars["String"];
  title: Scalars["String"];
};

export type AddResultsCampaingInput = {
  amountSpent: Scalars["Float"];
  campaingId: Scalars["String"];
  costPerResults: Array<ResultInput>;
  network: Scalars["String"];
  reach: Scalars["Int"];
  results: Array<ResultInput>;
};

export type AddressInput = {
  city: Scalars["String"];
  complement?: InputMaybe<Scalars["String"]>;
  neighborhood: Scalars["String"];
  number?: InputMaybe<Scalars["String"]>;
  state: Scalars["String"];
  street: Scalars["String"];
  zipcode: Scalars["String"];
};

export type Admin = {
  __typename?: "Admin";
  _id?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  name: Scalars["String"];
  office: Scalars["String"];
  role: Scalars["String"];
};

export type ApproveFileInput = {
  approved: Scalars["Boolean"];
  id_campaing: Scalars["String"];
  id_file: Scalars["String"];
  typeFile: Scalars["String"];
};

export type Campaing = {
  __typename?: "Campaing";
  _id?: Maybe<Scalars["String"]>;
  client: Client;
  consultant: Consultant;
  endDate: Scalars["DateTime"];
  files: Files;
  links: Array<Link>;
  meet?: Maybe<Meet>;
  socialMediasResults: Array<SocialMedia>;
  startDate: Scalars["DateTime"];
  status: Scalars["String"];
  title: Scalars["String"];
  type: Scalars["String"];
};

export type Client = {
  __typename?: "Client";
  _id?: Maybe<Scalars["String"]>;
  address: ClientAddress;
  cnpj: Scalars["String"];
  consultant: Consultant;
  contractType: ContractType;
  email: Scalars["String"];
  name: Scalars["String"];
  networks: Array<Network>;
  notificationId: Scalars["String"];
  othersContracts: ExtraContracts;
  phone: Scalars["String"];
  whatsapp: Scalars["String"];
};

export type ClientAddress = {
  __typename?: "ClientAddress";
  _id?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  complement?: Maybe<Scalars["String"]>;
  neighborhood: Scalars["String"];
  number?: Maybe<Scalars["String"]>;
  state: Scalars["String"];
  street: Scalars["String"];
  zipcode: Scalars["String"];
};

export type ClientToken = {
  __typename?: "ClientToken";
  token: Scalars["String"];
};

export type Consultant = {
  __typename?: "Consultant";
  _id?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  name: Scalars["String"];
  office: Scalars["String"];
  role: Scalars["String"];
};

export type ContractType = {
  __typename?: "ContractType";
  title: Scalars["String"];
  type: Scalars["String"];
};

export type ContractTypeInput = {
  title: Scalars["String"];
  type: Scalars["String"];
};

export type ContractsInput = {
  extra_art?: InputMaybe<Scalars["Boolean"]>;
  extra_network?: InputMaybe<Scalars["Boolean"]>;
  landing_page?: InputMaybe<Scalars["Boolean"]>;
  site_development?: InputMaybe<Scalars["Boolean"]>;
  site_maintenance?: InputMaybe<Scalars["Boolean"]>;
};

export type ExtraContracts = {
  __typename?: "ExtraContracts";
  _id?: Maybe<Scalars["String"]>;
  extra_art?: Maybe<Scalars["Boolean"]>;
  extra_network?: Maybe<Scalars["Boolean"]>;
  landing_page?: Maybe<Scalars["Boolean"]>;
  site_development?: Maybe<Scalars["Boolean"]>;
  site_maintenance?: Maybe<Scalars["Boolean"]>;
};

export type File = {
  __typename?: "File";
  _id?: Maybe<Scalars["String"]>;
  approved: Scalars["Boolean"];
  firebasePath: Scalars["String"];
  folder: Scalars["String"];
  size: Scalars["Float"];
  thumb: Scalars["String"];
  title: Scalars["String"];
  type: Scalars["String"];
  url: Scalars["String"];
};

export type Files = {
  __typename?: "Files";
  _id?: Maybe<Scalars["String"]>;
  images: Array<File>;
  signature: Array<File>;
  videos: Array<File>;
};

export type History = {
  __typename?: "History";
  networkType: Scalars["String"];
  week: Array<Scalars["Float"]>;
  year: Array<Scalars["Float"]>;
};

export type HistoryInput = {
  date?: InputMaybe<Scalars["DateTime"]>;
  id: Scalars["String"];
  name: Scalars["String"];
};

export type Insight = {
  __typename?: "Insight";
  date?: Maybe<Scalars["DateTime"]>;
  quantity: Scalars["Int"];
};

export type Insights = {
  __typename?: "Insights";
  _id?: Maybe<Scalars["String"]>;
  comments: Scalars["Int"];
  commentsHistory: Array<Insight>;
  followers: Scalars["Int"];
  followersHistory: Array<Insight>;
  likes: Scalars["Int"];
  likesHistory: Array<Insight>;
  posts: Scalars["Int"];
  postsHistory: Array<Insight>;
  profileViews: Scalars["Int"];
  profileViewsHistory: Array<Insight>;
  reached: Scalars["Int"];
  reachedHistory: Array<Insight>;
};

export type Link = {
  __typename?: "Link";
  _id?: Maybe<Scalars["String"]>;
  link: Scalars["String"];
  title: Scalars["String"];
};

export type Meet = {
  __typename?: "Meet";
  date: Scalars["DateTime"];
  hour: Scalars["DateTime"];
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addAdmin: Admin;
  addCampaing: Campaing;
  addClient: Client;
  addConsultant: Consultant;
  addFilesToCampaing: Campaing;
  addLink?: Maybe<Campaing>;
  addMeet?: Maybe<Campaing>;
  addNetwork?: Maybe<Client>;
  addNotificationIdClient?: Maybe<Client>;
  addResultsCampaing: Scalars["Boolean"];
  approveFile: Scalars["Boolean"];
  clientLogin: ClientToken;
  removeFileFromCampaing: Scalars["Boolean"];
  removeLink: Scalars["Boolean"];
  sendNotificationToClient: Scalars["Boolean"];
  signIn: TokenDash;
  udpateNetwork?: Maybe<Client>;
  udpatePassword?: Maybe<Consultant>;
  updateClient?: Maybe<Client>;
};

export type MutationAddAdminArgs = {
  input: AddAdminInput;
};

export type MutationAddCampaingArgs = {
  input: AddCampaingInput;
};

export type MutationAddClientArgs = {
  input: AddClientInput;
};

export type MutationAddConsultantArgs = {
  input: AddConsultantInput;
};

export type MutationAddFilesToCampaingArgs = {
  input: AddFileCampaingInput;
};

export type MutationAddLinkArgs = {
  input: AddLinkInput;
};

export type MutationAddMeetArgs = {
  input: AddMeetInput;
};

export type MutationAddNetworkArgs = {
  input: NetworkInput;
};

export type MutationAddNotificationIdClientArgs = {
  input: SetNotificationIdInput;
};

export type MutationAddResultsCampaingArgs = {
  input: AddResultsCampaingInput;
};

export type MutationApproveFileArgs = {
  input: ApproveFileInput;
};

export type MutationClientLoginArgs = {
  input: SignInServiceClientInput;
};

export type MutationRemoveFileFromCampaingArgs = {
  input: RemoveImageCampaingInput;
};

export type MutationRemoveLinkArgs = {
  input: RemoveLinkInput;
};

export type MutationSendNotificationToClientArgs = {
  input: AddNotificationInput;
};

export type MutationSignInArgs = {
  input: SignInInputMain;
};

export type MutationUdpateNetworkArgs = {
  input: NetworkInput;
};

export type MutationUdpatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type MutationUpdateClientArgs = {
  input: UpdateClientInput;
};

export type Network = {
  __typename?: "Network";
  _id?: Maybe<Scalars["String"]>;
  insights: Insights;
  lastUpdate: Scalars["DateTime"];
  name: Scalars["String"];
};

export type NetworkInput = {
  comments: Scalars["Int"];
  followers: Scalars["Int"];
  id: Scalars["String"];
  likes: Scalars["Int"];
  name: Scalars["String"];
  posts: Scalars["Int"];
  profileViews: Scalars["Int"];
  reached: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  adminMe?: Maybe<Admin>;
  client?: Maybe<Client>;
  clientByName: Array<Client>;
  clientMe?: Maybe<Client>;
  clients: Array<Client>;
  consultant?: Maybe<Consultant>;
  consultantMe?: Maybe<Consultant>;
  consultants: Array<Consultant>;
  dataHistories: Array<History>;
  getAllCampaings: Array<Campaing>;
  getCampaingByClient: Array<Campaing>;
  getCampaingById: Campaing;
  getMe?: Maybe<UserInContext>;
  totalCampaings: Scalars["Int"];
  totalClients: Scalars["Int"];
};

export type QueryClientArgs = {
  id: Scalars["String"];
};

export type QueryClientByNameArgs = {
  name: Scalars["String"];
};

export type QueryConsultantArgs = {
  id: Scalars["String"];
};

export type QueryDataHistoriesArgs = {
  input: HistoryInput;
};

export type QueryGetCampaingByClientArgs = {
  client: Scalars["String"];
};

export type QueryGetCampaingByIdArgs = {
  id: Scalars["String"];
};

export type RemoveImageCampaingInput = {
  campaingId: Scalars["String"];
  fileId: Scalars["String"];
  folder: Scalars["String"];
};

export type RemoveLinkInput = {
  campaingId: Scalars["String"];
  linkId: Scalars["String"];
};

export type Result = {
  __typename?: "Result";
  _id?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  value: Scalars["Int"];
};

export type ResultInput = {
  title: Scalars["String"];
  value: Scalars["Int"];
};

export type SetNotificationIdInput = {
  client_id: Scalars["String"];
  notificationId: Scalars["String"];
};

export type SignInInputMain = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignInServiceClientInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SocialMedia = {
  __typename?: "SocialMedia";
  _id?: Maybe<Scalars["String"]>;
  adResults?: Maybe<AdResults>;
  name: Scalars["String"];
};

export type TokenDash = {
  __typename?: "TokenDash";
  role: Scalars["String"];
  token: Scalars["String"];
};

export type UpdateClientInput = {
  address: AddressInput;
  cnpj: Scalars["String"];
  contractType: ContractTypeInput;
  id: Scalars["String"];
  name: Scalars["String"];
  othersContracts: ContractsInput;
  phone: Scalars["String"];
  whatsapp: Scalars["String"];
};

export type UpdatePasswordInput = {
  consultantId: Scalars["String"];
  password: Scalars["String"];
};

export type UserInContext = {
  __typename?: "UserInContext";
  email: Scalars["String"];
  id: Scalars["String"];
  name: Scalars["String"];
  office: Scalars["String"];
  role: Scalars["String"];
};

export type AddClientMutationVariables = Exact<{
  input: AddClientInput;
}>;

export type AddClientMutation = {
  __typename?: "Mutation";
  addClient: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    cnpj: string;
    phone: string;
    whatsapp: string;
    consultant: { __typename?: "Consultant"; _id?: string | null };
    contractType: { __typename?: "ContractType"; type: string; title: string };
    address: {
      __typename?: "ClientAddress";
      _id?: string | null;
      zipcode: string;
      street: string;
      city: string;
      neighborhood: string;
      state: string;
      number?: string | null;
      complement?: string | null;
    };
    othersContracts: {
      __typename?: "ExtraContracts";
      _id?: string | null;
      extra_art?: boolean | null;
      extra_network?: boolean | null;
      landing_page?: boolean | null;
      site_development?: boolean | null;
      site_maintenance?: boolean | null;
    };
  };
};

export type ClientsQueryVariables = Exact<{ [key: string]: never }>;

export type ClientsQuery = {
  __typename?: "Query";
  clients: Array<{
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    whatsapp: string;
    contractType: { __typename?: "ContractType"; type: string; title: string };
    othersContracts: {
      __typename?: "ExtraContracts";
      extra_art?: boolean | null;
      extra_network?: boolean | null;
      landing_page?: boolean | null;
      site_development?: boolean | null;
      site_maintenance?: boolean | null;
    };
  }>;
};

export type ClientQueryVariables = Exact<{
  clientId: Scalars["String"];
}>;

export type ClientQuery = {
  __typename?: "Query";
  client?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    networks: Array<{
      __typename?: "Network";
      name: string;
      insights: {
        __typename?: "Insights";
        comments: number;
        followers: number;
        likes: number;
        reached: number;
        posts: number;
        profileViews: number;
        commentsHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        followersHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        likesHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        reachedHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        postsHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        profileViewsHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
      };
    }>;
  } | null;
};

export type ClientByNameQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type ClientByNameQuery = {
  __typename?: "Query";
  clientByName: Array<{
    __typename?: "Client";
    _id?: string | null;
    name: string;
  }>;
};

export type AddNetworkMutationVariables = Exact<{
  input: NetworkInput;
}>;

export type AddNetworkMutation = {
  __typename?: "Mutation";
  addNetwork?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    networks: Array<{
      __typename?: "Network";
      name: string;
      insights: {
        __typename?: "Insights";
        followers: number;
        likes: number;
        comments: number;
        reached: number;
        commentsHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        followersHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        likesHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        reachedHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
      };
    }>;
  } | null;
};

export type QueryQueryVariables = Exact<{
  input: HistoryInput;
}>;

export type QueryQuery = {
  __typename?: "Query";
  dataHistories: Array<{
    __typename?: "History";
    networkType: string;
    week: Array<number>;
    year: Array<number>;
  }>;
};

export type UdpateNetworkMutationVariables = Exact<{
  input: NetworkInput;
}>;

export type UdpateNetworkMutation = {
  __typename?: "Mutation";
  udpateNetwork?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    networks: Array<{
      __typename?: "Network";
      name: string;
      lastUpdate: any;
      insights: {
        __typename?: "Insights";
        followers: number;
        likes: number;
        comments: number;
        reached: number;
        commentsHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        followersHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        likesHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
        reachedHistory: Array<{
          __typename?: "Insight";
          date?: any | null;
          quantity: number;
        }>;
      };
    }>;
  } | null;
};

export type GetCampaingsByClientMinQueryVariables = Exact<{
  client: Scalars["String"];
}>;

export type GetCampaingsByClientMinQuery = {
  __typename?: "Query";
  getCampaingByClient: Array<{
    __typename?: "Campaing";
    _id?: string | null;
    title: string;
    type: string;
    client: { __typename?: "Client"; name: string };
    socialMediasResults: Array<{ __typename?: "SocialMedia"; name: string }>;
  }>;
};

export type ClientByIdQueryVariables = Exact<{
  clientId: Scalars["String"];
}>;

export type ClientByIdQuery = {
  __typename?: "Query";
  client?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    networks: Array<{ __typename?: "Network"; name: string }>;
  } | null;
};

export type GetCampaingByIdMinQueryVariables = Exact<{
  getCampaingByIdId: Scalars["String"];
}>;

export type GetCampaingByIdMinQuery = {
  __typename?: "Query";
  getCampaingById: {
    __typename?: "Campaing";
    _id?: string | null;
    title: string;
    type: string;
    status: string;
    startDate: any;
    endDate: any;
    links: Array<{
      __typename?: "Link";
      _id?: string | null;
      link: string;
      title: string;
    }>;
    meet?: { __typename?: "Meet"; date: any; hour: any; title: string } | null;
    socialMediasResults: Array<{
      __typename?: "SocialMedia";
      _id?: string | null;
      name: string;
      adResults?: {
        __typename?: "AdResults";
        amountSpent: number;
        reach: number;
        costPerResults: Array<{
          __typename?: "Result";
          _id?: string | null;
          title: string;
          value: number;
        }>;
        results: Array<{
          __typename?: "Result";
          _id?: string | null;
          title: string;
          value: number;
        }>;
      } | null;
    }>;
    files: {
      __typename?: "Files";
      images: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        folder: string;
        firebasePath: string;
        thumb: string;
        title: string;
        type: string;
        url: string;
      }>;
      signature: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        folder: string;
        firebasePath: string;
        thumb: string;
        title: string;
        type: string;
        url: string;
      }>;
      videos: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        thumb: string;
        title: string;
        folder: string;
        firebasePath: string;
        type: string;
        url: string;
      }>;
    };
  };
};

export type AddFilesToCampaingMutationVariables = Exact<{
  input: AddFileCampaingInput;
}>;

export type AddFilesToCampaingMutation = {
  __typename?: "Mutation";
  addFilesToCampaing: {
    __typename?: "Campaing";
    files: {
      __typename?: "Files";
      images: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        thumb: string;
        title: string;
        type: string;
        url: string;
      }>;
      signature: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        thumb: string;
        title: string;
        type: string;
        url: string;
      }>;
      videos: Array<{
        __typename?: "File";
        _id?: string | null;
        approved: boolean;
        size: number;
        thumb: string;
        title: string;
        type: string;
        url: string;
      }>;
    };
  };
};

export type ApproveFileMutationVariables = Exact<{
  input: ApproveFileInput;
}>;

export type ApproveFileMutation = {
  __typename?: "Mutation";
  approveFile: boolean;
};

export type SignInMutationVariables = Exact<{
  input: SignInInputMain;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: { __typename?: "TokenDash"; token: string; role: string };
};

export type ConsultantMeQueryVariables = Exact<{ [key: string]: never }>;

export type ConsultantMeQuery = {
  __typename?: "Query";
  consultantMe?: {
    __typename?: "Consultant";
    _id?: string | null;
    name: string;
    email: string;
    office: string;
  } | null;
};

export type CampaingByIdQueryVariables = Exact<{
  getCampaingByIdId: Scalars["String"];
}>;

export type CampaingByIdQuery = {
  __typename?: "Query";
  getCampaingById: {
    __typename?: "Campaing";
    _id?: string | null;
    client: {
      __typename?: "Client";
      _id?: string | null;
      name: string;
      email: string;
    };
    consultant: {
      __typename?: "Consultant";
      _id?: string | null;
      name: string;
      email: string;
      office: string;
    };
  };
};

export type ConsultantsQueryVariables = Exact<{ [key: string]: never }>;

export type ConsultantsQuery = {
  __typename?: "Query";
  consultants: Array<{
    __typename?: "Consultant";
    _id?: string | null;
    name: string;
    email: string;
    office: string;
  }>;
};

export type AddConsultantMutationVariables = Exact<{
  input: AddConsultantInput;
}>;

export type AddConsultantMutation = {
  __typename?: "Mutation";
  addConsultant: {
    __typename?: "Consultant";
    _id?: string | null;
    name: string;
    email: string;
    office: string;
    role: string;
  };
};

export type ClientAllDetailsQueryVariables = Exact<{
  clientId: Scalars["String"];
}>;

export type ClientAllDetailsQuery = {
  __typename?: "Query";
  client?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    cnpj: string;
    phone: string;
    whatsapp: string;
    contractType: { __typename?: "ContractType"; title: string; type: string };
    address: {
      __typename?: "ClientAddress";
      city: string;
      complement?: string | null;
      neighborhood: string;
      number?: string | null;
      state: string;
      street: string;
      zipcode: string;
    };
    othersContracts: {
      __typename?: "ExtraContracts";
      extra_art?: boolean | null;
      extra_network?: boolean | null;
      landing_page?: boolean | null;
      site_development?: boolean | null;
      site_maintenance?: boolean | null;
    };
  } | null;
};

export type UpdateClientMutationVariables = Exact<{
  input: UpdateClientInput;
}>;

export type UpdateClientMutation = {
  __typename?: "Mutation";
  updateClient?: {
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    cnpj: string;
    phone: string;
    whatsapp: string;
    contractType: { __typename?: "ContractType"; title: string; type: string };
    address: {
      __typename?: "ClientAddress";
      city: string;
      complement?: string | null;
      neighborhood: string;
      number?: string | null;
      state: string;
      street: string;
      zipcode: string;
    };
    othersContracts: {
      __typename?: "ExtraContracts";
      extra_art?: boolean | null;
      extra_network?: boolean | null;
      landing_page?: boolean | null;
      site_development?: boolean | null;
      site_maintenance?: boolean | null;
    };
  } | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  getMe?: {
    __typename?: "UserInContext";
    id: string;
    name: string;
    email: string;
    office: string;
    role: string;
  } | null;
};

export type AddCampaingMutationVariables = Exact<{
  input: AddCampaingInput;
}>;

export type AddCampaingMutation = {
  __typename?: "Mutation";
  addCampaing: { __typename?: "Campaing"; _id?: string | null };
};

export type AddLinkMutationVariables = Exact<{
  input: AddLinkInput;
}>;

export type AddLinkMutation = {
  __typename?: "Mutation";
  addLink?: {
    __typename?: "Campaing";
    _id?: string | null;
    title: string;
    links: Array<{ __typename?: "Link"; link: string; title: string }>;
  } | null;
};

export type RemoveLinkMutationVariables = Exact<{
  input: RemoveLinkInput;
}>;

export type RemoveLinkMutation = {
  __typename?: "Mutation";
  removeLink: boolean;
};

export type AddMeetMutationVariables = Exact<{
  input: AddMeetInput;
}>;

export type AddMeetMutation = {
  __typename?: "Mutation";
  addMeet?: {
    __typename?: "Campaing";
    meet?: { __typename?: "Meet"; date: any; hour: any; title: string } | null;
  } | null;
};

export type AddResultsCampaingMutationVariables = Exact<{
  input: AddResultsCampaingInput;
}>;

export type AddResultsCampaingMutation = {
  __typename?: "Mutation";
  addResultsCampaing: boolean;
};

export type ClientByNameFilteredQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type ClientByNameFilteredQuery = {
  __typename?: "Query";
  clientByName: Array<{
    __typename?: "Client";
    _id?: string | null;
    name: string;
    email: string;
    whatsapp: string;
    contractType: { __typename?: "ContractType"; title: string; type: string };
    othersContracts: {
      __typename?: "ExtraContracts";
      _id?: string | null;
      extra_art?: boolean | null;
      extra_network?: boolean | null;
      landing_page?: boolean | null;
      site_development?: boolean | null;
      site_maintenance?: boolean | null;
    };
  }>;
};

export type ConsultantQueryVariables = Exact<{
  consultantId: Scalars["String"];
}>;

export type ConsultantQuery = {
  __typename?: "Query";
  consultant?: {
    __typename?: "Consultant";
    _id?: string | null;
    name: string;
    email: string;
    office: string;
    role: string;
  } | null;
};

export type UdpatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;

export type UdpatePasswordMutation = {
  __typename?: "Mutation";
  udpatePassword?: {
    __typename?: "Consultant";
    _id?: string | null;
    name: string;
    email: string;
    office: string;
    role: string;
  } | null;
};

export type SendNotificationToClientMutationVariables = Exact<{
  input: AddNotificationInput;
}>;

export type SendNotificationToClientMutation = {
  __typename?: "Mutation";
  sendNotificationToClient: boolean;
};

export type GetTotalClientsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTotalClientsQuery = {
  __typename?: "Query";
  totalClients: number;
};

export type GetTotalCampaingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTotalCampaingsQuery = {
  __typename?: "Query";
  totalCampaings: number;
};

export type RemoveFileFromCampaingMutationVariables = Exact<{
  input: RemoveImageCampaingInput;
}>;

export type RemoveFileFromCampaingMutation = {
  __typename?: "Mutation";
  removeFileFromCampaing: boolean;
};

export const AddClientDocument = gql`
  mutation AddClient($input: AddClientInput!) {
    addClient(input: $input) {
      _id
      name
      consultant {
        _id
      }
      email
      cnpj
      contractType {
        type
        title
      }
      address {
        _id
        zipcode
        street
        city
        neighborhood
        state
        number
        complement
      }
      phone
      whatsapp
      othersContracts {
        _id
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
    }
  }
`;
export type AddClientMutationFn = Apollo.MutationFunction<
  AddClientMutation,
  AddClientMutationVariables
>;

/**
 * __useAddClientMutation__
 *
 * To run a mutation, you first call `useAddClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClientMutation, { data, loading, error }] = useAddClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddClientMutation,
    AddClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddClientMutation, AddClientMutationVariables>(
    AddClientDocument,
    options
  );
}
export type AddClientMutationHookResult = ReturnType<
  typeof useAddClientMutation
>;
export type AddClientMutationResult = Apollo.MutationResult<AddClientMutation>;
export type AddClientMutationOptions = Apollo.BaseMutationOptions<
  AddClientMutation,
  AddClientMutationVariables
>;
export const ClientsDocument = gql`
  query Clients {
    clients {
      _id
      name
      email
      contractType {
        type
        title
      }
      whatsapp
      othersContracts {
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
    }
  }
`;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsQuery(
  baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(
    ClientsDocument,
    options
  );
}
export function useClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(
    ClientsDocument,
    options
  );
}
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<
  ClientsQuery,
  ClientsQueryVariables
>;
export const ClientDocument = gql`
  query Client($clientId: String!) {
    client(id: $clientId) {
      _id
      name
      email
      networks {
        name
        insights {
          comments
          commentsHistory {
            date
            quantity
          }
          followers
          followersHistory {
            date
            quantity
          }
          likes
          likesHistory {
            date
            quantity
          }
          reached
          reachedHistory {
            date
            quantity
          }
          posts
          postsHistory {
            date
            quantity
          }
          profileViews
          profileViewsHistory {
            date
            quantity
          }
        }
      }
    }
  }
`;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientQuery(
  baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientQuery, ClientQueryVariables>(
    ClientDocument,
    options
  );
}
export function useClientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(
    ClientDocument,
    options
  );
}
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<
  ClientQuery,
  ClientQueryVariables
>;
export const ClientByNameDocument = gql`
  query ClientByName($name: String!) {
    clientByName(name: $name) {
      _id
      name
    }
  }
`;

/**
 * __useClientByNameQuery__
 *
 * To run a query within a React component, call `useClientByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useClientByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientByNameQuery,
    ClientByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientByNameQuery, ClientByNameQueryVariables>(
    ClientByNameDocument,
    options
  );
}
export function useClientByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientByNameQuery,
    ClientByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientByNameQuery, ClientByNameQueryVariables>(
    ClientByNameDocument,
    options
  );
}
export type ClientByNameQueryHookResult = ReturnType<
  typeof useClientByNameQuery
>;
export type ClientByNameLazyQueryHookResult = ReturnType<
  typeof useClientByNameLazyQuery
>;
export type ClientByNameQueryResult = Apollo.QueryResult<
  ClientByNameQuery,
  ClientByNameQueryVariables
>;
export const AddNetworkDocument = gql`
  mutation AddNetwork($input: NetworkInput!) {
    addNetwork(input: $input) {
      _id
      name
      email
      networks {
        name
        insights {
          followers
          likes
          comments
          reached
          commentsHistory {
            date
            quantity
          }
          followersHistory {
            date
            quantity
          }
          likesHistory {
            date
            quantity
          }
          reachedHistory {
            date
            quantity
          }
        }
      }
    }
  }
`;
export type AddNetworkMutationFn = Apollo.MutationFunction<
  AddNetworkMutation,
  AddNetworkMutationVariables
>;

/**
 * __useAddNetworkMutation__
 *
 * To run a mutation, you first call `useAddNetworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNetworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNetworkMutation, { data, loading, error }] = useAddNetworkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddNetworkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddNetworkMutation,
    AddNetworkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddNetworkMutation, AddNetworkMutationVariables>(
    AddNetworkDocument,
    options
  );
}
export type AddNetworkMutationHookResult = ReturnType<
  typeof useAddNetworkMutation
>;
export type AddNetworkMutationResult =
  Apollo.MutationResult<AddNetworkMutation>;
export type AddNetworkMutationOptions = Apollo.BaseMutationOptions<
  AddNetworkMutation,
  AddNetworkMutationVariables
>;
export const QueryDocument = gql`
  query Query($input: HistoryInput!) {
    dataHistories(input: $input) {
      networkType
      week
      year
    }
  }
`;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQueryQuery(
  baseOptions: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QueryQuery, QueryQueryVariables>(
    QueryDocument,
    options
  );
}
export function useQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(
    QueryDocument,
    options
  );
}
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QueryQueryResult = Apollo.QueryResult<
  QueryQuery,
  QueryQueryVariables
>;
export const UdpateNetworkDocument = gql`
  mutation UdpateNetwork($input: NetworkInput!) {
    udpateNetwork(input: $input) {
      _id
      name
      email
      networks {
        name
        lastUpdate
        insights {
          followers
          likes
          comments
          reached
          commentsHistory {
            date
            quantity
          }
          followersHistory {
            date
            quantity
          }
          likesHistory {
            date
            quantity
          }
          reachedHistory {
            date
            quantity
          }
        }
      }
    }
  }
`;
export type UdpateNetworkMutationFn = Apollo.MutationFunction<
  UdpateNetworkMutation,
  UdpateNetworkMutationVariables
>;

/**
 * __useUdpateNetworkMutation__
 *
 * To run a mutation, you first call `useUdpateNetworkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUdpateNetworkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [udpateNetworkMutation, { data, loading, error }] = useUdpateNetworkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUdpateNetworkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UdpateNetworkMutation,
    UdpateNetworkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UdpateNetworkMutation,
    UdpateNetworkMutationVariables
  >(UdpateNetworkDocument, options);
}
export type UdpateNetworkMutationHookResult = ReturnType<
  typeof useUdpateNetworkMutation
>;
export type UdpateNetworkMutationResult =
  Apollo.MutationResult<UdpateNetworkMutation>;
export type UdpateNetworkMutationOptions = Apollo.BaseMutationOptions<
  UdpateNetworkMutation,
  UdpateNetworkMutationVariables
>;
export const GetCampaingsByClientMinDocument = gql`
  query GetCampaingsByClientMin($client: String!) {
    getCampaingByClient(client: $client) {
      _id
      client {
        name
      }
      title
      type
      socialMediasResults {
        name
      }
    }
  }
`;

/**
 * __useGetCampaingsByClientMinQuery__
 *
 * To run a query within a React component, call `useGetCampaingsByClientMinQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaingsByClientMinQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaingsByClientMinQuery({
 *   variables: {
 *      client: // value for 'client'
 *   },
 * });
 */
export function useGetCampaingsByClientMinQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCampaingsByClientMinQuery,
    GetCampaingsByClientMinQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCampaingsByClientMinQuery,
    GetCampaingsByClientMinQueryVariables
  >(GetCampaingsByClientMinDocument, options);
}
export function useGetCampaingsByClientMinLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCampaingsByClientMinQuery,
    GetCampaingsByClientMinQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCampaingsByClientMinQuery,
    GetCampaingsByClientMinQueryVariables
  >(GetCampaingsByClientMinDocument, options);
}
export type GetCampaingsByClientMinQueryHookResult = ReturnType<
  typeof useGetCampaingsByClientMinQuery
>;
export type GetCampaingsByClientMinLazyQueryHookResult = ReturnType<
  typeof useGetCampaingsByClientMinLazyQuery
>;
export type GetCampaingsByClientMinQueryResult = Apollo.QueryResult<
  GetCampaingsByClientMinQuery,
  GetCampaingsByClientMinQueryVariables
>;
export const ClientByIdDocument = gql`
  query ClientById($clientId: String!) {
    client(id: $clientId) {
      _id
      name
      networks {
        name
      }
    }
  }
`;

/**
 * __useClientByIdQuery__
 *
 * To run a query within a React component, call `useClientByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientByIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientByIdQuery,
    ClientByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientByIdQuery, ClientByIdQueryVariables>(
    ClientByIdDocument,
    options
  );
}
export function useClientByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientByIdQuery,
    ClientByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClientByIdQuery, ClientByIdQueryVariables>(
    ClientByIdDocument,
    options
  );
}
export type ClientByIdQueryHookResult = ReturnType<typeof useClientByIdQuery>;
export type ClientByIdLazyQueryHookResult = ReturnType<
  typeof useClientByIdLazyQuery
>;
export type ClientByIdQueryResult = Apollo.QueryResult<
  ClientByIdQuery,
  ClientByIdQueryVariables
>;
export const GetCampaingByIdMinDocument = gql`
  query GetCampaingByIdMin($getCampaingByIdId: String!) {
    getCampaingById(id: $getCampaingByIdId) {
      _id
      title
      type
      status
      startDate
      links {
        _id
        link
        title
      }
      meet {
        date
        hour
        title
      }
      endDate
      socialMediasResults {
        _id
        name
        adResults {
          amountSpent
          reach
          costPerResults {
            _id
            title
            value
          }
          results {
            _id
            title
            value
          }
        }
      }
      files {
        images {
          _id
          approved
          size
          folder
          firebasePath
          thumb
          title
          type
          url
        }
        signature {
          _id
          approved
          size
          folder
          firebasePath
          thumb
          title
          type
          url
        }
        videos {
          _id
          approved
          size
          thumb
          title
          folder
          firebasePath
          type
          url
        }
      }
    }
  }
`;

/**
 * __useGetCampaingByIdMinQuery__
 *
 * To run a query within a React component, call `useGetCampaingByIdMinQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaingByIdMinQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaingByIdMinQuery({
 *   variables: {
 *      getCampaingByIdId: // value for 'getCampaingByIdId'
 *   },
 * });
 */
export function useGetCampaingByIdMinQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCampaingByIdMinQuery,
    GetCampaingByIdMinQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCampaingByIdMinQuery,
    GetCampaingByIdMinQueryVariables
  >(GetCampaingByIdMinDocument, options);
}
export function useGetCampaingByIdMinLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCampaingByIdMinQuery,
    GetCampaingByIdMinQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCampaingByIdMinQuery,
    GetCampaingByIdMinQueryVariables
  >(GetCampaingByIdMinDocument, options);
}
export type GetCampaingByIdMinQueryHookResult = ReturnType<
  typeof useGetCampaingByIdMinQuery
>;
export type GetCampaingByIdMinLazyQueryHookResult = ReturnType<
  typeof useGetCampaingByIdMinLazyQuery
>;
export type GetCampaingByIdMinQueryResult = Apollo.QueryResult<
  GetCampaingByIdMinQuery,
  GetCampaingByIdMinQueryVariables
>;
export const AddFilesToCampaingDocument = gql`
  mutation AddFilesToCampaing($input: AddFileCampaingInput!) {
    addFilesToCampaing(input: $input) {
      files {
        images {
          _id
          approved
          size
          thumb
          title
          type
          url
        }
        signature {
          _id
          approved
          size
          thumb
          title
          type
          url
        }
        videos {
          _id
          approved
          size
          thumb
          title
          type
          url
        }
      }
    }
  }
`;
export type AddFilesToCampaingMutationFn = Apollo.MutationFunction<
  AddFilesToCampaingMutation,
  AddFilesToCampaingMutationVariables
>;

/**
 * __useAddFilesToCampaingMutation__
 *
 * To run a mutation, you first call `useAddFilesToCampaingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFilesToCampaingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFilesToCampaingMutation, { data, loading, error }] = useAddFilesToCampaingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFilesToCampaingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddFilesToCampaingMutation,
    AddFilesToCampaingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddFilesToCampaingMutation,
    AddFilesToCampaingMutationVariables
  >(AddFilesToCampaingDocument, options);
}
export type AddFilesToCampaingMutationHookResult = ReturnType<
  typeof useAddFilesToCampaingMutation
>;
export type AddFilesToCampaingMutationResult =
  Apollo.MutationResult<AddFilesToCampaingMutation>;
export type AddFilesToCampaingMutationOptions = Apollo.BaseMutationOptions<
  AddFilesToCampaingMutation,
  AddFilesToCampaingMutationVariables
>;
export const ApproveFileDocument = gql`
  mutation ApproveFile($input: ApproveFileInput!) {
    approveFile(input: $input)
  }
`;
export type ApproveFileMutationFn = Apollo.MutationFunction<
  ApproveFileMutation,
  ApproveFileMutationVariables
>;

/**
 * __useApproveFileMutation__
 *
 * To run a mutation, you first call `useApproveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveFileMutation, { data, loading, error }] = useApproveFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveFileMutation,
    ApproveFileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ApproveFileMutation, ApproveFileMutationVariables>(
    ApproveFileDocument,
    options
  );
}
export type ApproveFileMutationHookResult = ReturnType<
  typeof useApproveFileMutation
>;
export type ApproveFileMutationResult =
  Apollo.MutationResult<ApproveFileMutation>;
export type ApproveFileMutationOptions = Apollo.BaseMutationOptions<
  ApproveFileMutation,
  ApproveFileMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($input: SignInInputMain!) {
    signIn(input: $input) {
      token
      role
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const ConsultantMeDocument = gql`
  query ConsultantMe {
    consultantMe {
      _id
      name
      email
      office
    }
  }
`;

/**
 * __useConsultantMeQuery__
 *
 * To run a query within a React component, call `useConsultantMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsultantMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsultantMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useConsultantMeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ConsultantMeQuery,
    ConsultantMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ConsultantMeQuery, ConsultantMeQueryVariables>(
    ConsultantMeDocument,
    options
  );
}
export function useConsultantMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConsultantMeQuery,
    ConsultantMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ConsultantMeQuery, ConsultantMeQueryVariables>(
    ConsultantMeDocument,
    options
  );
}
export type ConsultantMeQueryHookResult = ReturnType<
  typeof useConsultantMeQuery
>;
export type ConsultantMeLazyQueryHookResult = ReturnType<
  typeof useConsultantMeLazyQuery
>;
export type ConsultantMeQueryResult = Apollo.QueryResult<
  ConsultantMeQuery,
  ConsultantMeQueryVariables
>;
export const CampaingByIdDocument = gql`
  query CampaingById($getCampaingByIdId: String!) {
    getCampaingById(id: $getCampaingByIdId) {
      _id
      client {
        _id
        name
        email
      }
      consultant {
        _id
        name
        email
        office
      }
    }
  }
`;

/**
 * __useCampaingByIdQuery__
 *
 * To run a query within a React component, call `useCampaingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaingByIdQuery({
 *   variables: {
 *      getCampaingByIdId: // value for 'getCampaingByIdId'
 *   },
 * });
 */
export function useCampaingByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    CampaingByIdQuery,
    CampaingByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CampaingByIdQuery, CampaingByIdQueryVariables>(
    CampaingByIdDocument,
    options
  );
}
export function useCampaingByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CampaingByIdQuery,
    CampaingByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CampaingByIdQuery, CampaingByIdQueryVariables>(
    CampaingByIdDocument,
    options
  );
}
export type CampaingByIdQueryHookResult = ReturnType<
  typeof useCampaingByIdQuery
>;
export type CampaingByIdLazyQueryHookResult = ReturnType<
  typeof useCampaingByIdLazyQuery
>;
export type CampaingByIdQueryResult = Apollo.QueryResult<
  CampaingByIdQuery,
  CampaingByIdQueryVariables
>;
export const ConsultantsDocument = gql`
  query Consultants {
    consultants {
      _id
      name
      email
      office
    }
  }
`;

/**
 * __useConsultantsQuery__
 *
 * To run a query within a React component, call `useConsultantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsultantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsultantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConsultantsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ConsultantsQuery,
    ConsultantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ConsultantsQuery, ConsultantsQueryVariables>(
    ConsultantsDocument,
    options
  );
}
export function useConsultantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConsultantsQuery,
    ConsultantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ConsultantsQuery, ConsultantsQueryVariables>(
    ConsultantsDocument,
    options
  );
}
export type ConsultantsQueryHookResult = ReturnType<typeof useConsultantsQuery>;
export type ConsultantsLazyQueryHookResult = ReturnType<
  typeof useConsultantsLazyQuery
>;
export type ConsultantsQueryResult = Apollo.QueryResult<
  ConsultantsQuery,
  ConsultantsQueryVariables
>;
export const AddConsultantDocument = gql`
  mutation AddConsultant($input: AddConsultantInput!) {
    addConsultant(input: $input) {
      _id
      name
      email
      office
      role
    }
  }
`;
export type AddConsultantMutationFn = Apollo.MutationFunction<
  AddConsultantMutation,
  AddConsultantMutationVariables
>;

/**
 * __useAddConsultantMutation__
 *
 * To run a mutation, you first call `useAddConsultantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConsultantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConsultantMutation, { data, loading, error }] = useAddConsultantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddConsultantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddConsultantMutation,
    AddConsultantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddConsultantMutation,
    AddConsultantMutationVariables
  >(AddConsultantDocument, options);
}
export type AddConsultantMutationHookResult = ReturnType<
  typeof useAddConsultantMutation
>;
export type AddConsultantMutationResult =
  Apollo.MutationResult<AddConsultantMutation>;
export type AddConsultantMutationOptions = Apollo.BaseMutationOptions<
  AddConsultantMutation,
  AddConsultantMutationVariables
>;
export const ClientAllDetailsDocument = gql`
  query ClientAllDetails($clientId: String!) {
    client(id: $clientId) {
      _id
      name
      email
      cnpj
      contractType {
        title
        type
      }
      address {
        city
        complement
        neighborhood
        number
        state
        street
        zipcode
      }
      phone
      whatsapp
      othersContracts {
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
    }
  }
`;

/**
 * __useClientAllDetailsQuery__
 *
 * To run a query within a React component, call `useClientAllDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientAllDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientAllDetailsQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientAllDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientAllDetailsQuery,
    ClientAllDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClientAllDetailsQuery, ClientAllDetailsQueryVariables>(
    ClientAllDetailsDocument,
    options
  );
}
export function useClientAllDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientAllDetailsQuery,
    ClientAllDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ClientAllDetailsQuery,
    ClientAllDetailsQueryVariables
  >(ClientAllDetailsDocument, options);
}
export type ClientAllDetailsQueryHookResult = ReturnType<
  typeof useClientAllDetailsQuery
>;
export type ClientAllDetailsLazyQueryHookResult = ReturnType<
  typeof useClientAllDetailsLazyQuery
>;
export type ClientAllDetailsQueryResult = Apollo.QueryResult<
  ClientAllDetailsQuery,
  ClientAllDetailsQueryVariables
>;
export const UpdateClientDocument = gql`
  mutation UpdateClient($input: UpdateClientInput!) {
    updateClient(input: $input) {
      _id
      name
      email
      cnpj
      contractType {
        title
        type
      }
      address {
        city
        complement
        neighborhood
        number
        state
        street
        zipcode
      }
      phone
      whatsapp
      othersContracts {
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
    }
  }
`;
export type UpdateClientMutationFn = Apollo.MutationFunction<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >(UpdateClientDocument, options);
}
export type UpdateClientMutationHookResult = ReturnType<
  typeof useUpdateClientMutation
>;
export type UpdateClientMutationResult =
  Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;
export const GetMeDocument = gql`
  query GetMe {
    getMe {
      id
      name
      email
      office
      role
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>;
export const AddCampaingDocument = gql`
  mutation AddCampaing($input: AddCampaingInput!) {
    addCampaing(input: $input) {
      _id
    }
  }
`;
export type AddCampaingMutationFn = Apollo.MutationFunction<
  AddCampaingMutation,
  AddCampaingMutationVariables
>;

/**
 * __useAddCampaingMutation__
 *
 * To run a mutation, you first call `useAddCampaingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCampaingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCampaingMutation, { data, loading, error }] = useAddCampaingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCampaingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCampaingMutation,
    AddCampaingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCampaingMutation, AddCampaingMutationVariables>(
    AddCampaingDocument,
    options
  );
}
export type AddCampaingMutationHookResult = ReturnType<
  typeof useAddCampaingMutation
>;
export type AddCampaingMutationResult =
  Apollo.MutationResult<AddCampaingMutation>;
export type AddCampaingMutationOptions = Apollo.BaseMutationOptions<
  AddCampaingMutation,
  AddCampaingMutationVariables
>;
export const AddLinkDocument = gql`
  mutation AddLink($input: AddLinkInput!) {
    addLink(input: $input) {
      _id
      title
      links {
        link
        title
      }
    }
  }
`;
export type AddLinkMutationFn = Apollo.MutationFunction<
  AddLinkMutation,
  AddLinkMutationVariables
>;

/**
 * __useAddLinkMutation__
 *
 * To run a mutation, you first call `useAddLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinkMutation, { data, loading, error }] = useAddLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddLinkMutation,
    AddLinkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddLinkMutation, AddLinkMutationVariables>(
    AddLinkDocument,
    options
  );
}
export type AddLinkMutationHookResult = ReturnType<typeof useAddLinkMutation>;
export type AddLinkMutationResult = Apollo.MutationResult<AddLinkMutation>;
export type AddLinkMutationOptions = Apollo.BaseMutationOptions<
  AddLinkMutation,
  AddLinkMutationVariables
>;
export const RemoveLinkDocument = gql`
  mutation RemoveLink($input: RemoveLinkInput!) {
    removeLink(input: $input)
  }
`;
export type RemoveLinkMutationFn = Apollo.MutationFunction<
  RemoveLinkMutation,
  RemoveLinkMutationVariables
>;

/**
 * __useRemoveLinkMutation__
 *
 * To run a mutation, you first call `useRemoveLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLinkMutation, { data, loading, error }] = useRemoveLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveLinkMutation,
    RemoveLinkMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveLinkMutation, RemoveLinkMutationVariables>(
    RemoveLinkDocument,
    options
  );
}
export type RemoveLinkMutationHookResult = ReturnType<
  typeof useRemoveLinkMutation
>;
export type RemoveLinkMutationResult =
  Apollo.MutationResult<RemoveLinkMutation>;
export type RemoveLinkMutationOptions = Apollo.BaseMutationOptions<
  RemoveLinkMutation,
  RemoveLinkMutationVariables
>;
export const AddMeetDocument = gql`
  mutation AddMeet($input: AddMeetInput!) {
    addMeet(input: $input) {
      meet {
        date
        hour
        title
      }
    }
  }
`;
export type AddMeetMutationFn = Apollo.MutationFunction<
  AddMeetMutation,
  AddMeetMutationVariables
>;

/**
 * __useAddMeetMutation__
 *
 * To run a mutation, you first call `useAddMeetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMeetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMeetMutation, { data, loading, error }] = useAddMeetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMeetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMeetMutation,
    AddMeetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddMeetMutation, AddMeetMutationVariables>(
    AddMeetDocument,
    options
  );
}
export type AddMeetMutationHookResult = ReturnType<typeof useAddMeetMutation>;
export type AddMeetMutationResult = Apollo.MutationResult<AddMeetMutation>;
export type AddMeetMutationOptions = Apollo.BaseMutationOptions<
  AddMeetMutation,
  AddMeetMutationVariables
>;
export const AddResultsCampaingDocument = gql`
  mutation AddResultsCampaing($input: AddResultsCampaingInput!) {
    addResultsCampaing(input: $input)
  }
`;
export type AddResultsCampaingMutationFn = Apollo.MutationFunction<
  AddResultsCampaingMutation,
  AddResultsCampaingMutationVariables
>;

/**
 * __useAddResultsCampaingMutation__
 *
 * To run a mutation, you first call `useAddResultsCampaingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddResultsCampaingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addResultsCampaingMutation, { data, loading, error }] = useAddResultsCampaingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddResultsCampaingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddResultsCampaingMutation,
    AddResultsCampaingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddResultsCampaingMutation,
    AddResultsCampaingMutationVariables
  >(AddResultsCampaingDocument, options);
}
export type AddResultsCampaingMutationHookResult = ReturnType<
  typeof useAddResultsCampaingMutation
>;
export type AddResultsCampaingMutationResult =
  Apollo.MutationResult<AddResultsCampaingMutation>;
export type AddResultsCampaingMutationOptions = Apollo.BaseMutationOptions<
  AddResultsCampaingMutation,
  AddResultsCampaingMutationVariables
>;
export const ClientByNameFilteredDocument = gql`
  query ClientByNameFiltered($name: String!) {
    clientByName(name: $name) {
      _id
      name
      email
      whatsapp
      contractType {
        title
        type
      }
      othersContracts {
        _id
        extra_art
        extra_network
        landing_page
        site_development
        site_maintenance
      }
    }
  }
`;

/**
 * __useClientByNameFilteredQuery__
 *
 * To run a query within a React component, call `useClientByNameFilteredQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientByNameFilteredQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientByNameFilteredQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useClientByNameFilteredQuery(
  baseOptions: Apollo.QueryHookOptions<
    ClientByNameFilteredQuery,
    ClientByNameFilteredQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ClientByNameFilteredQuery,
    ClientByNameFilteredQueryVariables
  >(ClientByNameFilteredDocument, options);
}
export function useClientByNameFilteredLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClientByNameFilteredQuery,
    ClientByNameFilteredQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ClientByNameFilteredQuery,
    ClientByNameFilteredQueryVariables
  >(ClientByNameFilteredDocument, options);
}
export type ClientByNameFilteredQueryHookResult = ReturnType<
  typeof useClientByNameFilteredQuery
>;
export type ClientByNameFilteredLazyQueryHookResult = ReturnType<
  typeof useClientByNameFilteredLazyQuery
>;
export type ClientByNameFilteredQueryResult = Apollo.QueryResult<
  ClientByNameFilteredQuery,
  ClientByNameFilteredQueryVariables
>;
export const ConsultantDocument = gql`
  query Consultant($consultantId: String!) {
    consultant(id: $consultantId) {
      _id
      name
      email
      office
      role
    }
  }
`;

/**
 * __useConsultantQuery__
 *
 * To run a query within a React component, call `useConsultantQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsultantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsultantQuery({
 *   variables: {
 *      consultantId: // value for 'consultantId'
 *   },
 * });
 */
export function useConsultantQuery(
  baseOptions: Apollo.QueryHookOptions<
    ConsultantQuery,
    ConsultantQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ConsultantQuery, ConsultantQueryVariables>(
    ConsultantDocument,
    options
  );
}
export function useConsultantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConsultantQuery,
    ConsultantQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ConsultantQuery, ConsultantQueryVariables>(
    ConsultantDocument,
    options
  );
}
export type ConsultantQueryHookResult = ReturnType<typeof useConsultantQuery>;
export type ConsultantLazyQueryHookResult = ReturnType<
  typeof useConsultantLazyQuery
>;
export type ConsultantQueryResult = Apollo.QueryResult<
  ConsultantQuery,
  ConsultantQueryVariables
>;
export const UdpatePasswordDocument = gql`
  mutation UdpatePassword($input: UpdatePasswordInput!) {
    udpatePassword(input: $input) {
      _id
      name
      email
      office
      role
    }
  }
`;
export type UdpatePasswordMutationFn = Apollo.MutationFunction<
  UdpatePasswordMutation,
  UdpatePasswordMutationVariables
>;

/**
 * __useUdpatePasswordMutation__
 *
 * To run a mutation, you first call `useUdpatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUdpatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [udpatePasswordMutation, { data, loading, error }] = useUdpatePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUdpatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UdpatePasswordMutation,
    UdpatePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UdpatePasswordMutation,
    UdpatePasswordMutationVariables
  >(UdpatePasswordDocument, options);
}
export type UdpatePasswordMutationHookResult = ReturnType<
  typeof useUdpatePasswordMutation
>;
export type UdpatePasswordMutationResult =
  Apollo.MutationResult<UdpatePasswordMutation>;
export type UdpatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UdpatePasswordMutation,
  UdpatePasswordMutationVariables
>;
export const SendNotificationToClientDocument = gql`
  mutation SendNotificationToClient($input: AddNotificationInput!) {
    sendNotificationToClient(input: $input)
  }
`;
export type SendNotificationToClientMutationFn = Apollo.MutationFunction<
  SendNotificationToClientMutation,
  SendNotificationToClientMutationVariables
>;

/**
 * __useSendNotificationToClientMutation__
 *
 * To run a mutation, you first call `useSendNotificationToClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationToClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationToClientMutation, { data, loading, error }] = useSendNotificationToClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendNotificationToClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendNotificationToClientMutation,
    SendNotificationToClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendNotificationToClientMutation,
    SendNotificationToClientMutationVariables
  >(SendNotificationToClientDocument, options);
}
export type SendNotificationToClientMutationHookResult = ReturnType<
  typeof useSendNotificationToClientMutation
>;
export type SendNotificationToClientMutationResult =
  Apollo.MutationResult<SendNotificationToClientMutation>;
export type SendNotificationToClientMutationOptions =
  Apollo.BaseMutationOptions<
    SendNotificationToClientMutation,
    SendNotificationToClientMutationVariables
  >;
export const GetTotalClientsDocument = gql`
  query GetTotalClients {
    totalClients
  }
`;

/**
 * __useGetTotalClientsQuery__
 *
 * To run a query within a React component, call `useGetTotalClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalClientsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTotalClientsQuery,
    GetTotalClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTotalClientsQuery, GetTotalClientsQueryVariables>(
    GetTotalClientsDocument,
    options
  );
}
export function useGetTotalClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTotalClientsQuery,
    GetTotalClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTotalClientsQuery,
    GetTotalClientsQueryVariables
  >(GetTotalClientsDocument, options);
}
export type GetTotalClientsQueryHookResult = ReturnType<
  typeof useGetTotalClientsQuery
>;
export type GetTotalClientsLazyQueryHookResult = ReturnType<
  typeof useGetTotalClientsLazyQuery
>;
export type GetTotalClientsQueryResult = Apollo.QueryResult<
  GetTotalClientsQuery,
  GetTotalClientsQueryVariables
>;
export const GetTotalCampaingsDocument = gql`
  query GetTotalCampaings {
    totalCampaings
  }
`;

/**
 * __useGetTotalCampaingsQuery__
 *
 * To run a query within a React component, call `useGetTotalCampaingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalCampaingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalCampaingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalCampaingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTotalCampaingsQuery,
    GetTotalCampaingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTotalCampaingsQuery,
    GetTotalCampaingsQueryVariables
  >(GetTotalCampaingsDocument, options);
}
export function useGetTotalCampaingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTotalCampaingsQuery,
    GetTotalCampaingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTotalCampaingsQuery,
    GetTotalCampaingsQueryVariables
  >(GetTotalCampaingsDocument, options);
}
export type GetTotalCampaingsQueryHookResult = ReturnType<
  typeof useGetTotalCampaingsQuery
>;
export type GetTotalCampaingsLazyQueryHookResult = ReturnType<
  typeof useGetTotalCampaingsLazyQuery
>;
export type GetTotalCampaingsQueryResult = Apollo.QueryResult<
  GetTotalCampaingsQuery,
  GetTotalCampaingsQueryVariables
>;
export const RemoveFileFromCampaingDocument = gql`
  mutation RemoveFileFromCampaing($input: RemoveImageCampaingInput!) {
    removeFileFromCampaing(input: $input)
  }
`;
export type RemoveFileFromCampaingMutationFn = Apollo.MutationFunction<
  RemoveFileFromCampaingMutation,
  RemoveFileFromCampaingMutationVariables
>;

/**
 * __useRemoveFileFromCampaingMutation__
 *
 * To run a mutation, you first call `useRemoveFileFromCampaingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFileFromCampaingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFileFromCampaingMutation, { data, loading, error }] = useRemoveFileFromCampaingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFileFromCampaingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveFileFromCampaingMutation,
    RemoveFileFromCampaingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveFileFromCampaingMutation,
    RemoveFileFromCampaingMutationVariables
  >(RemoveFileFromCampaingDocument, options);
}
export type RemoveFileFromCampaingMutationHookResult = ReturnType<
  typeof useRemoveFileFromCampaingMutation
>;
export type RemoveFileFromCampaingMutationResult =
  Apollo.MutationResult<RemoveFileFromCampaingMutation>;
export type RemoveFileFromCampaingMutationOptions = Apollo.BaseMutationOptions<
  RemoveFileFromCampaingMutation,
  RemoveFileFromCampaingMutationVariables
>;
