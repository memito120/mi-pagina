import { Card, CardContent } from '../../ui/card';

export function RenderAbout({ value }) {
    return (
        <Card className={`h-full hover:shadow-lg transition-shadow duration-300 group ${value.highlighted ? 'ring-2 ring-primary/50 bg-primary/5' : ''
            }`}>
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg transition-colors ${value.highlighted
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                        }`}>
                        <value.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold mb-2 text-lg">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}