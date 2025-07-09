import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Clear existing data first
  await prisma.message.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.project.deleteMany()

  // Seed projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=400",
      techStack: JSON.stringify(["React", "Node.js", "MySQL", "Stripe", "Tailwind CSS"]),
      githubUrl: "https://github.com/stevano/ecommerce",
      demoUrl: "https://ecommerce-demo.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features.",
      image: "/placeholder.svg?height=300&width=400",
      techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "Socket.io", "PostgreSQL"]),
      githubUrl: "https://github.com/stevano/taskapp",
      demoUrl: "https://taskapp-demo.com",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with location-based forecasts and interactive maps.",
      image: "/placeholder.svg?height=300&width=400",
      techStack: JSON.stringify(["React", "OpenWeather API", "Chart.js", "Tailwind CSS"]),
      githubUrl: "https://github.com/stevano/weather",
      demoUrl: "https://weather-demo.com",
      featured: false,
    },
    {
      title: "Blog CMS",
      description: "Content management system for bloggers with markdown support and SEO optimization.",
      image: "/placeholder.svg?height=300&width=400",
      techStack: JSON.stringify(["Laravel", "Vue.js", "MySQL", "TinyMCE"]),
      githubUrl: "https://github.com/stevano/blog-cms",
      demoUrl: null,
      featured: false,
    },
  ]

  // Create projects
  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
  }

  console.log("✅ Projects seeded successfully!")

  // Seed blog posts
  const blogPosts = [
    {
      title: "Getting Started with Next.js 14",
      slug: "getting-started-nextjs-14",
      excerpt:
        "Learn how to build modern web applications with the latest Next.js features including App Router and Server Components.",
      content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features that make building web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key features and how to get started.

## Key Features

### App Router
The new App Router provides a more intuitive way to structure your application with improved performance and developer experience.

### Server Components
Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving performance.

### Improved Performance
Next.js 14 includes various performance improvements that make your applications faster and more efficient.

## Getting Started

To create a new Next.js 14 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 14 is a game-changer for React developers, offering improved performance, better developer experience, and powerful new features that make building web applications more enjoyable and efficient.`,
      image: "/placeholder.svg?height=200&width=400",
      published: true,
    },
    {
      title: "Building Scalable APIs with Node.js",
      slug: "building-scalable-apis-nodejs",
      excerpt:
        "Best practices for creating robust and scalable REST APIs using Node.js, Express, and modern development patterns.",
      content: `# Building Scalable APIs with Node.js

Creating scalable APIs is crucial for modern web applications. In this guide, we'll explore best practices and patterns for building robust Node.js APIs.

## Architecture Patterns

### MVC Pattern
The Model-View-Controller pattern helps organize your code and separate concerns.

### Microservices
Breaking your application into smaller, independent services can improve scalability and maintainability.

### API Gateway
An API gateway can help manage multiple services and provide a single entry point for clients.

## Best Practices

1. **Use proper error handling**: Always handle errors gracefully and provide meaningful error messages.
2. **Implement rate limiting**: Protect your API from abuse by implementing rate limiting.
3. **Add comprehensive logging**: Log important events and errors for debugging and monitoring.
4. **Use validation**: Validate all input data to prevent security vulnerabilities.
5. **Implement authentication**: Secure your API with proper authentication mechanisms.

## Performance Optimization

- Use caching strategies
- Implement database indexing
- Optimize database queries
- Use connection pooling

## Conclusion

Building scalable APIs requires careful planning and implementation of best practices. By following these guidelines, you can create robust and maintainable APIs that can handle growth and scale with your application.`,
      image: "/placeholder.svg?height=200&width=400",
      published: true,
    },
    {
      title: "Database Design Principles",
      slug: "database-design-principles",
      excerpt: "Essential principles for designing efficient and maintainable database schemas for web applications.",
      content: `# Database Design Principles

Good database design is the foundation of any successful application. In this article, we'll explore essential principles for creating efficient and maintainable database schemas.

## Normalization

### First Normal Form (1NF)
Eliminate repeating groups and ensure each column contains atomic values.

### Second Normal Form (2NF)
Remove partial dependencies and ensure all non-key attributes depend on the entire primary key.

### Third Normal Form (3NF)
Eliminate transitive dependencies and ensure non-key attributes depend only on the primary key.

## Indexing Strategies

Proper indexing can dramatically improve query performance:

- Create indexes on frequently queried columns
- Use composite indexes for multi-column queries
- Avoid over-indexing as it can slow down write operations
- Monitor and analyze query performance regularly

## Relationships

### One-to-One
Use when you need to split a table for performance or security reasons.

### One-to-Many
The most common relationship type, implemented using foreign keys.

### Many-to-Many
Requires a junction table to establish the relationship.

## Best Practices

1. **Use meaningful names**: Choose clear, descriptive names for tables and columns.
2. **Define constraints**: Use primary keys, foreign keys, and check constraints to maintain data integrity.
3. **Plan for scalability**: Consider how your schema will handle growth.
4. **Document your design**: Maintain clear documentation of your database schema.

## Conclusion

Following these database design principles will help you create robust, efficient, and maintainable database schemas that can support your application's growth and evolution.`,
      image: "/placeholder.svg?height=200&width=400",
      published: true,
    },
  ]

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    })
  }

  console.log("✅ Blog posts seeded successfully!")

  // Seed sample messages
  const sampleMessages = [
    {
      name: "John Doe",
      email: "john@example.com",
      message:
        "Hi Stevano, I would like to discuss a potential project collaboration. Please get back to me when you have a chance.",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@company.com",
      message: "We are looking for a full-stack developer for our startup. Your portfolio looks impressive!",
    },
  ]

  for (const message of sampleMessages) {
    await prisma.message.create({
      data: message,
    })
  }

  console.log("✅ Sample messages seeded successfully!")
  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
