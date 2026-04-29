import { supabase } from './supabase';

/**
 * Upload an image to Supabase Storage and return the public URL.
 * Handles file path generation and overwriting if needed.
 */
export async function uploadImage(file: File, bucket: string = 'units', pathPrefix: string = 'images'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${pathPrefix}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

/**
 * Delete an image from Supabase Storage using its public URL.
 */
export async function deleteImage(publicUrl: string, bucket: string = 'units'): Promise<boolean> {
  try {
    if (!publicUrl) return true;
    
    // Extract path from public URL
    // e.g., https://...supabase.co/storage/v1/object/public/units/images/myimage.jpg
    const urlParts = publicUrl.split(`/storage/v1/object/public/${bucket}/`);
    if (urlParts.length < 2) return false;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}
