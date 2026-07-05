import { supabase } from "../lib/supabaseClient.js";

function normalizeDonorRecord(record) {
  return {
    full_name: record.full_name,
    phone_number: record.phone_number,
    blood_group: record.blood_group,
    last_donated_date: record.last_donated_date,
    latitude: Number(record.latitude),
    longitude: Number(record.longitude),
    is_active: Boolean(record.is_active),
  };
}

function buildInsertPayload(tableName, record) {
  if (tableName === "donors") {
    return normalizeDonorRecord(record);
  }

  return { ...record };
}

export async function bulkUpload(tableName, dataArray) {
  if (!tableName) {
    throw new Error("A valid Supabase table name is required.");
  }

  if (!Array.isArray(dataArray)) {
    throw new Error("bulkUpload expects dataArray to be an array.");
  }

  const uploadedRows = [];

  try {
    console.log(`Starting bulk upload to "${tableName}" with ${dataArray.length} records.`);

    for (const record of dataArray) {
      const payload = buildInsertPayload(tableName, record);
      const { data, error } = await supabase.from(tableName).insert(payload).select().single();

      if (error) {
        throw error;
      }

      uploadedRows.push(data);
      console.log(`Uploaded ${uploadedRows.length}/${dataArray.length} to "${tableName}".`);
    }

    console.log(`Bulk upload complete for "${tableName}".`);
    return uploadedRows;
  } catch (error) {
    console.error(`Bulk upload failed for "${tableName}".`, error);
    throw error;
  }
}
