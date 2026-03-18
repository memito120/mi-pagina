import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Guillermo Delgado. Diseñado y desarrollado con mucho amor <Heart className="inline-block h-4 w-4 text-red-500 align-text-bottom" />.
            
          </div>
        </div>
      </div>
    </footer>
  );
}
