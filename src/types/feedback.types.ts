export interface CreateFeedbackDTO {
  content: string;
  ownerId: string;
  workId: string;
}

export interface UpdateFeedbackDTO {
  content?: string;
}
