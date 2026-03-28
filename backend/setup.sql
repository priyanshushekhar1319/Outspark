-- Run this to create the database manually if needed
-- (SQLAlchemy auto-creates tables on startup via models.Base.metadata.create_all)

CREATE DATABASE outspark;

-- Verify tables after running the backend once:
-- \c outspark
-- \dt
-- SELECT * FROM users;
-- SELECT * FROM reviews;
-- SELECT * FROM orders;

-- Manually create admin if seed fails:
-- INSERT INTO users (name, email, hashed_password, role, plan, created_at)
-- VALUES ('Priyanshu Admin', 'admin@outspark.com', '<bcrypt_hash>', 'admin', 'enterprise', NOW());
