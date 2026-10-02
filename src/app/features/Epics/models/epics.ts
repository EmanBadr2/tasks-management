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

 export interface projectEpic{
        id: string,
        project_id: string,
        title: string ,
        description:string ,
        created_at: string ,
        deadline:string ,
        epic_id:string,
        created_by:  assignee ,
        assignee:assignee
    }
       export interface   assignee {
            sub: string | null,
            name:string | null,
            email:string | null,
            department: string | null,
        }
