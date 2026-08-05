// Hand-written types matching the schema created manually in the Supabase
// dashboard (Table Editor). Keep this file in sync any time you add/rename
// a column there — there's no CLI generation step in this workflow.

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          body: string | null;
          icon: string | null;
          order_index: number | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['services']['Row']> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database['public']['Tables']['services']['Row']>;
      };
      case_studies: {
        Row: {
          id: string;
          slug: string | null;
          title: string | null;
          business_context: string | null;
          problem: string | null;
          baseline: string | null;
          diagnosis: string | null;
          actions: string | null;
          results: string | null;
          limitations: string | null;
          learning: string | null;
          cover_image_key: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['case_studies']['Row']>;
        Update: Partial<Database['public']['Tables']['case_studies']['Row']>;
      };
      portfolio_items: {
        Row: {
          id: string;
          slug: string | null;
          title: string | null;
          client_name: string | null;
          summary: string | null;
          cover_image_key: string | null;
          case_study_id: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['portfolio_items']['Row']>;
        Update: Partial<Database['public']['Tables']['portfolio_items']['Row']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string | null;
          title: string | null;
          excerpt: string | null;
          body: string | null;
          cover_image_key: string | null;
          seo_title: string | null;
          seo_description: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['blog_posts']['Row']>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>;
      };
      job_openings: {
        Row: {
          id: string;
          slug: string | null;
          title: string | null;
          location: string | null;
          employment_type: string | null;
          description: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['job_openings']['Row']>;
        Update: Partial<Database['public']['Tables']['job_openings']['Row']>;
      };
      job_applications: {
        Row: {
          id: string;
          job_opening_id: string | null;
          name: string;
          email: string;
          resume_key: string | null;
          cover_note: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['job_applications']['Row']> & {
          name: string;
          email: string;
        };
        Update: Partial<Database['public']['Tables']['job_applications']['Row']>;
      };
      form_submissions: {
        Row: {
          id: string;
          business_name: string | null;
          product_or_service: string | null;
          location: string | null;
          current_marketing_activity: string | null;
          marketing_budget_range: string | null;
          main_problem: string | null;
          decision_maker_role: string | null;
          email: string;
          phone: string | null;
          source_page: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['form_submissions']['Row']> & {
          email: string;
        };
        Update: Partial<Database['public']['Tables']['form_submissions']['Row']>;
      };
    };
  };
}
