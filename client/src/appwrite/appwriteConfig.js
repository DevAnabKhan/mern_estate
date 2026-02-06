import { Client, Account, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6982bc000010fa3f9a84");

export const account = new Account(client);
export const storage = new Storage(client);
export { ID }; // <-- export ID
