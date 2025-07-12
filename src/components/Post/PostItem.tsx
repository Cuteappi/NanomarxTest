import { Doc } from "../../../convex/_generated/dataModel";
import { Triangle } from "lucide-react";
import Link from "next/link";
import UpvoteButton from "../Buttons/UpvoteButton";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import PostDetailLinks from "./PostDetailLinks";


// Define a type that includes the author information
export type PostWithAuthor = Doc<"posts"> & { author: string; isUpvotedByUser: boolean; tags: Doc<"tags">[]; };


export default function PostItem({ post }: { post: PostWithAuthor; }) {
	const { isAuthenticated } = useConvexAuth();
	const upvote = useMutation(api.posts.upvote);
	const router = useRouter();

	const handleUpvote = () => {
		if (!isAuthenticated) {
			router.push("/login");
			return;
		}
		upvote({ postId: post._id, type: post.isUpvotedByUser ? "remove" : "add" });
	};

	return (
		<li className="flex py-1 gap-0.5">
			<UpvoteButton upvotes={post.upvotes} handleUpvote={handleUpvote} isActive={post.isUpvotedByUser} />
			<div className="flex flex-col">
				<div className="flex items-center flex-wrap gap-2 " >
					<a href={post.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold" style={{ color: 'var(--link-blue)' }}>
						{post.title}
					</a>
					{post.tags.map(tag => (
						<Link href={`/tags/${tag._id}`} key={tag._id} className="tag-item">
							<div className="tag-item-text">{tag.name}</div>
						</Link>
					))}
					<a href={`//${post.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline italic">
						{post.domain}
					</a>
				</div>
				<PostDetailLinks post={post} />
			</div>
		</li>
	);
}
