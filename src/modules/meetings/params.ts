import { DEFAULT_PAGE_SIZE} from "@/constants";
import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum  } from "nuqs/server";
import { MeetingStatus } from "./types";

export const filterSearchparams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    
    page: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({ clearOnDefault: true }),

    agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),

    status: parseAsStringEnum(Object.values(MeetingStatus)),
};

export const loadSearchParams = createLoader(filterSearchparams);