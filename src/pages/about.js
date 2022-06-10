import { useRouter } from "next/router";

export default function AboutPage() {
    const { query } = useRouter();
    return (
        <div>
            <pre>{JSON.stringify({ query }, null, 4)}</pre>
        </div>
    );
}
