import { getDiplomas } from "@/lib/apis/diplomas.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const payload = await getDiplomas(req);

    return NextResponse.json(payload);
}