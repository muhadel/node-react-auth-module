import { TokenPayload } from "./token-payload";

interface DataObject {
  user: TokenPayload | null;
  isAuthenticated: boolean;
}

interface ErrorObject {
  message?: string;
}

export interface AuthState {
  data: DataObject;
  error: ErrorObject | null;
  isFetching: boolean;
  stage: "idle" | "loading" | "fulfilled" | "rejected";
}
