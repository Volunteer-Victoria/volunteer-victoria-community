import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Fuse from "fuse.js";
import { OpportunityResponseDto } from "../../api";
import { Loader } from "../../components/Loader";
import { OpportunitiesList } from "../../components/OpportunitiesList";
import { RequireAuth } from "../../components/RequireAuth";
import { useUser } from "../../components/UserDataProvider/use-user";
import { Filter } from "./Filter";

export const OpportunitiesPage = () => {
  const initialOpportunities = useLoaderData() as OpportunityResponseDto[];

  const user = useUser();
  const [loading] = useState(false);
  const [opportunities] =
    useState<OpportunityResponseDto[]>(initialOpportunities);

  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<"soonest" | "newest">("newest");
  const [scope, setScope] = useState<"mine" | "all">("all");

  const sortedOpportunities = useMemo(() => {
    return [...opportunities].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.postedTime - a.postedTime;
        case "soonest":
          return a.occursDate.localeCompare(b.occursDate);
      }

      return 1;
    });
  }, [opportunities, sort]);

  const fuse = useMemo(() => {
    return new Fuse(sortedOpportunities, {
      keys: [
        "title",
        "description",
        "contactName",
        "locationName",
        "additionalInformation",
        "idealVolunteer",
      ],
    });
  }, [sortedOpportunities]);

  const filteredOpportunities = useMemo(() => {
    if (scope === "mine")
      return sortedOpportunities.filter((o) => o.postedByUserId === user.id);

    if (keyword === "") return sortedOpportunities;

    return fuse.search(keyword).map((result) => result.item);
  }, [scope, sortedOpportunities, keyword, fuse, user.id]);

  return (
    <>
      <RequireAuth>
        <Box>
          <Typography variant="h1">Volunteer Opportunities</Typography>
          <Box py={2}>
            <Tabs
              value={scope === "all" ? 0 : 1}
              aria-label="basic tabs example"
            >
              <Tab label="All" onClick={() => setScope("all")} />
              <Tab label="My Posts" onClick={() => setScope("mine")} />
            </Tabs>
          </Box>
          <Box pb={2} display={scope === "all" ? "block" : "none"}>
            <Stack
              component="form"
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={2}
            >
              <Filter keyword={keyword} setKeyword={setKeyword}></Filter>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel id="sort-select-label">Age</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sort}
                  label="Sort by"
                  onChange={(event) =>
                    setSort(event.target.value as "soonest" | "newest")
                  }
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="soonest">Soonest</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Stack spacing={2}>
            <Loader loading={loading}>
              <OpportunitiesList opportunities={filteredOpportunities} />
            </Loader>
          </Stack>
        </Box>
      </RequireAuth>
    </>
  );
};
