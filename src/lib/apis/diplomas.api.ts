import { NextRequest } from "next/server";
import { Diploma } from "../types/diplomas";
import { fetchPaginated } from "./paginated-fetch";

export async function getDiplomas(req: NextRequest) {
    return fetchPaginated<Diploma>({ req, endpoint: '/diplomas' })
}