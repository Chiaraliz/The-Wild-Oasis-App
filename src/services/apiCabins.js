import Supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await Supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
}

export async function deleteCabins(id) {
  const { error } = await Supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}

export async function createEditCabins(newCabin, id) {
  //1. create cabin
  const hasImagePath = newCabin.image?.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(newCabin.image);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = Supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cabin could not be created or edited");

  //2. upload the file
  const { error: storageError } = await Supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin if there was an error uploading the image
  if (storageError) {
    await Supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created or edited"
    );
  }

  return data;
}
