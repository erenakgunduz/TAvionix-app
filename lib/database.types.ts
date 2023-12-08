export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_first_name: string;
          applicant_gpa: number;
          applicant_id: string;
          applicant_last_name: string;
          applicant_major: string;
          created_at: string;
          id: number;
          past_experience: Json | null;
          position_id: number;
          resume_url: string;
          status: string | null;
        };
        Insert: {
          applicant_first_name: string;
          applicant_gpa: number;
          applicant_id: string;
          applicant_last_name: string;
          applicant_major: string;
          created_at?: string;
          id?: number;
          past_experience?: Json | null;
          position_id: number;
          resume_url: string;
          status?: string | null;
        };
        Update: {
          applicant_first_name?: string;
          applicant_gpa?: number;
          applicant_id?: string;
          applicant_last_name?: string;
          applicant_major?: string;
          created_at?: string;
          id?: number;
          past_experience?: Json | null;
          position_id?: number;
          resume_url?: string;
          status?: string | null;
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
            foreignKeyName: 'applications_applicant_id_fkey';
            columns: ['applicant_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'applications_position_id_fkey';
            columns: ['position_id'];
            isOneToOne: false;
            referencedRelation: 'open_ta_positions';
            referencedColumns: ['tp_id'];
          },
          {
            foreignKeyName: 'applications_position_id_fkey';
            columns: ['position_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['tp_id'];
          },
          {
            foreignKeyName: 'applications_position_id_fkey';
            columns: ['position_id'];
            isOneToOne: false;
            referencedRelation: 'ta_positions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'applications_position_id_fkey';
            columns: ['position_id'];
            isOneToOne: false;
            referencedRelation: 'user_applications';
            referencedColumns: ['tp_id'];
          },
        ];
      };
      courses: {
        Row: {
          code: string;
          created_at: string;
          department: string | null;
          id: number;
          title: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          department?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          department?: string | null;
          id?: number;
          title?: string;
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
      support: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          message: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          message: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          message?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      ta_positions: {
        Row: {
          course_id: number;
          created_at: string;
          id: number;
          instructor_id: string | null;
          is_vacant: boolean;
          semester: string;
          ta_evaluation: string | null;
          ta_id: string | null;
        };
        Insert: {
          course_id: number;
          created_at?: string;
          id?: number;
          instructor_id?: string | null;
          is_vacant?: boolean;
          semester: string;
          ta_evaluation?: string | null;
          ta_id?: string | null;
        };
        Update: {
          course_id?: number;
          created_at?: string;
          id?: number;
          instructor_id?: string | null;
          is_vacant?: boolean;
          semester?: string;
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
            foreignKeyName: 'ta_positions_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'open_ta_positions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_course_id_fkey';
            columns: ['course_id'];
            isOneToOne: false;
            referencedRelation: 'user_applications';
            referencedColumns: ['c_id'];
          },
          {
            foreignKeyName: 'ta_positions_instructor_id_fkey';
            columns: ['instructor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_instructor_id_fkey';
            columns: ['instructor_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_ta_id_fkey';
            columns: ['ta_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ta_positions_ta_id_fkey';
            columns: ['ta_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      open_ta_positions: {
        Row: {
          description: string | null;
          id: number | null;
          tp_id: number | null;
        };
        Relationships: [];
      };
      ta_evaluations: {
        Row: {
          first_name: string | null;
          id: string | null;
          instructor_id: string | null;
          last_name: string | null;
          semester: string | null;
          title: string | null;
          tp_id: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
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
            foreignKeyName: 'ta_positions_instructor_id_fkey';
            columns: ['instructor_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['id'];
          },
        ];
      };
      user_applications: {
        Row: {
          applicant_first_name: string | null;
          applicant_gpa: number | null;
          applicant_id: string | null;
          applicant_last_name: string | null;
          applicant_major: string | null;
          c_id: number | null;
          created_at: string | null;
          description: string | null;
          id: number | null;
          past_experience: Json | null;
          resume_url: string | null;
          status: string | null;
          tp_id: number | null;
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
            foreignKeyName: 'applications_applicant_id_fkey';
            columns: ['applicant_id'];
            isOneToOne: false;
            referencedRelation: 'ta_evaluations';
            referencedColumns: ['id'];
          },
        ];
      };
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
