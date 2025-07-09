-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Insert sample projects
INSERT INTO projects (title, description, image, techStack, githubUrl, demoUrl, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.', '/placeholder.svg?height=300&width=400', '["React", "Node.js", "MySQL", "Stripe", "Tailwind CSS"]', 'https://github.com/stevano/ecommerce', 'https://ecommerce-demo.com', true),
('Task Management App', 'Collaborative task management application with real-time updates and team collaboration features.', '/placeholder.svg?height=300&width=400', '["Next.js", "TypeScript", "Prisma", "Socket.io", "PostgreSQL"]', 'https://github.com/stevano/taskapp', 'https://taskapp-demo.com', true),
('Weather Dashboard', 'Beautiful weather dashboard with location-based forecasts and interactive maps.', '/placeholder.svg?height=300&width=400', '["React", "OpenWeather API", "Chart.js", "Tailwind CSS"]', 'https://github.com/stevano/weather', 'https://weather-demo.com', false),
('Blog CMS', 'Content management system for bloggers with markdown support and SEO optimization.', '/placeholder.svg?height=300&width=400', '["Laravel", "Vue.js", "MySQL", "TinyMCE"]', 'https://github.com/stevano/blog-cms', null, false);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image, published) VALUES
('Getting Started with Next.js 14', 'getting-started-nextjs-14', 'Learn how to build modern web applications with the latest Next.js features including App Router and Server Components.', '# Getting Started with Next.js 14\n\nNext.js 14 brings exciting new features that make building web applications even more powerful and efficient...\n\n## Key Features\n\n- App Router\n- Server Components\n- Improved Performance\n\n## Conclusion\n\nNext.js 14 is a game-changer for React developers.', '/placeholder.svg?height=200&width=400', true),
('Building Scalable APIs with Node.js', 'building-scalable-apis-nodejs', 'Best practices for creating robust and scalable REST APIs using Node.js, Express, and modern development patterns.', '# Building Scalable APIs with Node.js\n\nCreating scalable APIs is crucial for modern web applications...\n\n## Architecture Patterns\n\n- MVC Pattern\n- Microservices\n- API Gateway\n\n## Best Practices\n\n1. Use proper error handling\n2. Implement rate limiting\n3. Add comprehensive logging', '/placeholder.svg?height=200&width=400', true),
('Database Design Principles', 'database-design-principles', 'Essential principles for designing efficient and maintainable database schemas for web applications.', '# Database Design Principles\n\nGood database design is the foundation of any successful application...\n\n## Normalization\n\n- First Normal Form (1NF)\n- Second Normal Form (2NF)\n- Third Normal Form (3NF)\n\n## Indexing Strategies\n\nProper indexing can dramatically improve query performance.', '/placeholder.svg?height=200&width=400', true);

-- Insert sample messages (for testing)
INSERT INTO messages (name, email, message) VALUES
('John Doe', 'john@example.com', 'Hi Stevano, I would like to discuss a potential project collaboration. Please get back to me when you have a chance.'),
('Sarah Wilson', 'sarah@company.com', 'We are looking for a full-stack developer for our startup. Your portfolio looks impressive!');
