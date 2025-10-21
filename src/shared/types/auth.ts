import { Role } from "../../../prisma/generated/prisma";

type AuthUser = {
  id: string;
  email: string;
  role: Role;
};
