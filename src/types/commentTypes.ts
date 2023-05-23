export interface IComment {
	name: string;
	date: number;
	picture: string;
	text: string;
	uniqueCommentId: string;
}

export type CommentType = IComment[];
