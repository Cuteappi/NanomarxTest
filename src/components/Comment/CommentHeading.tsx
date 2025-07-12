import Avatar from "../Avatar";
import { timeSince } from "@/utility/TimeSince";
import { Doc } from "../../../convex/_generated/dataModel";

// Define a more specific type for the comment prop
export type CommentForHeading = Pick<Doc<"comments">, "_id" | "submittedTime"> & {
    author: string;
};

export default function CommentHeading({ comment }: { comment: CommentForHeading; }) {
    return (
        <div className="flex items-center gap-1.5">
            <Avatar author={comment.author} />
            <span className="font-semibold user-display">{comment.author}</span>
            <span className="font-semibold">{timeSince(comment.submittedTime)}</span>
        </div>
    );
}