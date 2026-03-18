import { Card, CardContent, CardHeader } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

export function ServiceSkeleton() {
	return (
		<Card className="h-full">
			<Skeleton className="aspect-video w-full rounded-t-lg" />
			<CardHeader className="space-y-2">
				<Skeleton className="h-7 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="h-4 w-full" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-7 w-20" />
					<Skeleton className="h-7 w-16" />
					<Skeleton className="h-7 w-24" />
				</div>
				<Skeleton className="h-10 w-full" />
			</CardContent>
		</Card>
	);
}
