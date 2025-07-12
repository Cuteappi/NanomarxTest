import { Doc, Id } from "@/../convex/_generated/dataModel";

export type CommentWithChildren = Doc<"comments"> & { author: string; children: CommentWithChildren[]; isUpvotedByUser: boolean; };


export const buildCommentTree = (comments: (Doc<"comments"> & { author: string; isUpvotedByUser: boolean; })[]): CommentWithChildren[] => {
    const commentMap = new Map<Id<"comments">, CommentWithChildren>();
    const rootComments: CommentWithChildren[] = [];

    // First pass: create a map of all comments by their ID and add a children array
    for (const comment of comments) {
        commentMap.set(comment._id, { ...comment, children: [] });
    }

    // Second pass: build the tree structure
    for (const comment of commentMap.values()) {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.children.push(comment);
            }
        } else {
            rootComments.push(comment);
        }
    }

    return rootComments;
};