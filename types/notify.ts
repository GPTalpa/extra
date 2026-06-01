export type Notify = {
  title: string;
  message: string;
  type: "new_course" | string;
  reference_id: string; 
  id: string; 
  user_id: string;
  is_read: boolean;
  created_at: string;
};
