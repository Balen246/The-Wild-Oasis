import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updateData;

  //1. update password OR fullName

  if (password) updateData = { password };
  if (fullName) {
    updateData = {
      data: {
        fullName,
      },
    };
  }

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser(updateData);

  if (updateError) throw new Error(updateError.message);

  if (!avatar) return updatedUser;

  //2. upload the avatar image
  const fileName = `avatar-${updatedUser.user.id}-${Math.random()}.jpg`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. update avatar in the user
  const { data: updateAvatar, error: errorAvatar } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (errorAvatar)
    throw new Error("There is an error in updating the user avatar");

  return updateAvatar;
}
