-- PostgreSQL schema for Vercel deployment
-- Run this in your Vercel Postgres or Neon database

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "ContactMessage" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN NOT NULL DEFAULT false
);
