import { Card, CardContent } from '../../ui/card';

export function ValueSkeleton() {
  return (
    <Card className="h-full animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10" />
          <div className="flex-1">
            <h4 className="font-semibold mb-2 text-lg bg-primary/10 rounded">&nbsp;</h4>
            <p className="text-sm text-muted-foreground bg-primary/10 rounded">&nbsp;</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}