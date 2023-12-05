// Remember to update with any changes to data model/database schema
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_id: string | null;
          created_at: string;
          id: number;
          position_id: number | null;
          status: number | null;
        };
        Insert: {
          applicant_id?: string | null;
          created_at?: string;
          id?: number;
          position_id?: number | null;
          status?: number | null;
        };
        Update: {
          applicant_id?: string | null;
          created_at?: string;
          id?: number;
          position_id?: number | null;
          status?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'applications_applicant_id_fkey';
            columns: ['applicant_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'applications_position_id_fkey';
            columns: ['position_id'];
            isOneToOne: false;
            referencedRelation: 'ta_positions';
            referencedColumns: ['id'];
          },
        ];
      };
      courses: {
        Row: {
          code: string | null;
          created_at: string;
          department: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          department?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          department?: string | null;
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          department: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          profile_type: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          department?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          profile_type?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          department?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          profile_type?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      ta_positions: {
        Row: {
          course_id: number | null;
          created_at: string;
          id: number;
          instructor_id: string | null;
          is_vacant: boolean | null;
          semester: string | null;
          ta_evaluation: string | null;
          ta_id: string | null;
        };
        Insert: {
          course_id?: number | null;
          created_at?: string;
          id?: number;
          instructor_id?: string | null;
          is_vacant?: boolean | null;
          semester?: string | null;
          ta_evaluation?: string | null;
          ta_id?: string | null;
        };
        Update: {
          course_id?: number | null;
          created_at?: string;
          id?: number;
          instructor_id?: string | null;
          is_vacant?: boolean | null;
          semester?: string | null;
          ta_evaluation?: string | null;
          ta_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ta_positions_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'courses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_instructor_id_fkey';
            columns: ['instructor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_ta_id_fkey';
            columns: ['ta_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      usertype: 'applicant' | 'committee' | 'instructor' | 'staff';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
