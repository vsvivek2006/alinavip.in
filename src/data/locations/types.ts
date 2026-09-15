export type LocationRegion =
  | 'Gurgaon'
  | 'Delhi NCR'
  | 'Delhi'
  | 'Noida'
  | 'Greater Noida'
  | 'Ghaziabad'
  | 'Faridabad';

export interface LocationOption {
  title: string;
  desc: string;
}

export interface LocationReason {
  title: string;
  desc: string;
}

export interface LocalCharacteristicsData {
  connectivity: string;
  metroStations: string[];
  majorRoads: string[];
  hotels: string[];
  residentialEstates: string[];
  corporateParks: string[];
}

export interface PrivacySafetyData {
  overview: string;
  protocols: string[];
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface RelatedGuide {
  slug: string;
  title: string;
  excerpt: string;
}

export interface HubCorridor {
  title: string;
  desc: string;
  slugs: string[];
}

export interface HubBusinessDistrict {
  name: string;
  desc: string;
  companies: string;
}

export interface HubHospitalityContext {
  title: string;
  desc: string;
  hotels: string[];
}

export interface HubTransportInfo {
  title: string;
  desc: string;
  routes: string[];
}

export interface HubDetails {
  overview: string;
  corridors: HubCorridor[];
  businessDistricts?: HubBusinessDistrict[];
  hospitalityContext?: HubHospitalityContext[];
  transportInfo?: HubTransportInfo[];
}

export interface LocationData {
  slug: string;
  name: string;
  area: string;
  city: string;
  region: LocationRegion;
  corridor?: string;
  isHub?: boolean;
  hubType?: 'main-gurgaon' | 'delhi-ncr' | 'regional';
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords?: string[];
  h1: string;
  about: {
    intro: string;
    historyVibe: string;
    landmarks: string[];
    commercialProfile: string;
  };
  serviceOptions: {
    overview: string;
    options: LocationOption[];
  };
  whyChoose: {
    overview: string;
    reasons: LocationReason[];
  };
  localCharacteristics: LocalCharacteristicsData;
  privacySafety: PrivacySafetyData;
  serviceCategories?: string[];
  nearbyAreas: string[];
  howItWorks?: {
    steps: HowItWorksStep[];
  };
  faqs: LocationFaq[];
  relatedGuides?: RelatedGuide[];
  hubDetails?: HubDetails;
}
