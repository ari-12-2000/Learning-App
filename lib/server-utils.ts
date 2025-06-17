import { Decimal } from "./generated/prisma/runtime/library";

// utils/serializeBigInt.ts
export function serializeBigInt(obj: any): any {
  if (typeof obj === 'bigint') return obj.toString(); // convert BigInt to string
  if (obj instanceof Decimal) {console.log(obj); return obj.toString(); }          // Handle Decimal
  if (Array.isArray(obj)) return obj.map(serializeBigInt); // handle arrays recursively
  if (typeof obj === 'object' && obj !== null) { // safely handle non-null objects
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeBigInt(value)])
    );
  }
  return obj; // return as-is for other types (number, string, boolean, null, undefined)
}