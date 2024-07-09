import { createContext } from "react";
import { Account } from "../models/Account";

let account = new Account();

export const AccountContext = createContext<{
    account: Account;
    setAccount: React.Dispatch<React.SetStateAction<Account>>;
}>({
    account: account,
    setAccount: () => {},
})