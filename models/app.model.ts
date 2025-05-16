export const getRootURL = (): string => {
  const ROOT_URL = process.env.ROOT_URL;
  if (typeof ROOT_URL !== "string") {
    throw new Error(
      "Oops! It looks like you forgot to add ROOT_URL to the local .env. Try adding it and setting it to http://localhost:3000"
    );
  }

  return ROOT_URL;
};
