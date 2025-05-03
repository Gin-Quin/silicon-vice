import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
	"https://qsdntsinnkhudrfcghje.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZG50c2lubmtodWRyZmNnaGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMTc5NzIsImV4cCI6MjA1ODc5Mzk3Mn0.rgYYRufau2XEWNdZXkaOPpyzquLbvFYUIZYvz-zO354",
);
