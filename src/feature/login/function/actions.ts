import type {
  AuthTokenResponsePassword,
  UserResponse,
} from "@supabase/supabase-js";

import { supabase } from "../../../util/supabase/global";

export async function loginAction(
  _currentState: AuthTokenResponsePassword,
  formData: FormData,
) {
  const email = formData.get("email")!.toString();
  const password = formData.get("password")!.toString();

  const response = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return response;
}

export async function updatePasswordAction(
  _currentState: UserResponse,
  formData: FormData,
) {
  const new_password = formData.get("password")!.toString();

  const response = await supabase.auth.updateUser({
    password: new_password,
  });

  return response;
}
