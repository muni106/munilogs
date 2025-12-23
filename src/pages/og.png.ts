import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";

const buffer = await generateOgImageForSite()
export const GET: APIRoute = async () =>
  new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
