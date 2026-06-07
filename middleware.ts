import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we are at the root path
  if (request.nextUrl.pathname === '/') {
    
    // Check if the client is asking for markdown explicitly
    const acceptHeader = request.headers.get('accept') || '';
    const contentTypeHeader = request.headers.get('content-type') || '';
    
    if (acceptHeader.includes('text/markdown') || contentTypeHeader.includes('text/markdown') || contentTypeHeader.includes('markdown')) {
      
      const markdownContent = `# Apex Horizon

Modern Software Development Company

## Services
- Custom Software Development
- Web Applications
- Mobile Applications
- ERP Systems
- CRM Systems
- Inventory Management
- Billing Software
- SaaS Product Development

## Products
### Apex Management
Offline-first inventory and billing platform with WhatsApp integration.

## Technologies
- Next.js
- React
- Node.js
- Spring Boot
- PostgreSQL
- MongoDB

## Contact
jayjoshi1912007@gmail.com
`;

      return new NextResponse(markdownContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      });
    }
  }

  // Otherwise, proceed to standard Next.js routing
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
