// app/courses/[programId]/[moduleId]/[topicId]/page.tsx
import NotFound from '@/components/not-found';
import TopicClientWrapper from '@/components/topic-client-wrapper';

export default async function TopicPage({ params }: { params: Promise<{ programId: string, moduleId: string, topicId: string }> }) {

    const { programId, moduleId, topicId } = await params;
    let message = '';
    let topicData: any;
    let moduleData: any;
    try {
        const [topicRes, moduleRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${topicId}`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/modules/${moduleId}`, { cache: 'no-store' }),
        ]);

        [topicData, moduleData] = await Promise.all([topicRes.json(), moduleRes.json()]);
        if (!topicRes.ok)
            throw new Error(topicData.error);
        if (!moduleRes.ok)
            throw new Error(moduleData.error);

    } catch (error: unknown) {


        message = "Network Error Occurred"

        if (error instanceof Error) {
            message = error.message
        }

    }

    if (!topicData || !moduleData)
        return <NotFound resource="topic" message={message} />


    return (
        <TopicClientWrapper
            programId={programId}
            moduleId={moduleId}
            topicId={topicId}
            topicData={topicData?.data}
            moduleData={moduleData?.data}
        />
    );
}
