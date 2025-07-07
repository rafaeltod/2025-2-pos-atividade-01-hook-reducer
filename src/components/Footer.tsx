export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm">
            GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
          </p>
          <p className="text-sm mt-2">
            <a 
              href="https://fsf.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Copyright (C) 2007 Free Software Foundation, Inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
