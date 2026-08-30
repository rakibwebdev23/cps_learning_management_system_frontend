"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogBySlug = exports.getBlogById = exports.getPublishedBlogs = exports.blogs = void 0;
exports.blogs = [
    {
        id: "b1", title: "10 Best Practices for Modern Next.js Development", slug: "10-best-practices-nextjs-development",
        excerpt: "Learn the essential patterns and best practices every Next.js developer should know in 2025, from Server Components to optimistic updates.",
        content: `# 10 Best Practices for Modern Next.js Development\n\nNext.js has evolved significantly with the App Router. Here are the practices that separate good apps from great ones.\n\n## 1. Default to Server Components\nKeep components on the server unless you need interactivity. This reduces JavaScript bundle size significantly.\n\n## 2. Use Streaming and Suspense\nWrap slow data-fetching components in \`<Suspense>\` to stream content progressively.\n\n## 3. Colocate Data Fetching\nFetch data as close to where it's used as possible — in the Server Component that renders it.\n\n## 4. Leverage Route Groups\nUse \`(groupName)\` folders to organize routes and share layouts without affecting URLs.\n\n## 5. Implement Proper Error Boundaries\nEvery route segment should have an \`error.tsx\` file for graceful error handling.`,
        featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
        category: "Web Development", tags: ["Next.js", "React", "Best Practices"],
        authorId: "u3", authorName: "Dr. James Thornton", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        status: "published", viewCount: 4820, createdAt: "2025-07-01", updatedAt: "2025-07-15", publishedAt: "2025-07-02",
    },
    {
        id: "b2", title: "Introduction to Machine Learning: Where to Start in 2025", slug: "introduction-to-machine-learning-2025",
        excerpt: "Feeling overwhelmed by ML? This guide breaks down the learning path from Python basics to deploying your first model.",
        content: `# Introduction to Machine Learning: Where to Start\n\nMachine learning can seem intimidating, but with the right path, anyone can learn it.\n\n## Start with Python\nPython is the language of ML. Learn it well before diving into frameworks.\n\n## Learn Mathematics Fundamentals\nLinear algebra, statistics, and calculus are the foundation. You don't need a PhD — just the basics.\n\n## Pick a Learning Framework\nStart with Scikit-learn for classical ML. Move to TensorFlow or PyTorch for deep learning.\n\n## Work on Real Projects\nKaggle competitions are excellent for building practical experience with real datasets.`,
        featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        category: "Data Science", tags: ["Machine Learning", "Python", "AI", "Beginner"],
        authorId: "u4", authorName: "Priya Sharma", authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b60e1f18?w=100&q=80",
        status: "published", viewCount: 7340, createdAt: "2025-07-05", updatedAt: "2025-07-10", publishedAt: "2025-07-06",
    },
    {
        id: "b3", title: "Building Your First Cross-Platform App with React Native", slug: "building-first-cross-platform-app-react-native",
        excerpt: "Step-by-step guide to creating your first iOS and Android app using React Native and Expo in under an hour.",
        content: `# Building Your First Cross-Platform App\n\nReact Native allows one codebase for both iOS and Android. Let's build a simple app today.\n\n## Setup Expo\nInstall Expo CLI and create a new project with \`npx create-expo-app@latest\`.\n\n## Understand the Component Model\nReact Native components map to native UI elements. View, Text, and Image are your building blocks.\n\n## Add Navigation\nInstall Expo Router for file-based navigation that mirrors the Next.js experience.\n\n## Style Your App\nUse StyleSheet.create() for performance-optimized styles with Flexbox layout.`,
        featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        category: "Mobile Development", tags: ["React Native", "Expo", "Mobile", "iOS", "Android"],
        authorId: "u5", authorName: "Marcus Williams", authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        status: "published", viewCount: 3210, createdAt: "2025-07-10", updatedAt: "2025-07-12", publishedAt: "2025-07-11",
    },
    {
        id: "b4", title: "AWS vs Azure vs GCP: Choosing Your Cloud Platform in 2025", slug: "aws-azure-gcp-choosing-cloud-platform-2025",
        excerpt: "A comprehensive comparison of the three major cloud providers to help you make the right choice for your project.",
        content: `# AWS vs Azure vs GCP: The Ultimate Comparison\n\nChoosing a cloud platform is one of the most important architectural decisions you'll make.\n\n## AWS\nAmazon Web Services leads in market share with the broadest service catalog and most documentation.\n\n## Azure\nMicrosoft Azure excels in enterprise environments, especially for organizations already using Microsoft products.\n\n## Google Cloud Platform\nGCP leads in data and AI services, offering superior Kubernetes and BigQuery capabilities.\n\n## Our Recommendation\nFor most startups, AWS is the safest choice due to community size and available talent.`,
        featuredImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
        category: "Cloud Computing", tags: ["AWS", "Azure", "GCP", "Cloud"],
        authorId: "u2", authorName: "Sarah Mitchell", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        status: "published", viewCount: 5680, createdAt: "2025-07-15", updatedAt: "2025-07-20", publishedAt: "2025-07-16",
    },
    {
        id: "b5", title: "The Complete Guide to UI/UX Design Principles", slug: "complete-guide-ui-ux-design-principles",
        excerpt: "Master the core principles of user interface and experience design that make products people love to use.",
        content: `# The Complete Guide to UI/UX Design Principles\n\nGreat design is invisible — users just flow through your product effortlessly.\n\n## Visual Hierarchy\nGuide users' attention with size, color, and spacing. The most important element should be most prominent.\n\n## Consistency\nUse consistent patterns and components. Users learn your UI once and apply that knowledge everywhere.\n\n## Whitespace\nNever underestimate the power of empty space. Breathing room improves readability and focus.\n\n## Feedback\nEvery user action should produce a response — button press animations, form validation, loading states.`,
        featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        category: "Design", tags: ["UI Design", "UX", "Figma", "Design Principles"],
        authorId: "u2", authorName: "Sarah Mitchell", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        status: "draft", viewCount: 0, createdAt: "2025-08-01", updatedAt: "2025-08-05",
    },
    {
        id: "b6", title: "Cybersecurity Basics Every Developer Should Know", slug: "cybersecurity-basics-every-developer",
        excerpt: "Protect your applications from common vulnerabilities with these essential security practices every developer must implement.",
        content: `# Cybersecurity Basics Every Developer Should Know\n\nSecurity is not an afterthought — it must be baked into development from day one.\n\n## HTTPS Everywhere\nNever transmit sensitive data over plain HTTP. Use TLS everywhere, even in development.\n\n## Input Validation\nNever trust user input. Validate and sanitize everything on both client and server.\n\n## Authentication Best Practices\nUse bcrypt for password hashing. Implement rate limiting on login endpoints. Use MFA.\n\n## Keep Dependencies Updated\nRegularly audit your dependencies with \`npm audit\`. Outdated packages are the #1 attack vector.`,
        featuredImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        category: "Cybersecurity", tags: ["Security", "OWASP", "Best Practices"],
        authorId: "u3", authorName: "Dr. James Thornton", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        status: "published", viewCount: 2940, createdAt: "2025-08-10", updatedAt: "2025-08-12", publishedAt: "2025-08-11",
    },
    {
        id: "b7", title: "How to Land Your First Developer Job in 2025", slug: "how-to-land-first-developer-job-2025",
        excerpt: "Actionable advice on building your portfolio, preparing for technical interviews, and standing out in a competitive job market.",
        content: `# How to Land Your First Developer Job in 2025\n\nThe job market is competitive, but with the right preparation, you can break in.\n\n## Build a Portfolio\nCreate 3-5 real projects that solve genuine problems. Quality beats quantity every time.\n\n## Contribute to Open Source\nGitHub contributions show real-world collaboration skills and are highly valued by employers.\n\n## Network Actively\nAttend meetups, join Discord communities, and connect with developers on LinkedIn.\n\n## Practice Interview Skills\nSolve LeetCode problems daily. Practice system design and behavioral interviews.`,
        featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        category: "Business", tags: ["Career", "Job Search", "Portfolio"],
        authorId: "u2", authorName: "Sarah Mitchell", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        status: "published", viewCount: 9120, createdAt: "2025-08-15", updatedAt: "2025-08-15", publishedAt: "2025-08-15",
    },
    {
        id: "b8", title: "Understanding TypeScript Generics: A Practical Guide", slug: "understanding-typescript-generics-practical-guide",
        excerpt: "TypeScript generics can seem complex but they unlock incredibly reusable, type-safe code. This guide makes them approachable.",
        content: `# Understanding TypeScript Generics\n\nGenerics are one of TypeScript's most powerful features — and one of the most misunderstood.\n\n## What Are Generics?\nGenerics allow you to create reusable functions and types that work with any data type while preserving type safety.\n\n## Basic Generic Function\n\`\`\`typescript\nfunction identity<T>(arg: T): T { return arg; }\n\`\`\`\n\n## Generic Constraints\nUse \`extends\` to restrict what types a generic can accept.\n\n## Real-World Examples\nAPI response wrappers, form state types, and data structures are all excellent use cases for generics.`,
        featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        category: "Web Development", tags: ["TypeScript", "JavaScript", "Types"],
        authorId: "u3", authorName: "Dr. James Thornton", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        status: "published", viewCount: 3760, createdAt: "2025-08-20", updatedAt: "2025-08-22", publishedAt: "2025-08-21",
    },
];
const getPublishedBlogs = () => exports.blogs.filter((b) => b.status === "published");
exports.getPublishedBlogs = getPublishedBlogs;
const getBlogById = (id) => exports.blogs.find((b) => b.id === id);
exports.getBlogById = getBlogById;
const getBlogBySlug = (slug) => exports.blogs.find((b) => b.slug === slug);
exports.getBlogBySlug = getBlogBySlug;
