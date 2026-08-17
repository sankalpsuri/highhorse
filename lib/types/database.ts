export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string | null
          body: string | null
          icon: string | null
          order_index: number | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          summary?: string | null
          body?: string | null
          icon?: string | null
          order_index?: number | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          summary?: string | null
          body?: string | null
          icon?: string | null
          order_index?: number | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          id: string
          slug: string | null
          title: string | null
          business_context: string | null
          problem: string | null
          baseline: string | null
          diagnosis: string | null
          actions: string | null
          results: string | null
          limitations: string | null
          learning: string | null
          cover_image_key: string | null
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug?: string | null
          title?: string | null
          business_context?: string | null
          problem?: string | null
          baseline?: string | null
          diagnosis?: string | null
          actions?: string | null
          results?: string | null
          limitations?: string | null
          learning?: string | null
          cover_image_key?: string | null
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string | null
          business_context?: string | null
          problem?: string | null
          baseline?: string | null
          diagnosis?: string | null
          actions?: string | null
          results?: string | null
          limitations?: string | null
          learning?: string | null
          cover_image_key?: string | null
          published?: boolean
          created_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          id: string
          slug: string | null
          title: string | null
          client_name: string | null
          summary: string | null
          cover_image_key: string | null
          case_study_id: string | null
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug?: string | null
          title?: string | null
          client_name?: string | null
          summary?: string | null
          cover_image_key?: string | null
          case_study_id?: string | null
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string | null
          client_name?: string | null
          summary?: string | null
          cover_image_key?: string | null
          case_study_id?: string | null
          published?: boolean
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          slug: string | null
          title: string | null
          excerpt: string | null
          body: string | null
          cover_image_key: string | null
          seo_title: string | null
          seo_description: string | null
          published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug?: string | null
          title?: string | null
          excerpt?: string | null
          body?: string | null
          cover_image_key?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string | null
          excerpt?: string | null
          body?: string | null
          cover_image_key?: string | null
          seo_title?: string | null
          seo_description?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      job_openings: {
        Row: {
          id: string
          slug: string | null
          title: string | null
          location: string | null
          employment_type: string | null
          description: string | null
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug?: string | null
          title?: string | null
          location?: string | null
          employment_type?: string | null
          description?: string | null
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string | null
          location?: string | null
          employment_type?: string | null
          description?: string | null
          published?: boolean
          created_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          goals: string
          company: string
          website: string | null
          offering: string | null
          region: string | null
          spend: string | null
          timeline: string | null
          outcome: string | null
          name: string
          role: string | null
          email: string
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          goals: string
          company: string
          website?: string | null
          offering?: string | null
          region?: string | null
          spend?: string | null
          timeline?: string | null
          outcome?: string | null
          name: string
          role?: string | null
          email: string
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          goals?: string
          company?: string
          website?: string | null
          offering?: string | null
          region?: string | null
          spend?: string | null
          timeline?: string | null
          outcome?: string | null
          name?: string
          role?: string | null
          email?: string
          phone?: string | null
          created_at?: string
        }
        Relationships: []
      }
      career_applications: {
        Row: {
          id: string
          full_name: string
          phone_country_code: string
          phone_number: string
          employment_type: string
          experience: string
          job_looking_for: string
          resume_path: string
          unique_value: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone_country_code: string
          phone_number: string
          employment_type: string
          experience: string
          job_looking_for: string
          resume_path: string
          unique_value?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone_country_code?: string
          phone_number?: string
          employment_type?: string
          experience?: string
          job_looking_for?: string
          resume_path?: string
          unique_value?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
