import Link from 'next/link';

export default function Navbar() {
  return (
    
    <nav className="bg-card text-card-foreground p-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          FindTrips
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Tours
          </Link>
          <Link
            href="/admin"
            className="text-muted-foreground hover:text-foreground"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}