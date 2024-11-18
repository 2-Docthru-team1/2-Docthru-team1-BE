export interface CreateFeedbackDTO {
  content: string;
  image: string;
  ownerId: string;
  workId: string;
}

export interface UpdateFeedbackDTO {
  content?: string;
  image?: string;
}
