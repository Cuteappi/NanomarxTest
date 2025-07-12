import { PostWithAuthor } from "./PostItem";
import Avatar from "../Avatar";
import { timeSince } from "@/utility/TimeSince";
import Link from "next/link";



export default function PostDetailLinks({ post }: { post: PostWithAuthor; }) {
    return (
        <div className="flex items-center text-sm gap-1" style={{ color: 'var(--text-primary)' }}>
            <Avatar author={post.author} />
            <span>via <span className="hover:underline cursor-pointer">{post.author}</span></span>
            <span>{timeSince(post.submittedTime)}</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">caches</span>
            <span>|</span>
            <Link href={`/postcomments/${post._id}`} className="hover:underline cursor-pointer">{post.commentCount} comments</Link>
        </div>
    );
}