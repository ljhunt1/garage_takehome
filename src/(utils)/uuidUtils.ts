export const getUuidFromString = (search: string): string | null => {
  const matches =
    /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/.exec(
      search,
    );
  if (matches === null) {
    return null;
  }
  return matches[0];
};

export const isUuid = (st: string) => {
  return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(
    st,
  );
};
