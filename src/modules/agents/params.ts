import { DEFAULT_PAGE_SIZE} from "@/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const filterSearchparams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    
    page: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({ clearOnDefault: true })
};

export const loadSearchParams = createLoader(filterSearchparams);