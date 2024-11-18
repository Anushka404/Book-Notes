-- Create the books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    rating INTEGER,
    notes TEXT,
    date_read DATE
);
