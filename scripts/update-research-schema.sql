-- Update blog_posts table to research table
ALTER TABLE blog_posts RENAME TO research;

-- Add new columns for research
ALTER TABLE research 
ADD COLUMN type ENUM('journal', 'thesis', 'conference', 'book', 'other') DEFAULT 'journal' AFTER published,
ADD COLUMN authors TEXT AFTER content,
ADD COLUMN publication_year INT AFTER authors,
ADD COLUMN journal_name VARCHAR(255) AFTER publication_year,
ADD COLUMN doi VARCHAR(255) AFTER journal_name,
ADD COLUMN pdf_url VARCHAR(500) AFTER doi,
ADD COLUMN external_url VARCHAR(500) AFTER pdf_url,
ADD COLUMN keywords TEXT AFTER external_url,
ADD COLUMN abstract TEXT AFTER keywords;

-- Update existing data
UPDATE research SET 
  type = 'journal',
  authors = 'Stevano Wahyu Al\'fandi',
  publication_year = YEAR(createdAt),
  abstract = excerpt;

-- Insert sample research data
INSERT INTO research (title, slug, excerpt, content, image, published, type, authors, publication_year, journal_name, doi, pdf_url, external_url, keywords, abstract) VALUES
('Machine Learning Approach for Web Performance Optimization', 'ml-web-performance', 'A comprehensive study on using machine learning algorithms to optimize web application performance and user experience.', '# Machine Learning Approach for Web Performance Optimization\n\n## Abstract\n\nThis research presents a novel approach to web performance optimization using machine learning algorithms...\n\n## Introduction\n\nWeb performance is crucial for user experience and business success...\n\n## Methodology\n\nWe employed various ML algorithms including Random Forest, SVM, and Neural Networks...\n\n## Results\n\nOur approach showed 40% improvement in page load times...\n\n## Conclusion\n\nMachine learning can significantly enhance web performance optimization strategies.', '/placeholder.svg?height=300&width=500', true, 'journal', 'Stevano Wahyu Al\'fandi, Dr. John Smith', 2024, 'International Journal of Web Technologies', '10.1000/182', '/research/ml-web-performance.pdf', 'https://doi.org/10.1000/182', 'machine learning, web performance, optimization, user experience', 'A comprehensive study on using machine learning algorithms to optimize web application performance and user experience through predictive modeling and automated optimization techniques.'),

('Full-Stack Development Best Practices: A Comparative Study', 'fullstack-best-practices', 'Comparative analysis of modern full-stack development frameworks and their impact on development efficiency and application performance.', '# Full-Stack Development Best Practices: A Comparative Study\n\n## Abstract\n\nThis study compares various full-stack development approaches...\n\n## Literature Review\n\nPrevious studies have shown...\n\n## Research Methodology\n\nWe conducted experiments with React, Vue, Angular, and Next.js...\n\n## Findings\n\nNext.js showed superior performance in SSR scenarios...\n\n## Recommendations\n\nBased on our findings, we recommend...', '/placeholder.svg?height=300&width=500', true, 'conference', 'Stevano Wahyu Al\'fandi, Prof. Jane Doe, Dr. Mike Johnson', 2024, 'International Conference on Software Engineering', '10.1109/ICSE.2024.123', '/research/fullstack-study.pdf', 'https://ieeexplore.ieee.org/document/123456', 'full-stack development, web frameworks, performance analysis, React, Next.js', 'Comparative analysis of modern full-stack development frameworks including React, Vue, Angular, and Next.js, focusing on development efficiency, performance metrics, and scalability factors.'),

('Database Optimization Strategies for Modern Web Applications', 'database-optimization-strategies', 'Research on advanced database optimization techniques for improving query performance in high-traffic web applications.', '# Database Optimization Strategies for Modern Web Applications\n\n## Abstract\n\nThis research investigates various database optimization strategies...\n\n## Problem Statement\n\nModern web applications face significant database performance challenges...\n\n## Proposed Solutions\n\n### 1. Query Optimization\n- Index optimization\n- Query rewriting\n- Execution plan analysis\n\n### 2. Caching Strategies\n- Redis implementation\n- Application-level caching\n- Database query caching\n\n## Experimental Results\n\nOur optimization strategies resulted in:\n- 60% reduction in query execution time\n- 45% improvement in concurrent user handling\n- 30% reduction in server resource usage\n\n## Conclusion\n\nImplementing comprehensive database optimization strategies significantly improves web application performance.', '/placeholder.svg?height=300&width=500', true, 'thesis', 'Stevano Wahyu Al\'fandi', 2023, 'Universitas Indonesia - Computer Science Department', null, '/research/database-optimization-thesis.pdf', null, 'database optimization, query performance, web applications, indexing, caching', 'Comprehensive research on database optimization techniques including query optimization, indexing strategies, and caching mechanisms for improving performance in high-traffic web applications.');
