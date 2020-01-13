CREATE TABLE "endPoint" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "ep_name" varchar(18)
);

CREATE TABLE "route" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "begin_point" int NOT NULL,
  "end_point" int NOT NULL,
  "start_time" abstime NOT NULL,
  "arrive_time" abstime NOT NULL,
  "route_cost" int NOT NULL,
  "route_transport" int NOT NULL
);

CREATE TABLE "transport" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "tp_name" varchar(28),
  "tp_type" int NOT NULL
);

CREATE TABLE "routeType" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "rot_type" varchar(14)
);

CREATE TABLE "ticket" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "usr_ID" int NOT NULL,
  "route_ID" int NOT NULL,
  "passengers" int NOT NULL
);

CREATE TABLE "user" (
  "ID" SERIAL PRIMARY KEY NOT NULL,
  "usr_Name" varchar(12) NOT NULL,
  "Login" varchar(18) NOT NULL,
  "Password" varchar(18) NOT NULL
);

ALTER TABLE "ticket" ADD FOREIGN KEY ("ID") REFERENCES "user" ("ID");

ALTER TABLE "ticket" ADD FOREIGN KEY ("ID") REFERENCES "route" ("ID");

ALTER TABLE "route" ADD FOREIGN KEY ("end_point") REFERENCES "endPoint" ("ID");

ALTER TABLE "route" ADD FOREIGN KEY ("begin_point") REFERENCES "endPoint" ("ID");

ALTER TABLE "route" ADD FOREIGN KEY ("route_transport") REFERENCES "transport" ("ID");

ALTER TABLE "transport" ADD FOREIGN KEY ("ID") REFERENCES "routeType" ("ID");
