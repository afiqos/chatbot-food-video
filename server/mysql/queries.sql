create table emotions (
	emotion_id bigint auto_increment primary key,
	emotion_name text not null
);

create table emotions_yt (
	category_id bigint not null,
	emotion_id bigint not null,
	foreign key (emotion_id) references emotions (emotion_id) on delete cascade
);

create table food (
	food_id bigint auto_increment primary key,
	food_name text not null
);

create table food_yt_api (
	food_id bigint not null, 
	duration_sec bigint not null,
	foreign key (food_id) references food (food_id) on delete cascade
);

insert into emotions (emotion_name) values ("sad"), ("sorrow"), ("grief"), ("happy"), ("glad"), ("ecstatic"), ("angry"), ("afraid"), ("frightened"), ("scared"), ("disgusted"), ("surprised"), ("bored"), ("helpless");

insert into emotions_yt (emotion_id, category_id) values (1, 20), (1, 23), (1, 30), (2, 31), (2, 36), (2, 10), (3, 39), (3, 34), (3, 37), (4, 28), (4, 25), (4, 24), (5, 1), (5, 2), (5, 22);
insert into emotions_yt (emotion_id, category_id) values (6, 41), (6, 43), (6, 28), (7, 39), (7, 2), (7, 15), (8, 38), (8, 18), (8, 19), (9, 20), (9, 22), (9, 24), (10, 17), (10, 21), (10, 28);
insert into emotions_yt (emotion_id, category_id) values (11, 31), (11, 32), (11, 33), (12, 37), (12, 2), (12, 24), (13, 35), (13, 42), (13, 43), (14, 44), (14, 34), (14, 26);

insert into food (food_name) values ("apple"), ("ice_cream"), ("salad"), ("sandwich"), ("bread"), ("steak"), ("tuna"), ("fish"), ("rice"), ("pizza");
insert into food (food_name) values ("spaghetti"), ("hamburger"), ("eggs"), ("cheese"), ("nasi_lemak"), ("chicken_rice"), ("mcdonald"), ("kfc"), ("burger_king"), ("popeyes");
insert into food (food_name) values ("stew"), ("juice"), ("milk"), ("pie"), ("cookie"), ("cupcake"), ("lollipop"), ("pasta"), ("cake"), ("chocolate");
insert into food (food_name) values ("bubble_tea"), ("cereal"), ("seafood"), ("corn"), ("desserts"), ("dumpling"), ("soup"), ("porridge"), ("snack"), ("fruits");

insert into food_yt_api (food_id, duration_sec) values (1, 200), (2, 400), (3, 800), (4, 500), (5, 450), (6, 1500), (7, 800), (8, 900), (9, 1500), (10, 1200);
insert into food_yt_api values (11, 1000), (12, 900), (13, 400), (14, 200), (15, 1200), (16, 1200), (17, 1300), (18, 1300), (19, 1300), (20, 1300);
insert into food_yt_api values (21, 700), (22, 600), (23, 300), (24, 800), (25, 200), (26, 500), (27, 150), (28, 1100), (29, 800), (30, 500);
insert into food_yt_api values (31, 450), (32, 600), (33, 800), (34, 400), (35, 500), (36, 500), (37, 400), (38, 700), (39, 500), (40, 500);
