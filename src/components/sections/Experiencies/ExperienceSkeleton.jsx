import {Card, CardContent, CardHeader} from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';


export function ExperienceSkeleton() {
    return (
        <div className="relative pl-8 pb-12">
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-muted" />
            <div className="absolute left-[7px] top-6 w-0.5 h-full bg-muted" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-5 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}