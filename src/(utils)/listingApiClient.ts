import { isUuid } from '@/(utils)/uuidUtils';
import { InvoiceInfo } from '@/app/InvoiceDocument';

const LISTING_BASE_URL = 'https://garage-backend.onrender.com/getListing';

type ListingResponse =
  | {
      result: {
        listing: ListingResult;
      } | null;
      error: '';
    }
  // wasn't actually able to recreate this one, guessing at the shape
  | {
      error: string;
    };

// API response result is much richer than this, duck typing the fields we care about for this project
type ListingResult = {
  id: string;
  listingTitle: string;
  sellingPrice: number;
  listingDescription: string;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
};

export const getListing = async (uuid: string): Promise<ListingResult> => {
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

  // not checking listing status

  return json.result.listing;
};

export const toInvoiceInfo = (result: ListingResult): InvoiceInfo => {
  return {
    listingTitle: result.listingTitle,
    listingDescription: result.listingDescription,
    sellingPrice: result.sellingPrice,
    itemLength: result.itemLength,
    itemWidth: result.itemWidth,
    itemHeight: result.itemHeight,
    itemWeight: result.itemWeight,
  };
};

