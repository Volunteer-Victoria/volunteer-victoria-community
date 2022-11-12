import { useEffect } from "react";

/**
 * Run a function once, on mount.
 *
 * @warn This likely should only be used on page-level components.  Most components
 * should not be concerned with mounting and unmounting.
 */
export const useMount: typeof useEffect = (callback) => {
  useEffect(
    () => callback(),

    // Intentionally disable the linter here. We only want to run this callback
    // once, when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
