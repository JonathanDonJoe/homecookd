DROP TABLE users;

create table users (
    id serial primary key,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    email varchar(100) not null,
    picture VARCHAR(200) DEFAULT '/images/users/default.png',
    token VARCHAR(2047) DEFAULT null
);

DROP TABLE events;

create table events (
    id serial primary key,
    time DATETIME not null,
    address VARCHAR(150) not null,
    lat FLOAT not null,
    lng FLOAT not null,
    title VARCHAR(100) not null,
    description varchar(300) not null,
    host_id INTEGER REFERENCES users(id),
    portions INTEGER not null,
    price DECIMAL(13,2) not null,
    tags VARCHAR (100) not null,
    picture VARCHAR(200) DEFAULT '/images/events/default.png',
    dine_in BOOLEAN DEFAULT FALSE,
    pick_up BOOLEAN DEFAULT TRUE
);

DROP TABLE attendances;

create table attendances (
    id serial primary key,
    user_id integer REFERENCES users(id),
    event_id integer references events(id),
    paid INTEGER DEFAULT 0,
    dine_in BOOLEAN,
    pick_up BOOLEAN
);

DROP TABLE host_reviews;

create table host_reviews (
    id serial primary key,
    reviewer_id integer REFERENCES users(id),
    reviewed_id integer REFERENCES users(id),
    event_id integer references events(id),
    stars integer CHECK (stars >= 1 AND stars <=5),
    title varchar(50) not null,
    review varchar(1000) not NULL
);

DROP TABLE messages;

create table messages (
    id serial primary key,
    sender_id integer REFERENCES users(id),
    event_id integer references events(id),
    content varchar(1000) not NULL,
    sent_time TIMESTAMP default CURRENT_TIMESTAMP
);
