import { OpportunityCreateDtoIndoorsOutdoorsOnlineEnum } from "../../api";

export const formatIndoorsOutdoorsOnline = (
  indoorsOutdoorsOnline: OpportunityCreateDtoIndoorsOutdoorsOnlineEnum[]
): string => {
  return indoorsOutdoorsOnline
    .map((val) => {
      switch (val) {
        case OpportunityCreateDtoIndoorsOutdoorsOnlineEnum.Indoors:
          return "Indoors";
        case OpportunityCreateDtoIndoorsOutdoorsOnlineEnum.Outdoors:
          return "Outdoors";
        case OpportunityCreateDtoIndoorsOutdoorsOnlineEnum.Online:
          return "Online";
      }
      // Should not be returned, all cases should be handled
      return "";
    })
    .join(", ");
};
