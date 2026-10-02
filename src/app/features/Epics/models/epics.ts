export interface EpicModel{
  title: string,
  description: string,
  assignee_id: string,
  deadline: string
}

export interface EpicRes{
  title: string,
  description: string,
  assignee_id: string  | null 
  project_id: string,
  deadline: string | null
}
