create table emotions (
	emotion_id bigint auto_increment primary key,
	emotion_name text not null
);

create table food (
	food_id bigint auto_increment primary key,
	food_name text not null
);

create table emotions_yt (
	category_id bigint primary key,
	emotion_id bigint not null,
	foreign key (emotion_id) references emotions (emotion_id) on delete cascade
	
);

create table food_yt_api (
	food_id bigint not null, 
	duration_sec bigint not null,
	foreign key (food_id) references food (food_id) on delete cascade
);

insert into emotions (emotion_name) values ("sad"), ("happy");
insert into food (food_name) values ("apple"), ("ice_cream");

insert into emotions_yt values (5, 1), (7, 2);
insert into food_yt_api values (1, 300), (2, 300);
