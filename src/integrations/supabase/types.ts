export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          birth_year: number | null
          birthday: string | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string | null
          mobile_number: string | null
          notes: string | null
          phone: string
          reviews_count: number | null
          total_sales: number | null
          updated_at: string
        }
        Insert: {
          birth_year?: number | null
          birthday?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name?: string | null
          mobile_number?: string | null
          notes?: string | null
          phone: string
          reviews_count?: number | null
          total_sales?: number | null
          updated_at?: string
        }
        Update: {
          birth_year?: number | null
          birthday?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string | null
          mobile_number?: string | null
          notes?: string | null
          phone?: string
          reviews_count?: number | null
          total_sales?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string
          id: string
          price: number
          price_type: string | null
          service_name: string
          service_type: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration: string
          id?: string
          price: number
          price_type?: string | null
          service_name: string
          service_type?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string
          id?: string
          price?: number
          price_type?: string | null
          service_name?: string
          service_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          additional_phone: string | null
          calendar_color: string | null
          created_at: string
          email: string
          employment_type: string | null
          end_date: string | null
          end_year: number | null
          first_name: string
          id: string
          job_title: string | null
          last_name: string | null
          location: string | null
          notes: string | null
          permission_level: string | null
          phone_number: string | null
          rating: number | null
          review_count: number | null
          start_date: string | null
          start_year: number | null
          team_member_id: string | null
          updated_at: string
          visible_to_clients: boolean | null
        }
        Insert: {
          additional_phone?: string | null
          calendar_color?: string | null
          created_at?: string
          email: string
          employment_type?: string | null
          end_date?: string | null
          end_year?: number | null
          first_name: string
          id?: string
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          notes?: string | null
          permission_level?: string | null
          phone_number?: string | null
          rating?: number | null
          review_count?: number | null
          start_date?: string | null
          start_year?: number | null
          team_member_id?: string | null
          updated_at?: string
          visible_to_clients?: boolean | null
        }
        Update: {
          additional_phone?: string | null
          calendar_color?: string | null
          created_at?: string
          email?: string
          employment_type?: string | null
          end_date?: string | null
          end_year?: number | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          notes?: string | null
          permission_level?: string | null
          phone_number?: string | null
          rating?: number | null
          review_count?: number | null
          start_date?: string | null
          start_year?: number | null
          team_member_id?: string | null
          updated_at?: string
          visible_to_clients?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
