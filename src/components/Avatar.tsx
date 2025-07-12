export default function Avatar({ author }: { author: string; }) {
    return (
        <img
            src={`https://unavatar.io/${author}?fallback=https://source.boringavatars.com/beam/20/${author}`}
            alt={author}
            className="w-4 h-4 rounded-full"
        />
    );
}