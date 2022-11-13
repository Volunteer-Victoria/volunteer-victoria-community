import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Fuse from "fuse.js";
import { OpportunityResponseDto } from "../../api";
import { Loader } from "../../components/Loader";
import { OpportunitiesList } from "../../components/OpportunitiesList";
import { RequireAuth } from "../../components/RequireAuth";
import { useDebounce } from "../../hooks";
import { useUser } from "../../components/UserDataProvider/use-user";

export const OpportunitiesPage = () => {
  const initialOpportunities = useLoaderData() as OpportunityResponseDto[];

  const user = useUser();
  const [loading] = useState(false);
  const [opportunities] =
    useState<OpportunityResponseDto[]>(initialOpportunities);

  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<"soonest" | "newest">("newest");
  const [scope, setScope] = useState<"mine" | "all">("all");

  const debouncedKeyword = useDebounce(keyword);

  const sortedOpportunities = useMemo(() => {
    return [...opportunities].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.postedTime - a.postedTime;
        case "soonest":
          return a.startTime - b.startTime;
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

    if (debouncedKeyword === "") return sortedOpportunities;

    return fuse.search(debouncedKeyword).map((result) => result.item);
  }, [scope, sortedOpportunities, debouncedKeyword, fuse, user.id]);

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
              <TextField
                label="Search Keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                variant="outlined"
                sx={{
                  flex: 4,
                }}
                InputProps={{
                  sx: { backgroundColor: "white" },
                }}
              />
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
