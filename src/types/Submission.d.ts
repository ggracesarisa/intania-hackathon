import { submission_status } from "@/config/submissionStatus";

export interface Submission {
  id: string;
  assignment_id: string;
  user_id: string;
  status: submission_status;
  answer: Array<string>;
}
