create table if not exists STATION
(
   id bigint auto_increment not null,
   name varchar(255) not null UNIQUE,
   created_at datetime,
   primary key(id)
);

create table if not exists LINE
(
    id            bigint auto_increment not null,
    name          varchar(255)          not null UNIQUE,
    color         varchar(20)           not null,
    start_time    time                  not null,
    end_time      time                  not null,
    interval_time int                   not null,
    created_at    datetime,
    updated_at    datetime,
    primary key (id)
);

create table if not exists LINE_STATION
(
    line        bigint not null,
    sequence    int    not null,
    station     bigint not null,
    pre_station bigint,
    distance    int,
    duration    int,
    created_at  datetime,
    updated_at  datetime
);