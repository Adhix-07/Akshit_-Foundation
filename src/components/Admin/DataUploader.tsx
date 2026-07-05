import { useState } from "react";
import { toast } from "sonner";

import donorsData from "../../data/donors.json";
import requestsData from "../../data/requests.json";
import collegeData from "../../data/college.json";
import { bulkUpload } from "../../services/dbServices.js";

type UploadAction = {
  key: string;
  label: string;
  uploadingLabel: string;
  tableName: string;
  data: Array<Record<string, unknown>>;
};

const uploadActions: UploadAction[] = [
  {
    key: "donors",
    label: "Upload Donors",
    uploadingLabel: "Uploading...",
    tableName: "donors",
    data: donorsData,
  },
  {
    key: "requests",
    label: "Upload Requests",
    uploadingLabel: "Uploading...",
    tableName: "requests",
    data: requestsData,
  },
  {
    key: "college",
    label: "Upload College",
    uploadingLabel: "Uploading...",
    tableName: "college_network",
    data: collegeData,
  },
];

export default function DataUploader() {
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleUpload = async ({ key, label, tableName, data }: UploadAction) => {
    setUploadingKey(key);
    const loadingToastId = toast.loading(`Uploading ${label.toLowerCase()}...`);

    try {
      await bulkUpload(tableName, data);
      toast.dismiss(loadingToastId);
      toast.success(`${label} completed successfully.`);
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToastId);
      toast.error(`Failed to upload ${label.toLowerCase()}. Check console for details.`);
    } finally {
      setUploadingKey(null);
    }
  };

  return (
    <section className="clay p-5 md:p-6 space-y-5">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
          Data Import
        </div>
        <h2 className="mt-1 text-lg md:text-xl font-extrabold tracking-tight">
          Bulk Upload to Supabase
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload prepared mock datasets into their matching Supabase tables.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {uploadActions.map((action) => {
          const isUploading = uploadingKey === action.key;
          const isDisabled = uploadingKey !== null;

          return (
            <button
              key={action.key}
              type="button"
              onClick={() => handleUpload(action)}
              disabled={isDisabled}
              className="clay-sm min-h-24 px-4 py-4 text-left transition-opacity duration-200 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="block text-sm font-bold text-foreground">
                {isUploading ? action.uploadingLabel : action.label}
              </span>
              <span className="mt-2 block text-xs text-muted-foreground">
                {action.data.length} records
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}