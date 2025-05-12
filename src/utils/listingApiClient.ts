import { isUuid } from 'utils/uuidUtils';

const LISTING_BASE_URL = 'https://garage-backend.onrender.com/getListing';

type ListingResponse =
  | {
      result: ListingResult | null;
      error: '';
    }
  // wasn't actually able to recreate this one, guessing at the shape
  | {
      error: string;
    };

// API response result is much richer than this, duck typing the fields we care about for this project
// TODO pare this back
type ListingResult = {
  result: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    listingTitle: string;
    sellingPrice: number;
    imageUrls: string[];
    listingStatus: number; // what are statuses?
    // tags: string[]; what types here?
    categories: number[];
    itemBrand: string;
    listingDescription: string;
    itemAge: number;
    itemLength: number;
    itemWidth: number;
    itemHeight: number;
    itemWeight: number;
    // "mileage": null,
    hasServiceRecords: boolean;
    hasRust: boolean;
    isFourWheelDrive: null;
    tankSize: number;
    pumpSize: number;
    hasPumpTest: number;
    aerialLength: null;
    isAuction: false;
    expirationDate: null;
    finalPrice: null;
    originalPrice: 50000;
    lowestPrice: 40000;
    isAdaptivePricing: true;
    vin: null;
    categoryV2Id: 'fa257783-f061-4187-9eac-110ffe1f7c13';
    userId: 'c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83';
    addressId: '8fa9e1eb-a3c5-4a9a-95cb-13bcd34c1a1b';
    user: {
      id: 'c6c75d65-7ab3-4a65-8d79-5a69f8f4fd83';
      email: 'ds906262@gmail.com';
    };
    categoryV2: {
      id: 'fa257783-f061-4187-9eac-110ffe1f7c13';
      createdAt: '2025-04-15T22:59:21.911Z';
      updatedAt: '2025-04-18T14:56:35.096Z';
      name: 'Engines and pumpers';
      description: 'Discover available used fire engines and pumpers across the United States. Nationwide delivery available on all listings.';
      imageUrl: 'https://tckhzquklzptybofowyk.supabase.co/storage/v1/object/public/categories//engines-and-pumpers.jpg';
      slug: 'used-engines-and-pumpers';
      parentCategoryId: 'b21ad398-fd0c-4c41-bab6-8d2a0852e953';
    };
  };
};

// TODO return another type?
const getListing = async (uuid: string): Promise<ListingResult> => {
  if (!isUuid(uuid)) {
    throw Error('Bad argument, listing ids must be uuids');
  }

  const res = await fetch(LISTING_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: uuid,
    }),
  });

  if (!res.ok) {
    throw Error(
      `Error getting listing, bad http status code ${res.status.toString()}`,
    );
  }

  const json = (await res.json()) as ListingResponse;
  if (json.error) {
    throw Error(
      `Error getting listing. Response body contained error ${json.error}`,
    );
  }

  if (!('result' in json) || json.result === null) {
    throw Error(
      `Listing not found, uuid ${uuid} appears not to match a real listing`,
    );
  }

  return json.result;
};

