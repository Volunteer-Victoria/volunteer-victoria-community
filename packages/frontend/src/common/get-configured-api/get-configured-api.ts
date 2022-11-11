import { Configuration, ConfigurationParameters, DefaultApi } from "../../api";

export const getConfiguredApi = (
  configurationParams?: ConfigurationParameters
) => {
  const configuration = new Configuration({
    basePath: process.env.REACT_APP_API_BASE_PATH,
    ...configurationParams,
  });

  return new DefaultApi(configuration);
};
